import nodemailer from "nodemailer";
import { BadRequestError } from "../utils/httpErrors";
class MailService {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kien1st02@gmail.com",
            pass: "fhfvqgbdxbzbuhwo",
        },
    });

    public sendmail = async (to: string, subject: string, html: string) => {
        await this.transporter
            .sendMail({
                to: to, // list of receivers
                from: process.env.MAIL_SENDER, // sender address
                subject: subject, // Subject line
                html: html, // HTML body content
            })
            .then(() => {
                console.log("send mail success");
            })
            .catch(() => {
                throw new BadRequestError("send mail failed");
            });
    };
}
export default new MailService();
