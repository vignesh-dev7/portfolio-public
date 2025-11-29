import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials: () => ({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
});

export async function sendContactMail({ name, email, message }) {
  const params = {
    Source: process.env.MAIL_FROM,
    Destination: {
      ToAddresses: [process.env.CONTACT_FORM_RECEIVER_EMAIL]
    },
    Message: {
      Subject: {
        Data: `New Message from ${name}`
      },
      Body: {
        Text: {
          Data: `
            You have a new contact request:

            Name: ${name}
            Email: ${email}
            Message:
            ${message}
          `
        }
      }
    }
  };
  console.log({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY ? "YES" : "NO",
  region: process.env.AWS_SES_REGION,
  from: process.env.MAIL_FROM
});

  return await sesClient.send(new SendEmailCommand(params));
}
