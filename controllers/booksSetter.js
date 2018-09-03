module.exports.newBook = async (ctx) => {
    console.log(ctx.request.body);
    ctx.body = {"ccc":"ddd"}
};

module.exports.newBooks = async (ctx) => {};
