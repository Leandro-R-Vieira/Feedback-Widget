import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "47caf5393e1098",
    pass: "7b10ef962ce3d7"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com',
      to: 'Leandro Vieira <leandrorvieira@yahoo.com>',
      subject,
      html: body,
    });
  };
}