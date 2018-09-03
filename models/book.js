const Utils = require('../Classes/Utils.js');

module.exports = class Book{
    static async getBook (ctx) {
        let data = await ctx.myPool().query(`SELECT ${Utils.getParamsString(ctx.request.query.params)} 
        FROM books 
        ${Utils.getWhereString(ctx.request.query.search)} 
        ${`LIMIT ${ctx.request.query.offset || 0},1`};`);
        let res = {data: data[0] || []};
        res.ok = !data.errno;
        return res;
    };

    static async getBooks (ctx) {
        let res = {data: await ctx.myPool().query(`SELECT ${Utils.getParamsString(ctx.request.query.params)} 
        FROM books ${Utils.getWhereString(ctx.request.query.search)} 
        ORDER BY ${ctx.request.query.sort || `id`} ${ctx.request.query.sortType || ``} 
        ${`LIMIT ${ctx.request.query.offset || 0},${ctx.request.query.limit || 100}`};`)};
        res.ok = !res.data.errno;
        return res;
    };

    static async newBook (ctx) {
        let values = [];
        let query = `INSERT INTO books (${Object
            .entries(ctx.request.body)
            .map((el) => {
                values.push('"'+el[1]+'"');
                return el[0]?el[0]:'';
            })
            .toString()}) VALUES (${values.toString()})`;
        let res = {data: await ctx.myPool().query(query)};
        res.ok = !res.data.errno;
        return res;
    };

    static async newBooks (ctx) {
        try{
            let books = JSON.parse(ctx.request.body.books);
            let values = books.map((book) => {
                return "("+Object
                    .entries(book)
                    .map((el) => {
                        return '"'+el[1]+'"';
                    })
                    .toString()+")";
            });

            let res = {data: await ctx.myPool().query(`INSERT INTO books (${Object
                .entries(books[0])
                .map((el) => {
                    return el[0]?el[0]:'';
                })
                .toString()}) VALUES ${values.toString()}`)};
            res.ok = !res.data.errno;
            return res;
        } catch (err) {
            console.log(err);
            return {ok: false}
        }
    };

    static async updateBook (ctx) {
        try{
            let set = JSON.parse(ctx.request.body.set);

            const query = async (set) => {
                let res = {data: await ctx.myPool().query(`UPDATE books SET ${Object
                    .entries(set)
                    .map((el) => {
                        return `${el[0]}="${el[1]}"`
                    })
                    .toString()} WHERE id = ${ctx.request.body.id};`)};
                res.ok = !res.data.errno;
                return res;
            };
            return ctx.request.body.id > 0 ? await query(set): {ok: false};
        } catch (err) {
            console.log(err);
            return {ok: false}
        }
    };
};