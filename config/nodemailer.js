const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

let transporter = nodemailer.createTransport({
  service: "gmail", // service being used
  host: "smtp.gmail.com", // the host or protocol to send gmail mails
  port: 587, // default port number to send TLS secured mails (google - gmail smtp setting and check support.googl.com )
  secure: false, // currently not secured
  auth: {
    // Identity of user who is sender of the mails
    user: "ruturajchaubey16",
    pass: "9371618373",
  },
});

// to send HTML designed mails
let renderTemplate = (data, relativePath) => {
  // data contains user info and relative path is from where the mail is sent (sender's email address)
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering the template", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

// exporting the properties for further use
module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
