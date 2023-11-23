const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

const sendEmailWithNodeMailer = async (mailData) => {
  try {
    const maliOptions = {
      from: smtpUserName,
      to: mailData.email,
      subject: mailData.subject,
      html: mailData.html,
    };
    const info = await transporter.sendMail(maliOptions);

    console.log("Mail sent successfully", info.response);
  } catch (error) {
    console.log("Error while sending email.");
    throw error;
  }
};

module.exports = { sendEmailWithNodeMailer };
