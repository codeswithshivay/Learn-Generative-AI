snack_asked = input('Tell me the snack?')
available_snacks = {'samosa', 'cookies'}

if snack_asked.strip().lower() in available_snacks:
  print('Order confirmed!')
else:
  print('Not available!')