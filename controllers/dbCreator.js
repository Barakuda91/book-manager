const Utils = require('../Classes/Utils.js');

module.exports.create = async (ctx) => {
    ctx.body = await ctx.myPool().query("CREATE TABLE IF NOT EXISTS books (" +
        "id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "title VARCHAR(128) NOT NULL, " +
        "author VARCHAR(128) NOT NULL, " +
        "image VARCHAR(128) NOT NULL, " +
        "description MEDIUMTEXT NOT NULL " +
        ") CHARACTER SET utf8 COLLATE utf8_unicode_ci;");
};

module.exports.fill = async (ctx) => {
    let data = "INSERT INTO books (" +
        "title," +
        "author," +
        "image," +
        "description) VALUES ";

    for(let i = 0; i < 100000; i++) {
        data += Utils.fillData();
    }

    data = data.substring(0, data.length - 1) + ";";

    ctx.body = await ctx.myPool().query(data);
};
