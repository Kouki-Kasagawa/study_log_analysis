# データを持ってきて、基本統計量を出すファイル
import os
import sqlite3
import pandas as pd



#もともとのままだと、エラーが起きやすいので、修正した
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR, "study.db")

conn = sqlite3.connect(file_path)
df = pd.read_sql("SELECT * FROM study_log", conn)

print(df)
print("\n--統計--")
print(df.describe())
#describe()はdfのデータに対する基本統計量を出すことができる（vscodeじょうで）
