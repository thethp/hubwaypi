var directionsDisplay,
    directionsService = new google.maps.DirectionsService(),
    routes = [];

function initialize() {
    var mapOptions = {
	center: new google.maps.LatLng(42.3581, -71.0636),
	zoom: 12,
	travelMode: google.maps.TravelMode.BICYCLING,
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var rendererOptions = {
	map: map
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));

    var inputFrom = (document.getElementById('pac-input-from'))
    searchBoxFrom = new google.maps.places.SearchBox((inputFrom)),
    inputTo = (document.getElementById('pac-input-to'))
    searchBoxTo = new google.maps.places.SearchBox((inputTo));

    $('.search').on('click', function() {
	var routes = [];
	var placeFrom = searchBoxFrom.getPlaces();
	var placeTo = searchBoxTo.getPlaces();
	if (placeFrom == undefined)  $('.controls.from').addClass('error');
	else if (placeTo == undefined)  $('.controls.to').addClass('error');
	else {
	    var inputLatFr = placeFrom[0].geometry.location.k,
                inputLongFr = placeFrom[0].geometry.location.A,
	        inputLatTo = placeTo[0].geometry.location.k,
                inputLongTo = placeTo[0].geometry.location.A;
	    $.getJSON('http://thpcod.es/hubwaypi/stations/closest/'+inputLatFr+'/'+inputLongFr+'/1', function(data) {
		var walkStartLat = data[0].lat[0];
		var walkStartLong = data[0].long[0];
		var directionsReq = {
		    origin: new google.maps.LatLng(inputLatFr, inputLongFr),
		    destination: new google.maps.LatLng(walkStartLat, walkStartLong),
		    travelMode: google.maps.TravelMode.WALKING,
		}
		directionsService.route(directionsReq, function(result, status) {
		    routes.push(result.routes[0].legs[0]);
		    $.getJSON('http://thpcod.es/hubwaypi/stations/closest/'+inputLatTo+'/'+inputLongTo+'/1', function(data) {
			var bkDirectionsReq = {
			    origin: new google.maps.LatLng(walkStartLat, walkStartLong),
			    destination: new google.maps.LatLng(data[0].lat[0], data[0].long[0]),
			    travelMode: google.maps.TravelMode.BICYCLING,
			}
			directionsService.route(bkDirectionsReq, function(result, status) {
			    routes.push(result.routes[0].legs[0]);
			    var finalDirectionsReq = {
				origin: new google.maps.LatLng(data[0].lat[0], data[0].long[0]),
				destination: new google.maps.LatLng(inputLatTo, inputLongTo),
				travelMode: google.maps.TravelMode.WALKING,
			    }
			    directionsService.route(finalDirectionsReq, function(result, status) {
				routes.push(result.routes[0].legs[0]);
				result.routes[0].legs = routes;
				if (status == google.maps.DirectionsStatus.OK) {
				    directionsDisplay.setDirections(result);
				    $('#directionsPanel').show();
				    $('#map-canvas').addClass('directionsUp');
				}
			    });
			});
		    });
		});
	    });
	}
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
