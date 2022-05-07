import nodeMailer from 'nodemailer';

const mailSender = async (email: string, accessToken: string, name:string) => {
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
    subject: 'Verify your email',
    html: `<h1>${name} Thanks for registering</h1>
    <h2>Click the link below to verify your account</h2>
    <a href=http://localhost:8000/api/auth/verify?accessToken=${accessToken}>Verify Your Email</a>`,
  };

  await transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      return info;
    }
    return 'Email sent';
  });
};

export default mailSender;
