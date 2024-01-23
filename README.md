# GeoJSON Reader

The core concept of this app is allowing people to view a visualization of a geospatial dataset on the web--without a dedicated desktop app. The motivation is that while it is possible to develop an understanding of a file through careful reading, thorough inspection of the data via a dedicated map reader, or enough familiarity with associated data that one can simply intuit an understanding by looking at a file there are to my knowledge no low effort preview tools for geospatial data. There are going to need to be some limitations as to what data is allowed.

1. Needs to be a `.geojson` file. No `.json` formatting, or any other kind.
2. Coordinates need to be in degrees decimal and default projection (Mercator). This *may* change if I find an easy way to implement projection changes and the way to change them won't demand a major rewrite. No guarantees.

The app will provide an overview of the data as a visualization with user-selected metadata alongside it. Further data will be present in user inserted panels, and these panels will come equipped with a unified presentation of a single column of numeric data, a handwritten note, or alone. Layouts will be limited by page size and landscape or portrait formatting. At the moment standard US Letter size is all that is intended, but this is the topic I see myself most likely to expand on in the future.

Qualitative data will have the option of being visualized with a color scheme. Quantitative data will have the option of being visualized with a color scheme and a scaling representation of opacity, symbol size (for point objects), or both. Color schema will *most likely* be user-definable, but if there is some unexpected hurdle of sufficient discomfort for this process selection will be limited to several predefined schema. 

Quantitative data will also have the option of statistical representation, but the only thing I'm **guaranteeing** is min, max, and mean. I think std deviation is likely, and I'd like to do Jenks classification as well. Statistical representation will be delivered in both graph and color schema form.