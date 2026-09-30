from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pathlib import Path
from time import sleep
import os
from dotenv import load_dotenv


# Import env
load_dotenv('../.env')

print('env .....', os.getenv('GEMINI_API_KEY'))


# PDF Path
pdf_path = Path(__file__).parent / 'openai_model_master.pdf'

loader = PyPDFLoader(str(pdf_path))
docs = loader.load()

print(f'Loaded {len(docs)} pages')


# Split documents into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=60,
)

chunks = text_splitter.split_documents(documents=docs)

print(f'Split documents into {len(chunks)} chunks')


# Google Embedding Model
embedding_model = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=os.getenv('GEMINI_API_KEY')
)

print("Embeddings created successfully")


# -----------------------------------------
# Create Qdrant collection
# -----------------------------------------

vector_store = QdrantVectorStore.from_documents(
    documents=[],
    embedding=embedding_model,
    url="http://localhost:6333",
    collection_name="learning_rag",
    force_recreate=True,
)

print("Qdrant collection created successfully")


# -----------------------------------------
# Embed and store chunks in controlled batches
# -----------------------------------------

BATCH_SIZE = 80
WAIT_TIME = 60

total_chunks = len(chunks)

for start in range(0, total_chunks, BATCH_SIZE):

    end = min(start + BATCH_SIZE, total_chunks)

    batch = chunks[start:end]

    print(
        f"\nEmbedding chunks "
        f"{start + 1} → {end} "
        f"out of {total_chunks}"
    )

    vector_store.add_documents(batch)

    print(f"Successfully stored chunks {start + 1} → {end}")

    # Wait before sending the next batch
    if end < total_chunks:

        print(
            f"Waiting {WAIT_TIME} seconds "
            f"before the next embedding batch..."
        )

        sleep(WAIT_TIME)


print("\nopenai_model_master.pdf has been indexed successfully.")