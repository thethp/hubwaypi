var data = {
    all: {
	code:"/stations",
	parameters:"None",
	returns:"A list of all stations as <span>JSON</span>",
	example:"http://thpcod.es/hubwaypi/stations"
    },
    closest: {
	code:"/stations/closest/LAT/LONG/NUM",
	parameters:"Latitude, Longitude, Number of stations",
	returns:"A list of all stations as <span>JSON</span>", example:"http://thpcod.es/hubwaypi/stations/closest/42.370379/-71.101735/3"
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