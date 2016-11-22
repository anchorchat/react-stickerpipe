const request = require('request');
require('dotenv').config({ silent: true });

const key = process.env.STICKER_PIPE_KEY;
const userId = process.env.USER_ID;
const endpoint = 'https://api.stickerpipe.com/api/v2';

const options = {
  url: `${endpoint}/shop`,
  headers: {
    ApiKey: key,
    Platform: 'JS',
    UserId: userId
  }
};

request.get(options, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body);
  }
});
