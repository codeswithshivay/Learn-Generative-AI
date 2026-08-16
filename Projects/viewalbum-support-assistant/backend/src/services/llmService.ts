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
