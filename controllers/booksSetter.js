module.exports.newBook = async (ctx) => {
    ctx.body = await ctx.book.newBook(ctx);
};

module.exports.newBooks = async (ctx) => {
    ctx.body = await ctx.book.newBooks(ctx);
};
