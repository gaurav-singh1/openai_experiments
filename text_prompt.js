const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = openai.createCompletion({
  model: "text-davinci-003",
  prompt: "What are the names of the satellites of saturn?",
  max_tokens: 50,
  temperature: 0,
});

response.then(result => console.log(result.data.choices));