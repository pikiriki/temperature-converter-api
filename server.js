const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url);

    const url = new URL(req.url, "http://localhost:3000");

    console.log(url.pathname);

    if (url.pathname === "/celsius-to-fahrenheit") {
        res.end("Celsius to Fahrenheit route");
    }
});

server.listen(3000);