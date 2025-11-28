import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SES_SECRET_KEY,
  }
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

  return await sesClient.send(new SendEmailCommand(params));
}
