const express = require('express');
const app = express();

const post = require('./router/post.js');
app.use('/post', post);

app.listen(8080, function(){
    
});