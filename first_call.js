import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = "take from env";

const configuration = new Configuration({
    organization: "org-X3ujDHi2hBvWjQhquBGtEFtu",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
console.log(response.data.data)