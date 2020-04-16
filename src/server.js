const http = require('http');
http.createServer((request, response) =>{
    console.log('hello world');
    const hello = () => console.log('hello world ES6');
    return request

    .on('error', (err)=>{
        console.log(err);
    })
    .on('data', (data)=>{
        console.log(data);
    })
    .on('end', ()=>{
        response.on('error', (err)=>{
            console.log(err);
        });
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.write('hi ');
        response.end('end');
    });
}).listen(8080);