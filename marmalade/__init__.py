from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)
db = SQLAlchemy()


def create_app(config):
    app.config.from_object(config)

    db.init_app(app)

    with app.app_context():
        from . import routes

        # db.drop_all()
        db.create_all()

        return app
