from Todo import app
from flask import render_template, request, redirect, url_for

import sqlite3
DATABASE = "database.db"

@app.route('/')
def index():

    con = sqlite3.connect(DATABASE)
    db_study = con.execute('SELECT * FROM study').fetchall()
    study = []

    for row in db_study:
        study.append({'how_long': row[0],'time': row[1],'status': row[2]})

    return render_template(
        'index.html',
        study = study,
        motivation = '10',
        suggest = "電車に乗った5分間だけ単語"
    )

@app.route("/calendar")
def calendar():
    return render_template("calendar.html")



@app.route("/register_study", methods=["POST"])
def register_study():
    how_long = request.form["how_long"]
    time = request.form["time"]
    status = request.form["status"]


    con = sqlite3.connect(DATABASE)
    con.execute('INSERT INTO study VALUES(?, ?, ?)',
                [how_long, time, status])
    con.commit()
    con.close()

    return redirect(url_for('index'))

@app.route("/register_schedule_and_task", methods=["POST"])
def register_schedule_and_task():

    record_type = request.form["type"]      # schedule or tasks
    title = request.form["title"]
    memo = request.form["memo"]
    date = request.form["date"]
    category = request.form["category"]


    con = sqlite3.connect(DATABASE)
    con.execute(
        'INSERT INTO schedule(type, title, memo, date, category) VALUES (?, ?, ?, ?, ?)',
        [record_type, title, memo, date, category]
    )
    con.commit()
    con.close()

    return redirect(url_for('index'))



if __name__ == "__main__":
    app.run(debug=True)