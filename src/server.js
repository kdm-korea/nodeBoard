const http = require('http');
http.createServer((request, response) =>{
    console.log('hello world');
    const hello = () => console.log('hello world ES6');
}).listen(8080);