const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

exports.mailTransport = () =>
  nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
exports.generatePasswordResetTemplate = (url) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
    <div>
        <div style="max-width: 620px; margin: 0 auto;
        font-family: sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px;
            text-align: center; color: #272727;">Response to your Reset Password Request</h1>
            <p style="color: #272727;">Please Click the Link Below to Reset Password</p>
            <div style="text-align: center;">
                <a href="${url}" style="font-family: sans-serif;
                margin: 0 auto; padding: 20px; text-align: center;
                background: #e63946; border-radius: 5px; font-size: 
                20px 10px; color: #fff; cursor: pointer;
                text-decoration: none; display: inline-block;
                ">Reset Password</a>
            </div>
        </div>
    </div>
    </body>
    </html>
    `;
};

exports.plainEmailTemplate = (heading, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
    <div>
        <div style="max-width: 620px; margin: 0 auto;
        font-family: sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px;
            text-align: center; color: #272727;">${heading}</h1>
            <p style="color: #272727; text-align: center;">${message}</p>
        </div>
    </div>
    </body>
    </html>
    `;
};
