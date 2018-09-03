module.exports.getBook = async (ctx) => {
    ctx.body = await ctx.book.getBook(ctx);
};
module.exports.getBooks = async (ctx) => {
    ctx.body = await ctx.book.getBooks(ctx);
};

