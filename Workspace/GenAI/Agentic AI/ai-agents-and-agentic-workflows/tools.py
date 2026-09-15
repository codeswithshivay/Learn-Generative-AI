# First Agent Tools

# Imports
import requests

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

# Tools Map
available_tools = {
   "get_weather_information": get_weather_information
}