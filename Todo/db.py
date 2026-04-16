import sqlite3
DATABASE = "database.db"

def study_database():
    con = sqlite3.connect(DATABASE)
    con.execute("CREATE TABLE IF NOT EXISTS study(id INTEGER PRIMARY KEY AUTOINCREMENT,how_long, time, status)")
    con.close()

def schedule_and_tasks_database():
    con = sqlite3.connect(DATABASE)
    con.execute("CREATE TABLE IF NOT EXISTS schedule(id INTEGER PRIMARY KEY AUTOINCREMENT,type, title, memo, date, category)")
    con.close()
