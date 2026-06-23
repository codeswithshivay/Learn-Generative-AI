# Video 45: Lambdas, Pure vs Impure

# Pure Function
# def add(a, b):
#     return a + b

# Impure Function (Not Recommended)
# a = 2
# b = 2
# total = 0

# def add():
#     global total
#     total = a + b

# Recursive Function - which calls itself and stop after a certain condition met

# Lambdas
numbers = [1,2,4,5,7,8]

even_numbers = list(filter(lambda num: num % 2 == 0 , numbers))
print(even_numbers)