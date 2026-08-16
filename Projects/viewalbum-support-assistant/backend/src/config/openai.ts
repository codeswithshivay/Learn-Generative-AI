// Imports
import { OpenAI } from 'openai'
import { env } from "../config/env";

// Initializing OpenAI SDK
const client = new OpenAI({
   apiKey:env.apiKey,
   baseURL:"https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Exporting Client
export default client;