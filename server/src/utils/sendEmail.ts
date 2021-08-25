import Mailgun from "mailgun-js";

const mg = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  mg.messages().send(
    {
      from: "WeebCritic noreply@weebcritic.com",
      to,
      subject,
      text,
    },
    (err, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
      }
    }
  );
};
