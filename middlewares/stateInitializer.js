const { session } = require("telegraf");

const stateInit = () => (ctx, next) => {
  // session()
  ctx.session = ctx.session || { state: {} };
  // ctx.session.state
  ctx.state = ctx.session.state || {};
  ctx.update.state = ctx.state.current;
  // console.log('ctx::',ctx);
  next();
};

console.log(
  "stateInit bilan ishlash uchun undan oldin session middlewareni initialize qiling!!!"
);

module.exports = stateInit;
