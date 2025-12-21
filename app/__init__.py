import os
from flask import Flask
import sqlite3


def create_app():
    base_dir = os.path.abspath(os.path.dirname(__file__))
    app = Flask(
        __name__,
        template_folder=os.path.join(base_dir, 'templates'),
        static_folder=os.path.join(base_dir, 'statics')
    )

    app.config['DATABASE'] = os.path.join(base_dir, 'study.db')

    init_db(app)

    from app.routes import main
    app.register_blueprint(main)

    return app


def init_db(app):
    print("### init_db called ###")
    conn = sqlite3.connect(app.config['DATABASE'])
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS study_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            start_hour INTEGER,
            study_minutes INTEGER,
            mood INTEGER,
            weather TEXT,
            weekday INTEGER,
            created_at TEXT
        );
    """)
    conn.commit()
    conn.close()

