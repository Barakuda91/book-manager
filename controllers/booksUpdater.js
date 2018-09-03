module.exports.updateBook = async (ctx) => {
    ctx.body = await ctx.book.updateBook(ctx);
};