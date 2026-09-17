# First Agent Tools

# Imports
import requests
import subprocess

# Tool
def get_weather_information(city: str):
   print('Tool called!!')
   """
   Get the current weather information for a given city.
   """
   url = f"http://wttr.in/{city}?format=%C+%t"
   response = requests.get(url)
   text = response.text
   return text

def run_command(command):
   """
   Run a command on the user's machine.
   """
   print('Tool called!!')
   result = subprocess.run(command, shell=True, capture_output=True, text=True)
   return result.stdout

# Tools Map
available_tools = {
   "get_weather_information": get_weather_information,
   "run_command": run_command
}