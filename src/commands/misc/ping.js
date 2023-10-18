module.exports = {
    name: "ping",
    description: "Replies with bot ping",
    devOnly: true,
    callback: async (client, message) => {
      message.channel.send('Pong').then(async (msg) =>{
        msg.delete()
        const ping = msg.createdTimestamp - message.createdTimestamp
        message.channel.send(`**Client: ${ping}ms | Websocket: ${client.ws.ping}ms**`);
      }
    )},
  };