import * as L from 'leaflet'
import * as d3 from 'd3'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
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
    // REPLACE WITH GRID STYLING WHEN DEVELOPING LAYOUT
    mbstyle: {
        height: string,
        width: string
    }
    // layers: Layers,
}

export default function MapBlock(props: MBProps){
    const mID: string = props.mKey;
    const bURL: string = props.basemap.url;
    const center: L.LatLngExpression = [props.center[0], props.center[1]];
    const zoom: number = props.zoom;
    // REPLACE WITH GRID STYLING WHEN DEVELOPING LAYOUT
    const mbheight: string = props.mbstyle.height;
    const mbwidth: string = props.mbstyle.width;
    const laID: string = `${mID}left`;
    const baID: string = `${mID}bottom`;
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
        let refreshButton = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function(map: L.Map) {
                let refresh: HTMLButtonElement = L.DomUtil.create<"button">('button', 'refreshButton');
                refresh.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler-refresh" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#282828" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                </svg>`
                refresh.onclick = ()=>{ map.setView(center, zoom)};
                return refresh;
            },
            onRemove: function(map: L.Map){

            }
        });
        let rButton = new refreshButton();
        if (document.getElementById(`${mID}`)!.querySelectorAll('.refreshButton').length < 1) map.addControl(rButton);
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
            <article className="mapBlock" key={mID} style={{height:mbheight,width:mbwidth}} >
                <input type="text" className="mapTitle" defaultValue={'Testing Title'} />
                <svg className="leftAxis" id={laID} ></svg>
                <svg className="bottomAxis" id={baID} ></svg>
                <MapContainer id={mID} center={center} zoom={zoom} zoomControl={false} attributionControl={false} whenReady={()=>{setReady(true)}} >
                    <TileLayer url={bURL} ></TileLayer>
                    {ready ? <MapEvents /> : null}
                </MapContainer>
            </article>
        </>
    )
}