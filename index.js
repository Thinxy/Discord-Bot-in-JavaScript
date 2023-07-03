import "dotenv/config"
import Client from "./src/Structures/ExtendedClient.js"
const client = new Client()

process.on('uncaughtException', (err) => {
  console.error(err);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});

export default client;

client.start()