const express = require('express');

const app = express();
const port = 3000;

app.get('/',(req, res) => {
	res.send('Hello world!');
});

server.listen(port,hostname, ()=>{
	console.log('Server running at htt://localhost:${port}/');
})