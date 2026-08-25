// Imports
import type { AssistantReply, ChatMessageInput } from "../../../shared/chat";
import client from '../config/openai';

function createMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function callLLM(messages: ChatMessageInput[]):Promise<string> {
  console.log('LLM called')
  // SYSTEM PROMPT
  const SYSTEM_PROMPT:string = `
    You are an support assistant for an application named ViewAlbum.
    Your name in this application is (View Album Support Assistant).
    You have to change your behavior based on how the user actually like to talk you can determine that from the conversation history.
    
    Responsiblities:
    - You have to assist the user with it's questions
    - Help user solving an problem related to the application
    
    Rules:
    - Only assist the user with the questions related to this application only.
    - For non-application questions you should respond like: (Sorry, i can't assist you with that).
    - Don't provide any information which is not related to the application.
  `;

  // LLM Call
  const response = await client.chat.completions.create({
    model: "gemini-3.5-flash-lite",
    messages:[
      { role: "system" , content:SYSTEM_PROMPT },
      ...messages
    ]
  });

  console.log('response came', response.choices[0].message.content);

  return response.choices[0].message.content ?? "Sorry, I couldn't process that.";
}

export async function generateAssistantReply(
  messages: ChatMessageInput[]
): Promise<AssistantReply> {

  const content = await callLLM(messages);
  console.log('content available', content)
  return {
    id: createMessageId(),
    role: "assistant",
    content,
    createdAt: new Date().toISOString(),
    service: "llm",
    isDevelopmentPlaceholder: true
  };
}
