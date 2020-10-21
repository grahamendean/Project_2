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

class Ozone(db.Model):
    __tablename__ = 'ozone'
    __table_args__ = { 'extend_existing': True }
    Index = db.Column(db.Integer, primary_key=True)  
    State = db.Column(db.Text)
    City = db.Column(db.Text)
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    Pollutant = db.Column(db.Text)
    Average = db.Column(db.Float)

    def __repr__(self):
        return '<Aqi %r>' % self.id
    
    def as_dict(self):
        return{
        'Index': self.Index,
        'State': self.State,
        'City': self.City,
        'Latitude': self.Latitude,
        'Longitude': self.Longitude,
        'Pollutant': self.Pollutant,
        'Average': self.Average,
        }

class Pm(db.Model):
    __tablename__ = 'pm'
    __table_args__ = { 'extend_existing': True }
    Index = db.Column(db.Integer, primary_key=True)  
    State = db.Column(db.Text)
    City = db.Column(db.Text)
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    Pollutant = db.Column(db.Text)
    Average = db.Column(db.Float)

    def __repr__(self):
        return '<Aqi %r>' % self.id
    
    def as_dict(self):
        return{
        'Index': self.Index,
        'State': self.State,
        'City': self.City,
        'Latitude': self.Latitude,
        'Longitude': self.Longitude,
        'Pollutant': self.Pollutant,
        'Average': self.Average,
        }

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

@app.route("/ozone")
def ozone():    
    # Query Aqidata
    
    rows = Ozone.query.all()

    points =[]
    for row in rows:
        points.append({
            "type":"Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [row.Longitude, row.Latitude]},
            "properties": {
                "stateName":row.State, 
                "cityName": row.City},
            })
    return jsonify(points)
    

@app.route("/pm")
def pm():    
    # Query Aqidata
    rows = Pm.query.all()

    return jsonify([row.as_dict() for row in rows])

    # return jsonify(points)
    """Return a list of all Station data""" 

# #create another route that will display the js graphs
@app.route("/graphs")
def graph():
    return render_template('indexStateMean2.html')


@app.route("/map")
def map():
    return render_template('indexSamples.html')

if __name__=="__main__":
    app.run(debug=True) 
