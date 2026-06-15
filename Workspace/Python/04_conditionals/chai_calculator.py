# Write a size based chai price calculator program

size_asked = input('Preffered tea size?').strip().lower()

pricing = {
  'small':'10₹',
  'medium':'15₹',
  'large':'20₹'
}

tea_price = pricing.get(size_asked, None)
print(tea_price) if tea_price else print('Unknown cup size')