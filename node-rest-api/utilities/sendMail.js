
import nodeMailer from 'nodemailer'; 
import fs from 'fs';
import dotenv from 'dotenv';
import ejs from 'ejs';
dotenv.config();
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log(process.env.GMAIL_USERNAME)
console.log(process.env.GMAIL_PASSWORD)

const sendEmail = async (options) => {


    // transporter object 
    let transporter =  nodeMailer.createTransport(
        {
            service: "gmail",
            auth:{
                user:process.env.GMAIL_USERNAME,
                pass:process.env.GMAIL_PASSWORD
            }
        }
    )

    const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: options.to,
        subject: options.subject,
        text: options.text,
        // html: htmlString
    }


    try{
       const email_sent_info = await transporter.sendMail(mailOptions);
       return email_sent_info;
    }
    catch(error){
        console.log(error);
    }


}

// export default sendEmail;


// sendEmail(
// {
//     "name": "Harshitha",
//     "to": "harshithamunirajak@gmail.com",
//     "subject": "Seding a beautuful template using HTML",
//     "text": "Please find the notes of class Node",
//     "link":"https://www.google.com"
// }
// )

export default sendEmail;