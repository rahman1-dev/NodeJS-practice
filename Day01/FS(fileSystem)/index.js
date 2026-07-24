// console.log("Hello fs");

// const filePath = path.join(__dirname, "content");

//read file asyncronous
// const fs = require("fs");
// fs.readFile("content.txt", "utf-8", (error, data) => {
//   console.log("reading data......");
//   console.log(data);
// });

//read file synchronously
// const fs = require("fs");
// console.log("Hello before data");

// const data = fs.readFileSync("content.txt", "utf-8");

// console.log(data);
// console.log("Hello after data");

//write file async
// const fs = require("fs");

// fs.writeFile("content.txt", "Hello MERN Stack developer!", (err) => {
//   console.log("Message");
// });

//write file sync
const fs = require("fs");
const data = fs.writeFileSync(
  "content.txt",
  "Hellooooooooooo Cooooder!",
  "utf-8",
);
console.log(data);
