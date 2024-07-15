import transporter from "../config/emailConfig.js";

const sendEmail = (recipient, emailSubject, emailContent) => {
  const mailOptions = {
    from: `"Rerack" ${process.env.EMAIL_ADDRESS}`,
    to: recipient,
    subject: emailSubject,
    text: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

export default { sendEmail };
