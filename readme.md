To start server:
* npm i
* npm run start

To fill db
* npm run fillDb

If there are no errors, the REST server is ready

--- Get records/record
URL: http://localhost:3000/getBooks / http://localhost:3000/getBook
METHOD: GET
PARAMS:
* search={"description:like":"%революция%"} ("[field[:operator(default = "=")]]":"value")
* params=["author","title","id"]
* sort=author
* sortType=DESC
* offset=5
* limit=20 (just "getBooks")

--- New records/record
URL: http://localhost:3000/newBooks / http://localhost:3000/newBook
METHOD: POST
PARAMS newBook:
* author: 'Test Author 1',
* title: 'Test title 1',
* description: 'Test description text 1',
* image: '/000/1111.jpg'

PARAMS newBooks:
* books = [
    {
        "author": "Test Author 2",
        "title": "Test title 2",
        "description":"Test description text 2",
        "image":"/000/2222.jpg"
    },{
        "author": "Test Author 3",
        "title": "Test title 3",
        "description":"Test description text 3",
        "image":"/000/3333.jpg"
    }
]

--- Update record
URL: http://localhost:3000/updateBook
METHOD: PUT
PARAMS:
* id=3
* set={
    "author": "Test Author Updated",
    "title": "Test title Updated",
    "description":"Test description text Updated",
    "image":"/000/6666.jpg"
}