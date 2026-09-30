const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url);

    const url = new URL(req.url, "http://localhost:3000");

    console.log(url.pathname);

    if (url.pathname === "/celsius-to-fahrenheit") {
        const temperatureText = url.searchParams.get("temperature");
        const celsius = Number(temperatureText);
        const fahrenheit = (celsius * 9 / 5) + 32;

        res.end(`${celsius}°C is ${fahrenheit}°F.`);
    } else if (url.pathname === "/fahrenheit-to-celsius") {
        res.end("Fahrenheit to Celsius route");
    }
});

server.listen(3000);