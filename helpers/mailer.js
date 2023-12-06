import nodemailer from 'nodemailer'

const emailRegister = async (data)=>{
  console.log(process.env.MAIL_HOST_NAME,
    process.env.MAIL_PORT,
    process.env.MAIL_USER,
    process.env.MAIL_PASSWORD);
  var transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST_NAME,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });
  const {name, email, token} = data;
  await transport.sendMail({
    from: '"RealState.com" <stephan.sa421@gmail.com>',
    to: email,
    subject: 'Confirm Email',
    text: `Hi ${name}, confirm your account`,
    html: `
      <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; border-radius: 10px;">
        <p style="font-size: 18px;">Hi ${name},</p>
        <p style="font-size: 16px;">Please confirm your account by clicking the button below:</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/authentication/confirm-account/${token}" 
           style="display: inline-block; padding: 10px 20px; background-color: #22C55E; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          Confirm Account
        </a>
        <p style="font-size: 14px; margin-top: 10px;">If you didn't register with the email: ${email} on RealEstate.com website, it's not necessary to confirm this message.</p>
      </div>
    `
  });
  
}

const emailForgotPassword = async (data)=>{
  var transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST_NAME,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });
  const {name, email, token} = data;
  await transport.sendMail({
    from: '"RealState.com" <stephan.sa421@gmail.com>',
    to: email,
    subject: 'Reset Password',
    text: `Hi ${name}, Reset Password`,
    html: `
      <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; border-radius: 10px;">
        <p style="font-size: 18px;">Hi ${name},</p>
        <p style="font-size: 16px;">To reset your password, click the button below:</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/authentication/forgot-password/${token}" 
           style="display: inline-block; padding: 10px 20px; background-color: #22C55E; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          Reset Your Password
        </a>
        <p style="font-size: 14px; margin-top: 10px;">If you didn't request a password reset for the email: ${email} on RealEstate.com website, it's not necessary to answer this message.</p>
      </div>
    `
  });
  
}


export{
  emailRegister,
  emailForgotPassword
}
