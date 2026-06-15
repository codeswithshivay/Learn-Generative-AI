# Write a program to tell the features of each seat type

seat = input('Your seat type? ').strip().lower()

match seat:
  case 'sleeper':
    print('Sleeping Berth')
  case 'ac':
    print('Air Conditioning')
  case 'general':
    print('Basic Seating')
  case 'luxury':
    print('Premium Food + AC + Bedding')
  case _:
    print('Invalid seat type')