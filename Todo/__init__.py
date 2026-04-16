from flask import Flask


app = Flask(__name__)
import Todo.app

from Todo import db
db.study_database()
db.schedule_and_tasks_database()