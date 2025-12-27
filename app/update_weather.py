import sqlite3
from datetime import datetime
from weather import get_weather_text

# 千葉市
LAT = 35.6074
LON = 140.1065


def update_weather(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT id, date FROM study_log")
    rows = cursor.fetchall()

    for record_id, date_str in rows:
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            weather = get_weather_text(LAT, LON, target_date)
            cursor.execute(
                "UPDATE study_log SET weather = ? WHERE id = ?",
                (weather, record_id)
            )
            print(f"ID {record_id} の天気を「{weather}」に更新したよ！")
        except Exception as e:
            print(f"ID {record_id} の更新に失敗: {e}")

    conn.commit()
    conn.close()

if __name__ == "__main__": 
    update_weather("app/study.db")
