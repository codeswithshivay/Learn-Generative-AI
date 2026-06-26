# Video 55 - Python Generators - Sending Values to Generators

# Sending Values to Generators
def chai():
   while True:
      chai = yield
      print(chai)

chai = chai()
next(chai)

chai.send('Lemon Chai')
chai.send('Masked Chai')
chai.send('White Chai')