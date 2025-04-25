import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for =her ports
  auth: {
    user: "selfshop.do@gmail.com",
    pass: process.env.SMTP_PASS,
  },
});

export const sendmail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: '"SelfShop" <selfshop.do@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;
};

export const chatGptT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP for Password Reset</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    .email-header {
      background-color: #fa5555;
      padding: 20px;
      text-align: center;
      color: #fcfafa;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 30px 20px;
      color: #333333;
      line-height: 1.6;
    }
    .email-body h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .otp-box {
      background-color: #f1f3f4;
      border: 1px dashed #1a73e8;
      padding: 15px;
      margin: 20px 0;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 6px;
      text-align: center;
      color: #1a73e8;
      border-radius: 4px;
    }
    .email-footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #999999;
      background-color: #f6f9fc;
    }
    .email-footer a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <h1>SelfShop E-Commers</h1>
    </div>
    <div class="email-body">
      <h2>{{for}}</h2>
      <p>Hello,</p>
      <p>We received a request to releted OTP. Please use the following One-Time Password (OTP) to complete the process:</p>
      
      <div class="otp-box">{{otp}}</div> <!-- Replace with your dynamic OTP -->

      <p>This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
      <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
    </div>
    <div class="email-footer">
      &copy; 2025 <strong>SelfShop E-Commers</strong>. All rights reserved.<br>
      Need help? <a href="mailto:support@selfshop.com">Contact Support</a>
    </div>
  </div>
</body>
</html>
`;

export const orderReceiverdT = (order, name) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Order Receipt - SelfShope E-Commerce</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
      margin: 0;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      padding: 20px;
    }
    .header {
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .logo {
      font-size: 24px;
      color: #4CAF50;
      font-weight: bold;
    }
    .section-title {
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .order-info, .items {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
    }
    .item {
      border-bottom: 1px solid #dddddd;
      padding: 10px 0;
    }
    .item:last-child {
      border-bottom: none;
    }
    .total {
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">SelfShope E-Commerce</div>
      <div>Order Receipt</div>
    </div>

    <p>Hi <strong>${name}</strong>,</p>
    <p>Thank you for your purchase! Here are your order details:</p>

    <div class="section-title">Order Information</div>
    <div class="order-info">
      <p><strong>Order ID:</strong> #${order?._id}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="section-title">Items Ordered</div>
    <div class="items">
	${order?.products?.map(
    (item) =>
      `<div class="item">
      <div>
        <strong>${item?.productId.title}</strong>
      </div>
      <div>Qty: ${item?.quantity}</div>
      <div>Price: Rs ${item?.productId?.discountPrice}</div>
    </div>`
  )}
     
      <div class="total">Total: Rs ${order?.totalamount}</div>
    </div>

    <div class="footer">
      SelfShope E-Commerce © 2025<br>
      This is an automated email, please do not reply.
    </div>
  </div>
</body>
</html>
`;
};
