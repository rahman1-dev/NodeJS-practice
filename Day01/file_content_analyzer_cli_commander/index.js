const { program } = require("commander");

const fs = require("fs");

const countLines = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  const result = data.split("\n");
  console.log("Total lines are:", result.length);
};
const countLetters = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  const result = data.length;
  console.log("Total lines are:", result);
};
const countWords = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  const result = data.split(" ");
  console.log("Total lines are:", result.length);
};

program
  .name("File content analyzer Manual")
  .description("This CLI application about analyzing the file content")
  .version("1.0.0");

program
  .command("line")
  .description("This command use to count lines in the given file")
  .argument("<filePath>", "file location needed here as an argument")
  .action((filePath) => {
    countLines(filePath);
  });
program
  .command("letter")
  .description("This command use to count letters in the given file")
  .argument("<filePath>", "file location needed here as an argument")
  .action((filePath) => {
    countLetters(filePath);
  });
program
  .command("word")
  .description("This command use to count words in the given file")
  .argument("<filePath>", "file location needed here as an argument")
  .action((filePath) => {
    countWords(filePath);
  });

program.parse();
