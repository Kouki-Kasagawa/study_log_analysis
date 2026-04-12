from flask import Flask

app = Flask(__name__)
import Todo.app

from Todo import db
db.study_database()