var http = require("http");
var port = process.env.PORT || 5000;
var fs = require("fs");
var words = [];
fs.readFile("./words.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    words = data.split("\n");
    http
      .createServer((request, response) => {
        const { method } = request;
        let res = [];
        switch (method) {
          case "POST":
            response.writeHead(200, {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*",
            });
            request.on("data", (word) => {
              let w = word.toString().split("=").splice(1).join("");
              res = words.filter((wor) => wor.includes(w));
            });
            request.on("end", () => {
              response.end(res.join("-"));
            });
            break;
          default:
            throw new Error(`Unsupported request method: ${method}`);
        }
      })
      .listen(port);

    console.log("node http server listening on http://localhost:" + port);
  }
});
