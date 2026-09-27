from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pathlib import Path

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