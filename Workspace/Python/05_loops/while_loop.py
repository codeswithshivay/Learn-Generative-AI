# Simulate tea heating and stop when it exceeds 100 celcuis

temperature = 40

while temperature <= 100:
    if(temperature == 100): print('Tea boiled!')
    else: print(f'Temperature is {temperature}')
    temperature += 15