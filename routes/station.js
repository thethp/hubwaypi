//Declarations
var yql = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent('select * from xml where url="https://www.thehubway.com/data/stations/bikeStations.xml"')+'&format=xml&callback=?',
    mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db('stationDB', server),
    jsdom = require('jsdom'),
    window = jsdom.jsdom().parentWindow,
    $ = require('jquery')(window);

//Open database
db.open(function(err, db) {
    if(!err) {
	console.log("Connected to stations DB");
	db.collection('stations', {strict: true}, function(err, collection) {
	    if(err) {
		console.log("Stations DB does not exist, creating it.");
		populateDB();
	    }
	});
    } else {
	console.log("Error Connecting to Station DB: " + err);
    }
});

//Create Database
var populateDB = function() {
    $.getJSON(yql, function(data) {
	var xml = data.results[0],
	    $xml = $($.parseXML(xml)),
	    stations = [];

	$xml.find('station').each(function(i) {
            console.log($(this).find('name').text());
	    
	});

	db.collection('stations', function(err, collection) {
	    collection.insert(stations, {safe: true}, function(err, result) {
		if(err) {
		    console.log("DB successfully created");
		} else {
		    console.log("Error creating database: " + err);
		}
	    });
	});
    });
}