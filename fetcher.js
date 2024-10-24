const fs = require('fs');
const needle = require('needle');

args = process.argv.slice(2);

const config = {
  host: args[0],
  port: 80,
  path: args[1]
}

const fetcher = function(url, path) {
  needle.get(url,(error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    fs.writeFile(path, body, err => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("File written successfully\n")
      }
    })
  });
};

fetcher(config.host, config.path)