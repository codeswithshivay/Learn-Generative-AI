from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pathlib import Path
import os
from dotenv import load_dotenv

# Import env
load_dotenv('../.env')

print('env .....',os.getenv('GEMINI_API_KEY'))

# PDF Path
pdf_path = Path(__file__).parent / 'openai_model_master.pdf'

loader = PyPDFLoader(str(pdf_path))
docs = loader.load()

print(f'Loaded {len(docs)} pages')

# Converting the data into chunks by splitting the documents

text_splitter = RecursiveCharacterTextSplitter(
   chunk_size=400,
   chunk_overlap=60,
)

chunks = text_splitter.split_documents(documents=docs)

print(f'Split documents into {len(chunks)} chunks')

embedding_model = OpenAIEmbeddings(
   model="text-embedding-004",
   api_key=os.getenv('GEMINI_API_KEY'),
   # Update this line exactly:
   openai_api_base="https://googleapis.com"
)


vector_store = QdrantVectorStore.from_documents(
   documents=chunks,
   embedding=embedding_model,
   url="http://localhost:6333",
   collection_name="learning_rag",
   force_recreate=True,
)


print("openai_model_masters.pdf has been indexed.")