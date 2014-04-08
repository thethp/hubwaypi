//Declarations
var yql = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent('select * from xml where url="https://www.thehubway.com/data/stations/bikeStations.xml"')+'&format=xml&callback=?',
    mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db('stationDB', server),
    jsdom = require('jsdom'),
    window = jsdom.jsdom().parentWindow,
    $ = require('jquery')(window),
    parseString = require('xml2js').parseString;

//Open database
db.open(function(err, db) {
    if(!err) {
	console.log("Connected to stations DB");
	db.collection('stations', {strict: true}, function(err, collection) {
	    if(err) {
		console.log("Stations DB does not exist, creating it.");
		populateDB();
	    } else {
		console.log("Connected to database");
	    }
	});
    } else {
	console.log("Error Connecting to Station DB: " + err);
    }
});

//Create Database
var populateDB = function() {
    $.getJSON(yql, function(data) {
	parseString(data.results[0], function(err, json){
	    if(err) {
		console.log("Error parsing XML: " + err);
	    } else {
		db.collection('stations', function(err, collection) {
		    collection.insert(json.stations.station, {safe: true}, function(err, result) {
			if(err) {
			    console.log("Error creating database: " + err);
			} else {
			    console.log("Database created successfully!");
			}
		    });
		});
	    }
	});
    });
}

//API CALLS
exports.allStations = function(req, res) {
    db.collection('stations', function(err, collection) {
	if(err) {
	    res.send("There was an error connecting to the database");
	} else {
	    collection.find().toArray(function(err, items) {
		if(err) {
		    res.send("There was an error finding your collection");
		} else {
		    res.send(items);
		}
	    });
	}
    });
};