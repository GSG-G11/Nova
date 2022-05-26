import nodeMailer from 'nodemailer';

const mailSender = async (email: string, title: string, body:string) => {
  const transporter: any = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions: any = {
    from: 'Nova',
    to: email,
    subject: title,
    html: body,
  };

  await transporter.sendMail(mailOptions);
};

export default mailSender;
