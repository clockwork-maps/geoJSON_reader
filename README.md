# GeoJSON Reader

This repository will be outlining the logic needed to define a GeoJSON preview generator... _possibly_ a JSON preview generator with manual pointing to preview functions. The initial target will be GeoJSON because of its regularized formatting, and I specify this because many major public databases (Places API, Overpass Turbo, etc) use JSON as their data format of choice even when coordinate data is included. 

Previews will consist of an overview map, a user-selectable range of smaller plots, column names & datatypes, and possible statistical graphs of user-defined data. Powered by React, D3, and Leaflet.

Currently working on logic for custom map components.