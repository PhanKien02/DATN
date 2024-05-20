import nodemailer from "nodemailer";
import "dotenv/config";
import { BadRequestError } from "../utils/httpErrors";
class MailService {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    public sendmail = async (to: string, subject: string, html: string) => {
        await this.transporter
            .sendMail({
                to: to, // list of receivers
                from: process.env.EMAIL, // sender address
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
