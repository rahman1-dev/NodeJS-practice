// console.log("Welcome to File content analyzer");

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "content.txt"); //File location

const data = fs.readFileSync(filePath, "utf-8");

const countLines = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  const result = data.split("\n").length;
  console.log("Total lines are:", result);
};
// countLines();

const countLetters = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  console.log("Total letters are:", data.length);
};
// countLetters();
const countWords = () => {
  const data = fs.readFileSync(filePath, "utf-8");

  const result = data.split(" ");
  console.log("Total words are:", result.length);
};
// countWords();

if (process.argv[2] === "lines") {
  countLines();
} else if (process.argv[2] === "letters") {
  countLetters();
} else if (process.argv[2] === "word") {
  countWords();
} else {
  console.log("Inter valid command");
}
