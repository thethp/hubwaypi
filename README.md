hubwaypi
========

An API for hubway information that returns information as json instead of having to navigate that XML file

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

**Station Name**
- returns the name of the station when given a specific id
- returns as string
```
/stations/ID/name
```
EG: http://thpcod.es/hubwaypi/stations/3/name
