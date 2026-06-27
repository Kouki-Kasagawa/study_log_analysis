from Todo import app
from flask import render_template, request, redirect, url_for

import sqlite3
DATABASE = "database.db"

@app.route('/')
def index():

    con = sqlite3.connect(DATABASE)
    db_study = con.execute('SELECT * FROM study').fetchall()
    con.close()
    study = []

    for row in db_study:
        study.append({'id': row[0],'how_long': row[1],'study_time': row[2],'status': row[3]})

    return render_template(
        'index.html',
        study = study,
        motivation = '10',
        suggest = "電車に乗った5分間だけ単語"
    )    

@app.route("/calendar")
def calendar():

    con = sqlite3.connect(DATABASE)

    schedules = con.execute(
        "SELECT type, title, date, memo FROM schedule"
    ).fetchall()

    study_logs = con.execute(
        "SELECT study_time, status, how_long FROM study"
    ).fetchall()

    con.close()

    return render_template(
        "calendar.html",
        schedules=schedules,
        study_logs=study_logs
    )



@app.route("/register_study", methods=["POST"])
def register_study():
    how_long = request.form["how_long"]
    study_time = request.form["study_time"]
    status = request.form["status"]


    con = sqlite3.connect(DATABASE)
    con.execute(
        'INSERT INTO study (how_long, study_time, status) VALUES (?, ?, ?)',
        (how_long, study_time, status)
    )
    con.commit()
    con.close()

    return redirect(url_for('index'))

@app.route("/register_schedule_and_task", methods=["POST"])
def register_schedule_and_task():

    record_type = request.form["type"]      # schedule or tasks
    title = request.form["title"]
    memo = request.form["memo"]
    date = request.form["date"]
    category = request.form.get("category", "")


    con = sqlite3.connect(DATABASE)
    con.execute(
        'INSERT INTO schedule(type, title, memo, date, category) VALUES (?, ?, ?, ?, ?)',
        [record_type, title, memo, date, category]
    )
    con.commit()
    con.close()

    return redirect(url_for('index'))

@app.route("/delete", methods=["POST"])
def delete():
    ids = request.form.getlist("delete_ids")

    con = sqlite3.connect(DATABASE)
    if ids:
        con.execute(
            f"DELETE FROM study WHERE id IN ({','.join(['?']*len(ids))})",
            ids
        )
    con.commit()
    con.close()

    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)