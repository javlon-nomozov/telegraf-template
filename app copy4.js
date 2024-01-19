const { Telegraf, session } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const stateInit = require('./middlewares/stateInitializer')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session())
bot.use(stateInit())

bot.command("quit", async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  await ctx.leaveChat();
});

bot.command('hi', async (ctx) => {
  // Explicit usage
  // if(ctx.session.state.hi='Hello')
  ctx.state.current = 'hi'
  // console.log("ctx",ctx);
  await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `Hello ${ctx.state.role}`
  );

  // Using context shortcut
  await ctx.reply(`Hello ${ctx.state.role}`);
});

bot.command('bye', async (ctx) => {
  // Explicit usage
  // if(ctx.session.state.hi='Hello')
  // ctx.state = {current:'Hello'}
  console.log("ctx",ctx);
  await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `Hello ${ctx.state.role}`
  );

  // Using context shortcut
  await ctx.reply(`Hello ${ctx.state.role}`);
});

bot.on("callback_query", async (ctx) => {
  // Explicit usage
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  await ctx.answerCbQuery();
});

bot.on("inline_query", async (ctx) => {
  const result = [];
  // Explicit usage
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  await ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
