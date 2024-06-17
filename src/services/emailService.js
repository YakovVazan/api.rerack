import transporter from "../config/emailConfig.js";

const sendEmail = (recipient, code) => {
  const mailOptions = {
    from: `"Rerack" ${process.env.EMAIL_ADDRESS}`,
    to: recipient,
    subject: "Confirmation code from Rerack",
    text:
      "Hello, your confirmation code for Rerack is " +
      code +
      ". \nThough you may use it as your permanent password, you're encouraged to pick a stronger one.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

export default { sendEmail };
