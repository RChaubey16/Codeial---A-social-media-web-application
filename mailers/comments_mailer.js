const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  nodemailer.transporter.sendMail(
    {
      from: "tonystark@avengers.com",
      to: comment.user.email,
      subject: "New comment published!",
      html: "<h1>Comment published!</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("error in sending mail", err);
        return;
      }

      console.log("Message sent: ", info);
    }
  );
};
