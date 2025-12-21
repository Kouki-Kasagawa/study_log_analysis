# データを持ってきて、基本統計量を出すファイル

import sqlite3
import pandas as pd


conn = sqlite3.connect("app/study.db")
df = pd.read_sql("SELECT * FROM study_log", conn)

print(df)
print("\n--統計--")
print(df.describe())
#describe()はdfのデータに対する基本統計量を出すことができる（vscodeじょうで）
