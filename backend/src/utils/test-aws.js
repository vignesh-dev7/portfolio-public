import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
const client = new STSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const run = async () => {
  try {
    const data = await client.send(new GetCallerIdentityCommand({}));
    console.log("VALID AWS CREDENTIALS:", data);
  } catch (error) {
    console.error("INVALID AWS CREDENTIALS!", error);
  }
};

run();
