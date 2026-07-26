# Import
import tiktoken # Developed by OpenAI

# Encoder
encoder = tiktoken.encoding_for_model('gpt-4o')

# Human text
text = 'Hey there, how are you?'
# Encode it
encoded = encoder.encode(text)
# Token [25216, 1354, 11, 1495, 553, 481, 30]
print('Tokens: ', encoded)

# Decode
decoded = encoder.decode([25216, 1354, 11, 1495, 553, 481, 30])
print('Decoded: ', decoded)