from langchain_community.document_loaders import PyPDFLoader
from pathlib import Path

# PDF Path
pdf_path = Path(__file__).parent / 'openai_model_master.pdf'

loader = PyPDFLoader(str(pdf_path))
docs = loader.load()
print(f'Loaded {len(docs)} pages')

for i, doc in enumerate(docs[:2]):
   print(f'--- Page {i+1} ---')
   print(doc.page_content[:200]) # First 200 chars
   print()