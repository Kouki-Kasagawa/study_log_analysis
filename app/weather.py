import requests
from datetime import date

def weather_code_to_text(code):
    if code == 0:
        return"晴れ"
    elif code in(1,2):
        return"晴れ時々曇り"
    elif code == 3:
        return"曇り"
    elif code in(61,63, 65):
        return"曇り"
    else:
        return"その他"

def get_weather_text(lat, lon, target_date):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "weathercode",
        "timezone": "Asia/Tokyo",
        "start_date": target_date.isoformat(),
        "end_date": target_date.isoformat(),
    }

    res = requests.get(url, params=params)
    res.raise_for_status()
    data = res.json()

    code = data["daily"]["weathercode"][0]
    return weather_code_to_text(code)