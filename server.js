const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url);

    const url = new URL(req.url, "http://localhost:3000");

    console.log(url.pathname);

    if (url.pathname === "/") {
        res.end(
            "Temperature Converter API\n\n" +
            "Available routes:\n" +
            "/celsius-to-fahrenheit?temperature=100\n" +
            "/fahrenheit-to-celsius?temperature=212"
        );
    } else if (url.pathname === "/celsius-to-fahrenheit") {
        const temperatureText = url.searchParams.get("temperature");
        const celsius = Number(temperatureText);
        const fahrenheit = (celsius * 9 / 5) + 32;

        res.end(`${celsius}°C is ${fahrenheit}°F.`);
    } else if (url.pathname === "/fahrenheit-to-celsius") {
        const temperatureText = url.searchParams.get("temperature");
        const fahrenheit = Number(temperatureText);
        const celsius = (fahrenheit - 32) * 5 / 9;

        res.end(`${fahrenheit}°F is ${celsius}°C.`);
    } else {
        res.statusCode = 404;
        res.end("Route not found.");
    }
});

server.listen(3000);