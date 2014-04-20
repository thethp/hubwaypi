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
    returns:"All details for the requested station as <strong>JSON</strong>",
    example:"<a href='http://thpcod.es/hubwaypi/stations/id/3'>http://thpcod.es/hubwaypi/stations/id/3</a>"
  },
  num: {
    code:"/stations/gt/NUM",
    parameters:"<li><strong>NUM</strong>: The number of bikes you would like to find stations with more than</li>",
    returns:"All stations that currently have greater than NUM bikes <span>JSON</span>",
    example:"<a href='http://thpcod.es/hubwaypi/stations/gt/3'>http://thpcod.es/hubwaypi/stations/gt/9</a>",
  },
  details: {
    code:"/stations/id/ID/",
    parameters:"<li><strong>ID</strong>: The id of the station you are querying the information of</li><li><strong>ATTR</strong>: The attribute you are querying<ul><li><u>id</u></u>: returns the id of the station</li><li><u>name</u>: returns the name of the station</li><li><u>terminalName</u>: returns the terminalName of the station</li><li><u>lastCommWithServer</u>: returns the timestamp of the last communication of this station with the server</li><li><u>lat</u>: returns the latitude of this station</li><li><u>long</u>: returns the longitude of this station</li><li><u>installed</u>: returns true or false depending on whether or not this station is installed</li><li><u>locked</u>: returns true or false depending on whether or not this station is locked</li><li><u>installDate</u>: returns a timestamp for the install date of this station</li><li><u>removalDate</u>: if valid, returns a timestamp for the removal date of this station, otherwise returns null</li><li><u>temporary</u>: returns true or false depending on whether or not this dock is temporary</li><li><u>public</u>: returns true or false depending on whether or not this station is public</li><li><u>nbBikes</u>: returns the number of bikes at this station at the present moment</li><li><u>nbEmptyDocks</u>: returns the number of empty docks at this station at the present moment</li><li><u>latestUpdateTime</u>: returns a timestamp of the last time this information is updated</li></ul></li>",
    returns:"The attribute requested as a <span>String</span>",
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
