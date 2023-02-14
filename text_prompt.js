/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function getSuggestions(text_prompt) {
  const response = openai.createCompletion({
    model: 'text-davinci-003',
    prompt: text_prompt,
    max_tokens: 50,
    temperature: 0,
  });
  return response;
}

getSuggestions('was brexit really useful for britain?').then((result) =>
  console.log(result.data.choices));
