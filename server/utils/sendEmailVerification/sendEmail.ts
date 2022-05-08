import nodeMailer from 'nodemailer';

const mailSender = async (email: string, title: string, body:string) => {
  const transporter: any = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions: any = {
    from: `<${process.env.EMAIL}>`,
    to: email,
    subject: title,
    html: body,
  };

  await transporter.sendMail(mailOptions);
};

export default mailSender;
