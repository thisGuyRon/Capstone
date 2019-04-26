import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
#PyMySQL 
import pymysql.cursors
pymysql.install_as_MySQLdb()

app = Flask(__name__)


#################################################
# Database Setup
#################################################

connection = pymysql.connect(host='localhost',
                             user='root',
                             password='Primavera01',
                             db='simpsons',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

cur = connection.cursor()
@app.route('/')
def index():
    #cur.execute('select season, avg(imdb_rating) "Avg_rating" from episodes group by season')
    #rv = cur.fetchall()
    #return jsonify(rv)
    return render_template('index.html')
@app.route('/Static.html')
def Static():
    return render_template('Static.html')
@app.route('/map.html')
def maps():
    return render_template('map.html')
@app.route('/Homer.html')
def Homer():
    return render_template("Homer.html")
@app.route('/Dynamic.html')
def Dynamic():
    return render_template("Dynamic.html")
@app.route('/Race.html')
def Race():
    return render_template("Race.html")
@app.route('/Search.html')
def Search():
    return render_template("Search.html")
@app.route('/Springfield')
def springfield():
    cur.execute("select * from spring_new")
    rv = cur.fetchall()
    return jsonify(rv)
@app.route('/season_load')
def season_load():
    cur.execute('select "All" union select distinct season from episodes')
    rv=cur.fetchall()
    return jsonify(rv)

@app.route('/char_load')
def char_load():
    cur.execute('select * from char_dropdown')
    rv1=cur.fetchall()
    return jsonify(rv1)

@app.route('/search/<input>')
def search(input):
    cur.execute('select season as "Season_No", season_episode_no as "Season_Episode_No", title, "" as "line", image_url as "image" from episodes where title like "%' + input + '%" union select e.season, e.season_episode_no, e.title, s.normalized_text, e.image_url from episodes e join s_lines s on e.episode_id=s.episode_id where s.normalized_text like "%'+input+'%" limit 500')
    rv=cur.fetchall()
    return jsonify(rv)


if __name__ == "__main__":
    app.run(debug=True)