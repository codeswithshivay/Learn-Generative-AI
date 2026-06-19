# Understanding walrus operator in python

# What is a statement ?
# an action that you told the python interpreter to do! examples (x = 10, mean: assign 10 to the x variable)

# value = 4

# if (remainder := value % 2):
#     print(f'Not Divisible!, remainder: {remainder}')
# else:
#     print(f'Divisible!, remainder: {remainder}')

available_sizes = ['small', 'medium', 'large']
if(requested_size := input('Enter your tea size?') in available_sizes):
    print('Serving chai!')
else:
    print('Size not available')