const express = require("express");
const client = require("./index");
const cors = require("cors");
const { version } = require("discord.js");
const app = express();
const port = process.env.PORT || 2000;
const os = require("systeminformation");
const { msToDuration, formatBytes } = require("./handlers/functions");

client.on('ready', () => {
  console.log(`${client.user.username} is now online !`)
const message = "hi, my master working to improve some commands please be patient!"; // Replace with your message

client.guilds.cache.forEach(guild => {
  guild.channels.cache.forEach(channel => {
    if (channel.type === 'text') {
      channel.send(message).catch(console.error);
    }
  });
});
})
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send(`Hello World`);
});

app.get("/home", (req, res) => {
  res.send(client.user);
});

app.get("/commands", (req, res) => {
  const commands = {
    mcommands: client.mcommands.map((cmd) => {
      return {
        name: cmd.name,
        description: cmd.description,
        category: cmd.category,
      };
    }),
    mcategories: client.mcategories.map((cat) => cat),
    scommands: client.commands.map((cmd) => {
      return {
        name: cmd.name,
        description: cmd.description,
        category: cmd.category,
      };
    }),
    scategories: client.scategories.map((cat) => cat),
  };
  res.send(commands);
});

app.get("/about", async (req, res) => {
  let memory = await os.mem();
  let cpu = await os.cpu();

  let options = {
    guildsCount: client.guilds.cache.size,
    usersCount: client.users.cache.size,
    channelsCount: client.channels.cache.size,
    uptime: msToDuration(client.uptime),
    DJSVersion: `v${version}`,
    NodeVersion: `${process.version}`,
    ping: `${client.ws.ping}ms`,
    cpu: cpu.brand,
    ram: {
      total: formatBytes(memory.total),
      usage: formatBytes(memory.used),
    },
  };
  res.send(options);
});

app.get("/contact", (req, res) => {
  let options = {
    user: client.user,
  };
  res.send(options);
});

app.listen(port, () => {
  console.log(`Listing at http://localhost:${port}`);
});
