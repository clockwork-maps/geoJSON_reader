import * as L from 'leaflet'
import * as d3 from 'd3'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
// import { GeoJSON as GJSONLayer } from 'react-leaflet/GeoJSON'
import { useEffect, useState } from 'react'
import type { FeatureCollection } from 'geojson'
import './MapBlock.css'



interface BMProps {
    minZoom?: number,
    maxZoom?: number,
    detectRetina?: boolean,
    attribution?: string
}

interface BMLayer {
    url: string,
    properties: BMProps
}

interface MBProps {
    mKey: string
    basemap: BMLayer,
    center: number[],
    zoom: number,
    data: FeatureCollection,
    // layers: Layers,
}

export default function DataDisplay(props: MBProps){
    const mID: string = props.mKey;
    const bURL: string = props.basemap.url;
    const center: L.LatLngExpression = [props.center[0], props.center[1]];
    const zoom: number = props.zoom;
    const data: FeatureCollection = props.data;
    const laID: string = `${mID}left`;
    const baID: string = `${mID}bottom`;
    const [ready, setReady] = useState<boolean>(false);
    const [fit, setFit] = useState<boolean>(false)
    const [north, setNorth] = useState<number>();
    const [south, setSouth] = useState<number>();
    const [east, setEast] = useState<number>();
    const [west, setWest] = useState<number>();
    function MapEvents(){ 
        let map: L.Map = useMap();
        let bounds: L.LatLngBounds = map.getBounds();
        setNorth(bounds.getNorth());
        setSouth(bounds.getSouth());
        setEast(bounds.getEast());
        setWest(bounds.getWest());
        map.on('move', ()=>{
            let bounds: L.LatLngBounds = map.getBounds();
            setNorth(bounds.getNorth());
            setSouth(bounds.getSouth());
            setEast(bounds.getEast());
            setWest(bounds.getWest());
        });
        map.on('zoom', ()=>{
            let bounds: L.LatLngBounds = map.getBounds();
            setNorth(bounds.getNorth());
            setSouth(bounds.getSouth());
            setEast(bounds.getEast());
            setWest(bounds.getWest());
        });
        let datagroup: L.FeatureGroup = L.featureGroup([]);
        let dataObj: {[index:string]: L.CircleMarker} = {};
        (data.features as any).forEach((feature: any)=>{
            let coords: number[] = feature.geometry.coordinates;
            dataObj[feature.id] = L.circleMarker([coords[1],coords[0]],{
                radius: 10,
                stroke: false,
                // color: '#383838',
                // weight: 2,
                fill: true,
                fillColor: 'color-mix(in srgb, #E63946 80%, #FFF 20%)',
                fillOpacity: .5
            });
            datagroup.addLayer(dataObj[feature.id]);
        });
        if (!map.hasLayer(datagroup)) datagroup.addTo(map);
        if(!fit) {
            map.fitBounds(datagroup.getBounds());
            setFit(true);
        }
        // let dataLayer: L.GeoJSON = L.geoJSON(data);
        // if (!map.hasLayer(dataLayer)) dataLayer.addTo(map);
        return null
    }
    useEffect(()=>{
        if (north == undefined || south == undefined || east == undefined || west == undefined) return;
        const leftaxis: d3.Selection<SVGElement, unknown, HTMLElement, unknown> = d3.select(`#${laID}`);
        leftaxis.node()!.innerHTML = '';
        const labounds: DOMRect = leftaxis.node()!.getBoundingClientRect();
        const laln: number = labounds.width;
        const laht: number = labounds.height;
        const lascale: d3.ScaleLinear<number, number, never> = d3.scaleLinear().domain([north, south]).nice().range([0, laht]);
        const laxis: d3.Axis<d3.NumberValue> = d3.axisLeft(lascale);
        laxis.ticks(3);
        laxis.tickFormat((x: d3.NumberValue) => Number(x) > 0 ? `${Math.abs(Number(x))}N` : `${Math.abs(Number(x))}S`)
        const labg = leftaxis.append<'g'>('g');
        labg!.attr('transform', `translate(${laln-5},0)`);
        labg.call(laxis);
        const bottomaxis: d3.Selection<SVGElement, unknown, HTMLElement, unknown> = d3.select(`#${baID}`);
        bottomaxis.node()!.innerHTML = '';
        const babounds: DOMRect = bottomaxis.node()!.getBoundingClientRect();
        const baln: number = babounds.width;
        const bascale: d3.ScaleLinear<number, number, never> = d3.scaleLinear().domain([west, east]).nice().range([0, baln]);
        const baxis: d3.Axis<d3.NumberValue> = d3.axisBottom(bascale);
        baxis.ticks(3);
        baxis.tickFormat((x: d3.NumberValue) => Number(x) > 0 ? `${Math.abs(Number(x))}E` : `${Math.abs(Number(x))}W`);
        const babg = bottomaxis.append<'g'>('g');
        babg!.attr('transform', 'translate(0,5)');
        babg.call(baxis);

    }, [north, east, south, west])
    return (
        <>
            <article className="mapBlock dataDisplay" key={mID} >
                <input type="text" className="mapTitle" defaultValue={'Testing Title'} />
                <svg className="leftAxis" id={laID} ></svg>
                <svg className="bottomAxis" id={baID} ></svg>
                <MapContainer id={mID} center={center} zoom={zoom} zoomControl={false} whenReady={()=>{setReady(true)}} >
                    <TileLayer url={bURL} ></TileLayer>
                    {ready ? <MapEvents /> : null}
                </MapContainer>
            </article>
        </>
    )
}