module.exports = {
  name: "log",
  description: "",
  devOnly: true,
  callback: async (client, message) => {
    console.log(message.content)
  },
};