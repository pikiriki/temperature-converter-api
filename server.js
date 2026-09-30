const http = require("node:http");

const server = http.createServer((req, res) => {
    res.end("Hello Backend");
});

server.listen(3000);