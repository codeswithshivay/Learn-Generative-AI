# Write a thermostat logic that will do high temp alert if device is active and temp is more than 35

device_status = True
temperature = 34

if device_status and temperature > 35:
  print('High temperature alert!')
elif not device_status:
  print('Device is offline.')
else:
  print('Temperature is normal')