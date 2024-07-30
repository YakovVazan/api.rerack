import { Server as SocketIOServer } from "socket.io";
import JwtServices from "../services/JwtServices.js";
import usersServices from "../services/usersServices.js";

const userSockets = new Map();

export class Socket {
  constructor(server) {
    this.io = new SocketIOServer(server);

    this.io.on("connection", (socket) => {
      const token = socket.handshake.auth.token;
      const userId = JwtServices.getUserIdFromToken(token);

      if (token && userId) {
        if (userSockets.has(String(userId))) {
          const existingSocket = userSockets.get(String(userId));
          existingSocket.disconnect();
        }
        this.addNewSocket(userId, socket);
      } else {
        socket.disconnect();
      }
    });
  }

  addNewSocket(userId, socket) {
    userSockets.set(String(userId), socket);
  }

  removeSocket(userId) {
    if (userSockets.has(String(userId))) userSockets.delete(String(userId));
  }

  async sendReportToAdmins(newReportId) {
    try {
      const admins = await usersServices.getAllAdmins("userId");
      admins.forEach((admin) => {
        const adminSocket = userSockets.get(String(admin["userId"]));
        if (adminSocket) adminSocket.emit("admin_report", { id: newReportId });
      });
    } catch (error) {
      console.error("Error sending report to admins: ", error);
    }
  }

  sendReplyToReporter(reportId, reporterId) {
    try {
      const reporterSocket = userSockets.get(String(reporterId));
      if (reporterSocket)
        reporterSocket.emit("report_replied", {
          reporterId: reporterId,
          reportId: reportId,
        });
    } catch (error) {
      console.error("Error sending report to reporter: ", error);
    }
  }

  sendAdminStatus(userId, payload) {
    try {
      const userSocket = userSockets.get(String(userId));
      if (userSocket)
        userSocket.emit("admin_status_change", { payload: payload });
    } catch (error) {
      console.error("Error sending admin status change to user: ", error);
    }
  }

  async sendNewRegistration(userId) {
    try {
      const admins = await usersServices.getAllAdmins("*");
      admins.forEach((admin) => {
        const adminSocket = userSockets.get(String(admin["userId"]));
        if (adminSocket)
          adminSocket.emit("user_registered", { userId: userId });
      });
    } catch (error) {
      console.error("Error sending admin status change to user: ", error);
    }
  }
}
