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
        study = study
    )

@app.route("/logs")
def logs():
    return render_template(
        "logs.html"
    )


@app.route("/register", methods=["POST"])
def register():
    how_long = request.form["how_long"]
    time = request.form["time"]
    status = request.form["status"]

    con = sqlite3.connect(DATABASE)
    con.execute('INSERT INTO study VALUE(?, ?, ?)',
                [how_long, time, status])
    con.commit()
    con.close()

    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)