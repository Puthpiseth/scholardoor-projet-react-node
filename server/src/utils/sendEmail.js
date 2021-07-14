// require('dotenv').config();
// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendMail = async (email, subject, text, html) => {
//     try {
//         const msg = {
//             to: email,
//             from: process.env.HOST_EMAIL,
//             subject,
//             text,
//             html,
//         };
//         await sgMail.send(msg);
//         console.log('Email sent!')
//     }
//     catch(err) {
//         console.log('Error Mailing!', err.message)
//     }
// }

// export default sendMail;