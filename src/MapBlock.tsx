import * as L from 'leaflet'
import * as d3 from 'd3'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
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
    // layers: Layers,
}

export default function MapBlock(props: MBProps){
    const mID: string = props.mKey;
    const bURL: string = props.basemap.url;
    const [ready, setReady] = useState<boolean>(false);
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
        return null
    }
    useEffect(()=>{
        if (north == undefined || south == undefined || east == undefined || west == undefined) return;
        console.log('North: ', north, 'South: ', south, 'East: ', east, 'West: ', west);
    }, [north, east, south, west])
    return (
        <>
            <article className="mapBlock" key={mID} >
                <svg className="leftAxis"></svg>
                <svg className="bottomAxis"></svg>
                <MapContainer center={[51.505, -0.09]} zoom={13} zoomControl={false} whenReady={()=>{setReady(true)}}>
                    <TileLayer url={bURL} ></TileLayer>
                    {ready ? <MapEvents /> : null}
                </MapContainer>
            </article>
        </>
    )
}