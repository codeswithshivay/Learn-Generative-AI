# Video 53 - Python Generators - Yield and Next Method

# Yield and Next Method

def serve_chai():
   yield 'Masala Chai'
   yield 'Lemon Chai'
   yield 'Mint Chai'

stall = serve_chai()
print('1st call to next(stall):', next(stall))
print('2nd call to next(stall):', next(stall))
print('3rd call to next(stall):', next(stall))