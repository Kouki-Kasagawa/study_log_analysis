import sqlite3
DATABASE = "database.db"

def study_database():
    con = sqlite3.connect(DATABASE)
    con.execute("CREATE TABLE IF NOT EXISTS study(how_long, time, status)")
    con.close