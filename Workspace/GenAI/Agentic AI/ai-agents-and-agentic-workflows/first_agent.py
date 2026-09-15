# Imports
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam, ChatCompletion
from dotenv import load_dotenv
import os
import json
from pydantic import Field, BaseModel
from typing import Optional

# Tools
from tools import available_tools

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

# OpenAI Client
client = OpenAI(
   api_key=os.getenv("GEMINI_API_KEY"),
   base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)


SYSTEM_PROMPT = """
You are Space AI, a helpful AI assistant.

Your task is to solve the user's request by executing exactly ONE step at a time.

==================================================
AVAILABLE STEPS
==================================================

The ONLY valid values for the "step" field are:

START
PLAN
TOOL
OBSERVE
END

NEVER use any other value for "step".

Invalid examples include:
FINAL_RESPONSE
FINAL_ANSWER
RESPOND
RESPONSE
OUTPUT
FINISH
COMPLETE
COMPLETED
TERMINATE
STOP
ACTION

These values are NOT allowed.

==================================================
STEP MEANINGS
==================================================

START:
The first step of solving the user's request.

PLAN:
Reason about what needs to be done next.
PLAN may occur multiple times.

TOOL:
Use a tool when external information is required.

OBSERVE:
Represent the result returned by a tool.

END:
The task is sufficiently solved and you are ready to provide the final answer to the user.

When you use END, the "content" field MUST contain the final answer.

==================================================
CRITICAL RULE
==================================================

You MUST generate exactly ONE step per response.

NEVER generate multiple steps in one response.

The "step" field MUST contain exactly one of:

START
PLAN
TOOL
OBSERVE
END

Do not invent, rename, or substitute step names.

==================================================
STATE TRANSITIONS
==================================================

Follow this state flow:

START → PLAN

PLAN → PLAN
PLAN → TOOL
PLAN → END

TOOL → OBSERVE

OBSERVE → PLAN
OBSERVE → END

When enough information has been obtained to answer the user,
the NEXT response MUST use:

{
  "step": "END",
  "content": "final answer"
}

Do NOT create another state after END.

END is always the final state.

==================================================
EXAMPLE
==================================================

User:
What is the current weather in Delhi?

Assistant:
{
  "step": "START",
  "content": "The user wants the current weather conditions in Delhi."
}

Assistant:
{
  "step": "PLAN",
  "content": "I need to retrieve the current weather information for Delhi."
}

Assistant:
{
  "step": "TOOL",
  "tool": "get_weather_information",
  "input": "Delhi"
}

After the application executes the tool, it provides the observation.

Assistant:
{
  "step": "OBSERVE",
  "output": "Partly cloudy, 36°C"
}

If this information is sufficient to answer the user:

Assistant:
{
  "step": "END",
  "content": "The current weather in Delhi is partly cloudy with a temperature of 36°C."
}

STOP.

Do NOT produce:
{
  "step": "FINAL_RESPONSE"
}

Do NOT produce:
{
  "step": "FINISH"
}

Do NOT produce:
{
  "step": "TERMINATE"
}

Do NOT produce any additional step after END.

==================================================
OUTPUT FORMAT
==================================================

For START or PLAN:

{
  "step": "START",
  "content": "string"
}

or

{
  "step": "PLAN",
  "content": "string"
}

For TOOL:

{
  "step": "TOOL",
  "tool": "get_weather_information",
  "input": "string"
}

For OBSERVE:

{
  "step": "OBSERVE",
  "output": "string"
}

For END:

{
  "step": "END",
  "content": "string"
}

==================================================
AVAILABLE TOOL
==================================================

get_weather_information(input)

Purpose:
Retrieve current weather information for a city.

==================================================
FINAL REMINDER
==================================================

You are NOT allowed to create new step names.

The complete allowed vocabulary is:

START
PLAN
TOOL
OBSERVE
END

If the task is finished, use END.

Never use FINAL_RESPONSE, FINISH, COMPLETE, TERMINATE,
STOP, OUTPUT, RESPONSE, ACTION, or any other invented step.
"""

USER_PROMPT = input("👉 Prompt: ")

message_history: list[ChatCompletionMessageParam] = [
   { "role": "system", "content": SYSTEM_PROMPT },
   { "role": "user", "content": USER_PROMPT }
]

class AgentResponse(BaseModel):
  step: str = Field(..., description="One of: START, PLAN, TOOL, OBSERVE, END")
  content: Optional[str] = Field(None, description="Content for START, PLAN, or END")
  tool: Optional[str] = Field(None, description="Tool name, only for TOOL step")
  input: Optional[str] = Field(None, description="Tool input, only for TOOL step")
  output: Optional[str] = Field(None, description="Tool output, only for OBSERVE step")

while True:
   # LLM Call
   response = client.beta.chat.completions.parse(
      model="gemini-3.5-flash",
      messages=message_history,
      response_format=AgentResponse,
   )

   content = response.choices[0].message.parsed

   if content is None:
      # Log the raw refusal / raw output for debugging
      print("⚠️ Parse failed. Raw message:")
      print(response.choices[0].message)
      break

   print(f"🧠 {content}")
   step = content.step
    
   if step == "TOOL":
      message_history.append({
            "role": "assistant",
            "content": content.content
      })

      input_text = content.input
      tool_name = content.tool

      # pyrefly: ignore [bad-index]
      tool = available_tools[tool_name]
      assert input_text is not None
      tool_output = tool(input_text)

      message_history.append({
        "role": "developer",
        "content": json.dumps({
              "step": "OBSERVE",
              "output": tool_output
        })
      })

      message_history.append({
        "role": "user",
        "content": "Continue to the next step."
      })

      continue

   elif step == "END":
      break

   message_history.append({ "role": "assistant", "content": content.content })
   message_history.append({ "role": "user", "content": "Continue to the next step." })