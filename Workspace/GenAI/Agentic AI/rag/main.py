from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_qdrant import QdrantVectorStore

import os
from dotenv import load_dotenv

# Import env
load_dotenv('../.env')

# Embedding model
embedding_model = GoogleGenerativeAIEmbeddings(
   model="gemini-embedding-001",
   google_api_key=os.getenv('GEMINI_API_KEY')
)

# Vector store
# pyrefly: ignore [missing-argument]
vector_store = QdrantVectorStore.from_existing_collection(
   embedding=embedding_model,
   url="http://localhost:6333",
   collection_name="learning_rag",
)

user_query = input('Ask: ')

# Similar documents
similar_documents = vector_store.similarity_search(query=user_query)
print(f'Found {len(similar_documents)} similar documents')

# Context
context = [f"Document Text: {doc.page_content}\nMetadata: {doc.metadata.get('source')}, Page: {doc.metadata.get('page')} " for doc in similar_documents]

# SYSTEM PROMPT
SYSTEM_PROMPT = f"""
   You are a helpful assistant, who assist the user with what it is asking.

   1. Use only the context given below to answer the user's query

   2. If the answer is not in the context, then say that you don't know the answer

   3. Context: {context}
"""

# Model
model = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite")

# Messages
messages = [
   SystemMessage(content=SYSTEM_PROMPT),
   HumanMessage(content=user_query)
]

# Response
response = model.invoke(messages)

# Print response
print(f"Response 🤖: {response.text}")