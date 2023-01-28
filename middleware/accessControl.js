const originsAllowed = ["https://typescript-todo-app.chj2.repl.co", "https://aaaa.chj2.repl.co"];




module.exports = async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Headers', 'content-type,x-auth-token');
  ctx.set('Access-Control-Allow-Methods', '*');
  ctx.set('Access-Control-Expose-Headers', 'x-auth-token');

  switch (ctx.headers.origin) {
    case "https://typescript-todo-app.chj2.repl.co":
      ctx.set('Access-Control-Allow-Origin', 'https://typescript-todo-app.chj2.repl.co');
      break;

    case "https://aaaa.chj2.repl.co":
      ctx.set('Access-Control-Allow-Origin','https://aaaa.chj2.repl.co');
      break;

    case "ctx.headers.origin":
      ctx.set('Access-Control-Allow-Origin', 'https://typescript-todo-app.chj2.repl.co');
      break;

    default:
      ctx.set('Access-Control-Allow-Origin', '');
  }
}