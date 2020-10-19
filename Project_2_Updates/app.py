#flask page 
#import flask and sqllite
from flask import Flask, render_template, request, jsonify
import sqlite3 as sqllite
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import sqlite3
import os
import pandas as pd
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///aqifinal.sqlite'
db = SQLAlchemy(app)
db.Model.metadata.reflect(db.engine)

class Aqi(db.Model):
    __tablename__ = 'merged_state_mean'
    __table_args__ = { 'extend_existing': True }
    Index = db.Column(db.Integer, primary_key=True)  
    State = db.Column(db.Text)
    Count_ozone = db.Column(db.Float)
    Mean_ozone = db.Column(db.Float)
    Min_ozone = db.Column(db.Float)
    Max_ozone = db.Column(db.Float)
    Count_pm = db.Column(db.Float)
    Mean_pm = db.Column(db.Float)
    Min_pm = db.Column(db.Float)
    Max_pm = db.Column(db.Float)

    def __repr__(self):
        return '<Aqi %r>' % self.id
    
    def as_dict(self):
        return{
        'Index': self.Index,
        'State': self.State,
        'Count_ozone': self.Count_ozone,
        'Mean_ozone': self.Mean_ozone,
        'Min_ozone': self.Min_ozone,
        'Max_ozone': self.Max_ozone,
        'Count_pm': self.Count_pm,
        'Mean_pm': self.Mean_pm,
        'Min_pm': self.Min_pm,
        'Mex_pm': self.Min_pm
        }

################
# Database Setup
################
# engine = create_engine("sqlite:///aqisstate.sqlite")

# # reflect an existing database into a new model
# Base = automap_base()

# # reflect the tables
# Base.prepare(engine, reflect = True)
# Base.classes.keys()

# # # Save reference to the table
# Merged_state_mean = Base.classes.merged_state_mean
# session = Session(bind=engine)

################
# Flask Routes
################

#create route for homepage that displays the heat map
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/mean")
def mean():    
    # session = Session(engine)

    """Return a list of all Station data""" 
    # Query Aqidata
    rows = Aqi.query.all()
    
    return jsonify([row.as_dict() for row in rows])
    
#     # # Create a dictionary from the row data and append to a list of datasets
#     # graphData = []
#     # for state, mean_ozone, mean_pm in results:
#     #     graph_dict = {}
#     #     graph_dict["state"] = state
#     #     graph_dict["mean_ozone"] = mean_ozone
#     #     graph_dict["mean_pm"] = mean_pm
#     #     graphData.append(graph_dict)

#     # return jsonify(graphData)

# #create another route that will display the js graphs
@app.route("/graphs")
def graph():
    return render_template('indexStateMean2.html')

if __name__=="__main__":
    app.run(debug=True) 
