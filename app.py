#flask page 
#import flask and sqllite
from flask import Flask, render_template, request, jsonify
import sqlite3 as sqllite
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from datetime import timedelta
import numpy as np

# Database Setup
#################################################
engine = create_engine("sqlite:///aqi.sqlite")

Base = automap_base()

Base.prepare(engine, reflect = True)

#create references to each table


#################################################
app = Flask(__name__)

#create route for homepage that displays the heat map.
@app.route('/')
def heat_map():
    return render_template('indexMC.html')




#create another route that will display the js graphs
# @app.route("/graphs")
# def graph():
#     return render_template('indexMC.html')












if __name__ == '__main__':
   app.run(debug = True)