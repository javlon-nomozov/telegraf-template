const { Context, session, Telegraf } = require('telegraf');
require('dotenv').config()

// Throw an error if BOT_TOKEN is not provided
if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError("BOT_TOKEN must be provided!");
}

// Create your bot and tell it about your context type
const bot = new Telegraf(process.env.BOT_TOKEN);

// Make session data available
bot.use(session());

// Register middleware
bot.on("message", async (ctx) => {
  // Set a default value for session if not present
  ctx.session = ctx.session || { messageCount: 0 };
  ctx.session.messageCount++;
  await ctx.reply(`Seen ${ctx.session.messageCount} messages.`);
});

// Launch bot
bot.launch();
