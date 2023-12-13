import * as d3 from 'd3';
import type { Geometry, GeoJsonProperties, Feature } from 'geojson'


interface metadataTypes{
    [index: string]: string | number,
}

interface rawExpected{
    type?: string,
    metadata?: metadataTypes,
    features?: Array<Feature<Geometry, GeoJsonProperties>>,
    geometries?: Geometry[]
}

interface DTProps{
    data: rawExpected
}

export default function DataTable(props: DTProps){
    const data: rawExpected = props.data;
    // console.log(data);
    const metadata: metadataTypes | undefined = data != undefined ? data.metadata : undefined;
    // console.log(metadata);
    const features: Array<Feature<Geometry, GeoJsonProperties>> | undefined = data.features;
    const fKeys: string[] | undefined = Object.keys(features![0].properties as object);
    const geometries : Geometry[] | undefined = data.geometries;
    const headerBools: boolean[] = [metadata != undefined, features != undefined, geometries != undefined,  fKeys != undefined];
    const headers: string[] = ["Meta", "Finfo", "Ginfo", "Props"];
    function MTable(){
        const mkeys: string[] | undefined = Object.keys(metadata as object);
        const dID: string = `dialog${Math.round(Math.random() * 15)}`;
        return(
            <table className="diTable">
                <tbody>
                    {mkeys.map(key=>{
                        return(
                            <tr key={`${key}${Math.round(Math.random()*10)}`} onMouseEnter={(e)=>{
                                let target: EventTarget = e.target;
                                let dialog: HTMLElement | null = document.getElementById(dID);
                                (target as HTMLElement)!.appendChild(dialog!);
                                (dialog as HTMLDialogElement).show();
                                dialog!.innerHTML = `<p class="infoText"> <span class="itHeader">${key}:</span> ${metadata![key]}</p>`
                            }} onMouseLeave={()=>{
                                let dialog: HTMLElement | null = document.getElementById(dID);
                                (dialog as HTMLDialogElement).close();
                            }}>
                                <th onMouseEnter={(e)=>{
                                    let target: HTMLElement | null = (e.target as HTMLElement).parentElement;
                                    let dialog: HTMLElement | null = document.getElementById(dID);
                                    target!.appendChild(dialog!);
                                    (dialog as HTMLDialogElement).show();
                                    dialog!.innerHTML = `<p class="infoText"> <span class="itHeader">${key}:</span> ${metadata![key]}</p>`
                                }} onMouseLeave={()=>{
                                    let dialog: HTMLElement | null = document.getElementById(dID);
                                    (dialog as HTMLDialogElement).close();
                                }}>{key}</th>
                                <td onMouseEnter={(e)=>{
                                    let target: HTMLElement | null = (e.target as HTMLElement).parentElement;
                                    let dialog: HTMLElement | null = document.getElementById(dID);
                                    target!.appendChild(dialog!);
                                    (dialog as HTMLDialogElement).show();
                                    dialog!.innerHTML = `<p class="infoText"> <span class="itHeader">${key}:</span> ${metadata![key]}</p>`
                                }} onMouseLeave={()=>{
                                    let dialog: HTMLElement | null = document.getElementById(dID);
                                    (dialog as HTMLDialogElement).close();
                                }}>{metadata![key]}</td>
                            </tr>
                        )
                    })}
                </tbody>
                <dialog className='infoPopup' id={dID} />
            </table>
        )
    }
    return (
        <>
            <article className="dataTable">
                <section className="spanRow">{headerBools.map((bool, i) => {
                    return (bool ? <span className='srHeader' key={`${headers[i]}${Math.round(Math.random()*10)}`}>{headers[i]}</span> : null)
                })}</section>
                <section className="dataInfo">
                    <MTable />
                </section>
            </article>
        </>
    )
}