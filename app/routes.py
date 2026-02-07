from flask import Blueprint, render_template,  request, redirect, current_app
import sqlite3
import subprocess
from datetime import datetime
import os
main = Blueprint('main', __name__)

# Flaskのファイルがあるディレクトリのパスを取得(よく理解していない)
basedir = os.path.abspath(os.path.dirname(__file__))
# analysis.py への絶対パスを作る
analyze_path = os.path.join(basedir, "analysis.py")

def get_db():
    return sqlite3.connect(current_app.config['DATABASE'])

@main.route('/', methods=["GET", "POST"])
def index():
    if request.method == "POST":
        start_hour = int(request.form["start_hour"])
        study_minutes = int(request.form["study_minutes"])
        mood = int(request.form["mood"])

        now = datetime.now()
        date = now.date().isoformat()
        weekday = now.weekday()
        created_at = now.isoformat()
        conn = get_db()
        c = conn.cursor()
        c.execute("""
            INSERT INTO study_log
            (date, start_hour, study_minutes, mood, weekday, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (date, start_hour, study_minutes, mood, weekday, created_at))
        conn.commit()
        conn.close()

        return redirect("/")

    return render_template("index.html")

@main.route('/logs')
def logs():
    conn = get_db()
    c = conn.cursor()
    c.execute("" \
    "SELECT date, start_hour, study_minutes, mood,weather,created_at" \
    " FROM study_log " \
    "ORDER BY id DESC")
    logs = c.fetchall()
    conn.close()

    return render_template("logs.html", logs=logs)

@main.route("/analysis")
def analysis():
    try:
        result = subprocess.run(["python3", "app/analyze.py"], capture_output=True, text=True, check=True)
        output = result.stdout
        return render_template("analysis.html", output=output)
    except subprocess.CalledProcessError as e:
    # ここがポイント！ e.stderr に「なぜ失敗したか」の理由が入っています
        print(f"Error details: {e.stderr}") 
        return f"Analysis script failed: {e.stderr}", 500
    # result = subprocess.run(["python3", "analyze.py"], capture_output=True, text=True, check=True)
    # output = result.stdout
    #return render_template("analysis.html",output = output)

# @main.route('/templates')
# def templates_page():
#     return render_template('templates.html')