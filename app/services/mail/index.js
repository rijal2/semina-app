const nodemailer = require("nodemailer");
const { gmail, password } = require("../../config");
const Mustache = require("mustache");
const fs = require("fs");
const QRcode = require("qrcode");
const path = require("path");

const createQrCode = async (data) => {
  try {
    const str = JSON.stringify(data);
    const qr = await QRcode.toDataURL(str);
    // const base64Data = qr.replace(/^data:image\/png;base64,/, "");

    console.log(qr);
    return qr;
  } catch (error) {
    console.log(error);
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");

    let message = {
      from: gmail,
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

const invoiceMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/coba.html", "utf8");

    let message = {
      from: gmail,
      to: email,
      subject: "Invoice Order",
      html: Mustache.render(template, data),
      attachments: [
        {
          path: data.path,
          filename: data.filename,
          cid: "unique@cid",
        },
      ],
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail, invoiceMail };
