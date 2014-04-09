hubwaypi
========

An API for hubway information that returns information as json instead of having to navigate that XML file, built using node, express, and mongoDB

Hubway is the public bike system in Boston.  It is a series of stations around the city with docks.  There is an XML hidden away in the background of the site with data about the stations including where they are and how many bikes/empty docks are at them presently but navigating XML is a pain in the ass, so rather than every developer having to do that themselves, why not just have one API for everyone to use.

#Goals
The goal of this project is to create an API for the hubway data, so that people can make cool things using all the information they have available.

It is currently heavily under development by Todd Page, but is distributed under the MIT license, so go nuts.  I have a lot of things to finish [see the issues] but I'd like to finish them myself, then open it to pull requests etc.

Eventually I will deliver the steps necessary to get this running locally.

#Calls

As of right now, here are the calls that have been implemented:

**All Stations**
- returns a list of all the stations
- returns as json
```
/stations
```
EG: http://thpcod.es/hubwaypi/stations

**Station**
- returns a single station as identified by it's ID
- returns as json
```
/stations/ID
```
EG: http://thpcod.es/hubwaypi/stations/3

**Station Attribute**
- returns the requested attribute of the station when given a specific id
- id: returns the id of the station [as String]
- name: returns the name of the station [as String]
- terminalName: returns the terminalName of the station [as String]
- lastCommWithServer: returns the timestamp of the last communication of this station with the server [as String]
- lat: returns the latitude of this station [as String]
- long: returns the longitude of this station [as String]
- installed: returns true or false depending on whether or not this station is installed [as String]
- locked: returns true or false depending on whether or not this station is locked [as String]
- installDate: returns a timestamp for the install date of this station [as String]
- removalDate: if valid, returns a timestamp for the removal date of this station, otherwise returns null [as String]
- temporary: returns true or false depending on whether or not this dock is temporary [as String]
- public: returns true or false depending on whether or not this station is public [as String]
- nbBikes: returns the number of bikes at this station at the present moment [as String]
- nbEmptyDocks: returns the number of empty docks at this station at the present moment [at String]
- latestUpdateTime: returns a timestamp of the last time this information is updated [as String]
```
/stations/ID/ATTRIBUTE
```
EG: http://thpcod.es/hubwaypi/stations/3/name

EG: http:://thpcod.es/hubwaypi/stations/4/lat
