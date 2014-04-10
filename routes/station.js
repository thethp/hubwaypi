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
    parseString = require('xml2js').parseString,
    updateLive = ["lastCommWithServer", "nbBikes", "nbEmptyDocks", "latestUpdateTime"];

//Open database
db.open(function(err, db) {
    if(!err) {
	console.log("Connected to stations DB");
	db.collection('stations', {strict: true}, function(err, collection) {
	    if(err) {
		console.log("Stations DB does not exist, creating it.");
		populateDB(true);
	    } else {
		console.log("Updating database");
		populateDB(false);
	    }
	});
    } else {
	console.log("Error Connecting to Station DB: " + err);
    }
});

//Create Database
var populateDB = function(isInitiation, req, res) {
    $.getJSON(yql, function(data) {
	parseString(data.results[0], function(err, json){
            var date = new Date(),
	        t = date.getTime();
	    if(err) {
		console.log("Error parsing XML: " + err);
	    } else {
		db.collection('stations', function(err, collection) {
		    console.log("whatever");
		    if(isInitiation) {
		        collection.insert(json.stations.station, {safe: true}, function(err, result) {
			    if(err) {
			        console.log("Error creating database: " + err);
			    } else {
			        console.log("Database created successfully!");
			    }
		        });
		    } else {
			for(var i=0; i < json.stations.station.length; i++) {
			    json.stations.station[i].updatedInfoTime = t;
			    collection.update({id: json.stations.station[i].id}, json.stations.station[i], function(err, result) {
				console.log("Updated station: " + json.stations.station[i].id);
                            });
			}
			if (req != undefined) {
                            exports.stationAttr(req,res);
                        }
		    }
		});
	    }
	});
    });
}

//API CALLS
//return all stations as JSON
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

//return a specific station by it's id
exports.stationById = function(req, res) {
    var id = req.params.id;
    db.collection('stations', function(err, collection) {
        if(err) {
            res.send("There was an error connecting to the database");
        } else {
            collection.findOne({'id': id}, function(err, item) {
                if(err) {
                    res.send("There was an error finding your collection");
                } else {
                    res.send(item);
                }
            });
        }
    });
};

//return a specific station attribute
exports.stationAttr = function(req, res) {
    var id = req.params.id,
        attr = req.params.attr,
        date = new Date();
    
    db.collection('stations', function(err, collection) {
        if(err) {
            res.send("There was an error connecting to the database");
        } else {
            collection.findOne({'id': id}, function(err, item) {
                if(err) {
                    res.send("There was an error finding your collection");
                } else {
		    if(updateLive.indexOf(attr) != -1 && date.getTime()-item.updatedInfoTime > 300000) {
			console.log("Data is out of date.");
			populateDB(false, req, res);
		    } else {
			res.send(item[attr][0]);
		    }
                }
            });
        }
    });
};

//return  all stations with bikes greater than num provided by customer
exports.stationsByBikeQty = function(req, res) {
    var bikeQty = req.params.num;

    db.collection('stations', function(err, collection) {
        if(err) {
            res.send("There was an error connecting to the database");
        } else {
            collection.find({nbBikes:{$gt:bikeQty}}).toArray(function(err, items) {
                if(err) {
                    res.send("There was an error finding your collection");
                } else {
                    res.send(items);
                }
            });
        }
    });
};