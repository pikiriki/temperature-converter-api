# Temperature Converter API

Project 5 in my backend development roadmap.

This project is a small Node.js backend that demonstrates how **one server can expose multiple behaviors using different URL paths**.

The main concept learned in this project is **routing**.

```text
Request
↓
pathname
↓
route
↓
input
↓
validation
↓
calculation
↓
response
```

## Project Goal

The server supports two temperature-conversion operations:

- Celsius → Fahrenheit
- Fahrenheit → Celsius

The requested **path** decides which backend logic runs, while the `temperature` query parameter supplies the input value.

```text
PATH
↓
selects behavior

QUERY PARAMETER
↓
supplies data
```

## Routes

### Root Route

```text
GET /
```

Returns a short description of the API and the available routes.

---

### Celsius to Fahrenheit

```text
GET /celsius-to-fahrenheit?temperature=100
```

Example response:

```text
100°C is 212°F.
```

Formula:

```text
F = (C × 9/5) + 32
```

---

### Fahrenheit to Celsius

```text
GET /fahrenheit-to-celsius?temperature=212
```

Example response:

```text
212°F is 100°C.
```

Formula:

```text
C = (F - 32) × 5/9
```

## Validation

The API handles a few simple input problems.

### Missing temperature

Request:

```text
/celsius-to-fahrenheit
```

Response:

```text
Please provide a temperature.
```

### Empty temperature

Request:

```text
/celsius-to-fahrenheit?temperature=
```

Response:

```text
Please provide a temperature.
```

### Non-numeric temperature

Request:

```text
/celsius-to-fahrenheit?temperature=hello
```

Response:

```text
Temperature must be a number.
```

Decimal and negative temperatures are valid inputs.

Examples:

```text
/celsius-to-fahrenheit?temperature=36.5
/celsius-to-fahrenheit?temperature=-10
```

## Unknown Routes

If the requested path does not match a known route, the server responds with HTTP status `404`.

Example:

```text
GET /banana
```

Response:

```text
Route not found.
```

## Response Encoding

The server sends plain text using UTF-8:

```javascript
res.setHeader("Content-Type", "text/plain; charset=utf-8");
```

This ensures characters such as `°` display correctly in the browser.

## Project Structure

```text
temperature-converter-api/
│
├── server.js
├── package.json
├── README.md
└── .gitignore
```

## Technologies Used

- Node.js
- Node built-in `http` module
- JavaScript `URL`
- `url.pathname`
- `url.searchParams`
- JavaScript conditionals
- JavaScript arithmetic
- Git
- GitHub

No Express or other backend framework is used in this project.

## Run the Project

### 1. Enter the project directory

```bash
cd temperature-converter-api
```

### 2. Start the server

```bash
node server.js
```

### 3. Open the browser

Visit:

```text
http://localhost:3000
```

Then try:

```text
http://localhost:3000/celsius-to-fahrenheit?temperature=100
```

and:

```text
http://localhost:3000/fahrenheit-to-celsius?temperature=212
```

### 4. Stop the server

Press:

```text
Control + C
```

## How Routing Works

For a request like:

```text
/celsius-to-fahrenheit?temperature=100
```

Node first receives the requested URL.

```text
req.url
↓
/celsius-to-fahrenheit?temperature=100
```

The URL is parsed:

```javascript
const url = new URL(req.url, "http://localhost:3000");
```

Then the pathname is extracted:

```text
url.pathname
↓
/celsius-to-fahrenheit
```

The backend compares the pathname against known routes:

```text
/celsius-to-fahrenheit
↓
run Celsius → Fahrenheit logic
```

or:

```text
/fahrenheit-to-celsius
↓
run Fahrenheit → Celsius logic
```

The input is read separately from the query parameter:

```text
?temperature=100
↓
"100"
↓
Number(...)
↓
100
```

The selected calculation then runs and the result is sent back to the browser.

## Main Mental Model

```text
                     ONE NODE SERVER
                            │
                            ▼
                      REQUEST ARRIVES
                            │
                            ▼
                         req.url
                            │
                            ▼
                        URL PARSING
                            │
                            ▼
                         PATHNAME
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
 /celsius-to-fahrenheit       /fahrenheit-to-celsius
              │                           │
              ▼                           ▼
      read temperature              read temperature
              │                           │
              ▼                           ▼
        validate input                validate input
              │                           │
              ▼                           ▼
        String → Number              String → Number
              │                           │
              ▼                           ▼
             C → F                       F → C
              │                           │
              └─────────────┬─────────────┘
                            ▼
                         RESPONSE
```

Anything else:

```text
unknown pathname
↓
no route matches
↓
404
```

## What I Learned

Through this project, I learned that:

1. One backend server can provide multiple behaviors.
2. A URL path can identify which backend operation the client wants.
3. Routing means associating a path with backend behavior.
4. `req.url` contains the requested path and query information.
5. `url.pathname` gives only the path portion of the URL.
6. A path and a query parameter have different responsibilities.
7. The path answers **what should the backend do?**
8. The query parameter answers **what data should the backend use?**
9. `url.searchParams.get("temperature")` reads the temperature input.
10. URL input initially arrives as text and can be converted using `Number(...)`.
11. `Number.isNaN(...)` can detect failed numeric conversion.
12. Missing or empty input should be checked before calculation.
13. Negative temperatures are not automatically invalid.
14. The same numerical input can produce different results when different routes select different logic.
15. Routing and calculation are separate responsibilities.
16. Unknown paths can fall through to a `404` response.
17. HTTP headers can tell the browser how to interpret the response body.
18. UTF-8 response encoding prevents characters such as `°` from displaying incorrectly.
19. Routing can be understood using ordinary JavaScript conditionals before using a framework such as Express.
20. Git can be used throughout development to record each meaningful project checkpoint.

## Core Idea

```text
one server
↓
many possible operations
↓
server must distinguish requests
↓
different URL paths
↓
inspect pathname
↓
route matching
↓
correct backend logic runs
```

The central lesson of this project is:

> **One backend can expose multiple behaviors, and the requested path determines which backend logic runs.**
