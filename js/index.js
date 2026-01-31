mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zZS0xNjgiLCJhIjoiY202aWYxY3lsMDdxdjJpcHJoaHlmZzdiNiJ9.3wUanYJCI6409InuRs9e7A';


let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 3.5, // starting zoom
    center: [-90.2559435, 37.6002614] // starting center
});

map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function
    // NOTE: basemap_test and basemap-satellite are same as "map1" and may be referred to as 
    //"map1" in the code later (such as for "id" for map.addLayer section below addSource section)
    //the SAME CONCEPT APPLIES TO MAP2, MAP3, ETC FOR EACH MAP IN THE ASSETS FOLDER!
    map.addSource('basemap-satellite', {
        'type': 'raster',
        'tiles': [
            'assets/basemap_test/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Legacy Mapbox Sattellite Basemap'
    });

    map.addSource('map2propsymcovid-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/map2propsymbolcovid/map2covidpropsymbolcounts/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'US Counties Covid Cases Proportional Symbol Tiles'
    });

    map.addSource('map3basemapanddata-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/map3_basemap+data/map3covidpropsymbolcounts/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'US Counties Covid Cases Prop Symbol + Counties + Basemap Tiles'
    });

    map.addSource('map4custom-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/map4_custommap_showroads/map4custommap/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Mapbox US Custom Show Roads Basemap of US Tiles'
    });

    map.addSource('map5-countiesandprop-nobackground-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/map5_countiesandprop_nobackground/map5_countiesandprop_nobackground/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Proportional Symbol Map and Counties Tiles'
    });

    map.addLayer({
        //NOTE: 'id' is a unique name, from above, for easy to identify purposes, 
        //I have decided to call this map1, map2, map3, etc for ease of understanding, 
        //see first note in code above for more info. ID ALSO IS WHAT THE TABS WILL BE NAMED 
        //IN THE NAVIGATION PANE IN THE UPPER RIGHT OF THE SCREEN!
        'id': 'Satellite Basemap (tile set 1 deliverable)',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'basemap-satellite'
        //NOTE: 'source' parameter in line above is SAME as what was put for 
        //first parameter for the matching "map.addSource" line in the section above!
        //for example for map1 here, this would be "basemap-satellite" for the source parameter value
    });

    //NOTE: Had to place this layer here above map 2 and 3 so this custom basemap 
    //would be able to be displayed and have the other feature maps (as in the prop symbol map and such)
    //be able to be displayed above it correctly. 
    map.addLayer({
        'id': 'Custom Mapbox Tiles Highlighting Streets (tile set 4 deliverable)',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'map4custom-tiles'
    });

    map.addLayer({
        'id': 'Satellite Basemap + COVID Proproportional Symbol Map (tile set 3 deliverable)',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'map3basemapanddata-tiles'
    });

    map.addLayer({
        'id': 'COVID Proportional Symbol Map (tile set 2 deliverable)',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'map2propsymcovid-tiles'
    });


    map.addLayer({
        'id': 'Proportional Symbol Map + US Counties Map (extra tile set)',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
        },
        'source': 'map5-countiesandprop-nobackground-tiles'
    });

});

const layers = [
    '1 - 542',
    '542 - 1182',
    '1182 - 2314',
    '2314 - 5454',
    '5454 - 756412'
];
const colors = [
    '#ffffff', 
    '#ffbaba', 
    '#ff6969',
    '#ff3131', 
    '#ff0000',  
];

const legend = document.getElementById('legend');

const source =
'<p><b>Sources:</b></p><p style="text-align: left; font-size:10pt"><a href="https://data.census.gov/table/ACSDP5Y2018.DP05?g=0100000US$050000&d=ACS+5-Year+Estimates+Data+Profiles&hidePreview=true">ACS 5 Year Estimates 2018 for Calculating COVID Rates</a></p><p style="text-align: left; font-size:10pt"><a href="https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html">US Census Bureau Data for US County Shapefiles</a></p>';

legend.innerHTML = "<b>2020 COVID Case Count in US Counties</b>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});

legend.innerHTML += source;

// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
    // If these two layers were not added to the map, abort
    //NOTE: Parameter below for map.getLayer uses the 'id' paramter from code above for map.addLayer
    if (!map.getLayer('Satellite Basemap (tile set 1 deliverable)') || !map.getLayer('COVID Proportional Symbol Map (tile set 2 deliverable)') || !map.getLayer('Satellite Basemap + COVID Proproportional Symbol Map (tile set 3 deliverable)') || !map.getLayer('Custom Mapbox Tiles Highlighting Streets (tile set 4 deliverable)') || !map.getLayer('Proportional Symbol Map + US Counties Map (extra tile set)')) {
        return;
    }

    // Enumerate ids of the layers.
    //NOTE: As explained above, for layering reasons, have to show map1, 
    //then map 4, then the others in this order so the maps with features as in the prop symbol map
    //can be displayed correctly 
    const toggleableLayerIds = ['Satellite Basemap (tile set 1 deliverable)', 'Custom Mapbox Tiles Highlighting Streets (tile set 4 deliverable)', 'Satellite Basemap + COVID Proproportional Symbol Map (tile set 3 deliverable)', 'COVID Proportional Symbol Map (tile set 2 deliverable)', 'Proportional Symbol Map + US Counties Map (extra tile set)'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'inactive';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.textContent;
            // preventDefault() tells the user agent that if the event does not get explicitly handled, 
            // its default action should not be taken as it normally would be.
            e.preventDefault();
            // The stopPropagation() method prevents further propagation of the current event in the capturing 
            // and bubbling phases. It does not, however, prevent any default behaviors from occurring; 
            // for instance, clicks on links are still processed. If you want to stop those behaviors, 
            // see the preventDefault() method.
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            // if it is currently visible, after the clicking, it will be turned off.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else { //otherise, it will be turned on.
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
        };

        // in the menu place holder, insert the layer links.
        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }
});