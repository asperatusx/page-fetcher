const fs = require('fs');
const needle = require('needle');
const readline = require('readline');

args = process.argv.slice(2);

const config = {
  host: args[0],
  port: 80,
  path: args[1]
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fetcher = function(url, path) {
  needle.get(url,(error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    fs.access(path, fs.constants.F_OK, err => {
      if (!err) {
        console.log('File already exists.')
        rl.question('Do you want to overwrite the file? Type y for yes or n for no:  ', (reply) => {
          if (reply === 'y') {
            fs.writeFile(path, body, err => {
              if (err) {
                console.log(err);
              }
              else {
                console.log("File written successfully\n");
              }
            })
          }
          console.log("End of question");
          rl.close();
        })
      } else {
        fs.writeFile(path, body, err => {
          if (err) {
            console.log(err);
          }
          else {
            console.log("File written successfully\n");
          }
        })
      }
    })
  });
};

fetcher(config.host, config.path)