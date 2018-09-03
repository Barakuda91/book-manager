const formidable = require('koa2-formidable');
const bodyParser = require('koa-bodyparser');
const mysql = require('koa2-mysql-wrapper');
const logger = require('koa-logger');
const route = require('koa-route');
const config = require('config');
const Koa = require('koa');

const dbCreator = require('./controllers/dbCreator');
const booksSetter = require('./controllers/booksSetter');
const booksGetter = require('./controllers/booksGetter');
const booksUpdater = require('./controllers/booksUpdater');

const book = require('./models/book');

const app = new Koa();

app.use(logger());
app.use(formidable());
app.use(bodyParser());
app.use(mysql({
    host: config.get('db.host'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.database')
}));

app.use(async (ctx, next) => {
    ctx.book = book;
    await next();
});

app.use(route.post('/createTables', dbCreator.create));
app.use(route.post('/fillTables', dbCreator.fill));

app.use(route.post('/newBook', booksSetter.newBook));
app.use(route.post('/newBooks', booksSetter.newBooks));

app.use(route.get('/getBooks', booksGetter.getBooks));
app.use(route.get('/getBook', booksGetter.getBook));

app.use(route.put('/updateBook', booksUpdater.updateBook));

app.listen(config.get('port'));
console.log(`connect on port ${config.get('port')}`);
