const assert = require('chai').assert;
const request = require('request-promise');

describe('book_manager_test', () => {
    it('/newBook', async () => {
        let res = await request({
            uri: 'http://localhost:3000/newBook',
            json: true,
            method: 'POST',
            body: {
                title: 'test_title_0',
                authorId: 0,
                image: '/images/100/0000',
                description: 'test_describe_0'
            }
        });
        assert.equal(res.ok, true);
    });

    it('/newBooks', async () => {
        let res = await request({
            uri: 'http://localhost:3000/newBooks',
            json: true,
            method: 'POST',
            body: [
                {
                    title: 'test_title_1',
                    authorId: 0,
                    image: '/images/100/1111',
                    description: 'test_describe_1'
                },
                {
                    title: 'test_title_2',
                    authorId: 0,
                    image: '/images/100/2222',
                    description: 'test_describe_2'
                },
                {
                    title: 'test_title_3',
                    authorId: 0,
                    image: '/images/100/3333',
                    description: 'test_describe_3'
                }
            ]
        });
        assert.equal(res.ok, true);
    });

    it('/getBook', async () => {
        let res = await request({
            uri: 'http://localhost:3000/getBook',
            json: true,
            method: 'GET',
            body: {
                title: 'test_title_0',
                authorId: 0
            }
        });
        assert(res.data.description === 'test_describe_0');
    });


    it('/getBooks', async () => {
        let res = await request({
            uri: 'http://localhost:3000/getBooks',
            json: true,
            method: 'GET',
            body: {
                authorId: 0
            }
        });
        assert(res.data.length > 4);
    });

    it('/updateBook', async () => {
        let res = await request({
            uri: 'http://localhost:3000/updateBook',
            json: true,
            method: 'PUT',
            body: {
                find: {
                    title: 'test_title_0',
                    authorId: 0
                },
                set: {
                    title: 'test_title_0_updated'
                }
            }
        });
        assert.equal(res.ok, true);
    });

    it('/getBook', async () => {
        let res = await request({
            uri: 'http://localhost:3000/getBook',
            json: true,
            body: {
                authorId: 0,
                title: 'test_title_0_updated'
            }
        });
        assert(res.data.description === 'test_describe_0');
    });
});
