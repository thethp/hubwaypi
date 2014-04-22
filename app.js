//Declarations
var express = require('express'),
    stations = require('./routes/station'),
    app = express();  

//Setup API calls
app.get('/hubwaypi/stations', stations.allStations);
app.get('/hubwaypi/stations/id/:id', stations.stationById);
app.get('/hubwaypi/stations/id/:id/:attr', stations.stationAttr);
app.get('/hubwaypi/stations/gt/:num', stations.stationsByBikeQty);
app.get('/hubwaypi/stations/closest/:lat/:long/:num', stations.closestStation);
app.get('/hubwaypi/stations/closest/:lat/:long', stations.closestStation);

//Allow cross-site fetching of API
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
	  
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

//Configure app
app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
    app.use(express.static(__dirname + '/public'));
});

//Actually show the server
app.listen(80);
console.log("Server running at http://127.0.0.1:80/");
