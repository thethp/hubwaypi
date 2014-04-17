var data = {
    all: {
	code:"/stations",
	parameters:"<li>None</li>",
	returns:"A list of all stations as <strong>JSON</strong>",
	example:"<a href='http://thpcod.es/hubwaypi/stations'>http://thpcod.es/hubwaypi/stations</a>"
    },
    closest: {
	code:"/stations/closest/LAT/LONG/NUM",
	parameters:"<li><strong>LAT</strong>: latitude of point to search from</li><li><strong>LONG</strong>: longitude of point to search from</li><li><strong>NUM</strong>: Number of stations to return [optional - if undefined returns all stations]</li>",
	returns:"A list of <strong>NUM</strong> stations from closest to furthest as <strong>JSON</strong>", example:"<li><a href='http://thpcod.es/hubwaypi/stations/closest/42.370379/-71.101735/3'>http://thpcod.es/hubwaypi/stations/closest/42.370379/-71.101735/3</a></li><li><a href='http://thpcod.es/hubwaypi/stations/closest/42.370379/-71.101735'>http://thpcod.es/hubwaypi/stations/closest/42.370379/-71.101735</a></li"
    },
    single: {
	code:"/stations/id/ID",
	parameters:"<li><strong>ID</strong>: The id of the station you are querying</li>",
	returns:"All details for the requested station as <span>JSON</span>",
	example:"<a href='http://thpcod.es/hubwaypi/stations/id/3'>http://thpcod.es/hubwaypi/stations/id/3</a>"
    },
    num: {
	code:"/stations/gt/NUM",
	parameters:"<li><NUM>ID</strong>: The number of bikes you would like to find stations with more than</li>",
	returns:"All stations that currently have greater than NUM bikes <span>JSON</span>",
	example:"<a href='http://thpcod.es/hubwaypi/stations/gt/3'>http://thpcod.es/hubwaypi/stations/gt/9</a>"
    }
};
changeDetails("all");

$('li').click(function(e) {
    $('li').removeClass('active');
    $(e.currentTarget).addClass('active');
    changeDetails(e.currentTarget.getAttribute("dataKey"));
});

function changeDetails(callName) {
    var source = $("#codeInfo").html();
    var template = Handlebars.compile(source);
    var html = template(data[callName]);
    $(".callInfo").html(html);
}