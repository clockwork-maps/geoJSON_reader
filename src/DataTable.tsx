import { useState, useContext } from 'react';
import type { Geometry, GeoJsonProperties, Feature } from 'geojson'
import { WContext, WeightedData } from './WeightedData';

type dtVal = "metadata" | "props" | "propTypes"

interface metadataTypes{
    [index: string]: string | number,
}

interface DTableProps {
    target: metadataTypes | GeoJsonProperties | undefined,
    parser: dtVal | undefined
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
    const [panelTarget, setPanelTarget] = useState<metadataTypes | GeoJsonProperties | undefined>();
    const [panelType, setPanelType] = useState<dtVal | undefined>();
    const [panelFlag, setPanelFlag] = useState<"Meta" | "FKeys" | "Ginfo" | "Props" | "undefined">("undefined");
    const {wData, setWData} = useContext<WContext>(WeightedData);
    console.log('From DTable.tsx: ', wData);
    const data: rawExpected = props.data;
    const metadata: metadataTypes | undefined = data != undefined ? data.metadata : undefined;
    const features: Array<Feature<Geometry, GeoJsonProperties>> | undefined = data.features;
    const fPKeys: string[] | undefined = Object.keys(features![0].properties as object);
    const geometries : Geometry[] | undefined = data.geometries;
    const headerBools: boolean[] = [metadata != undefined, features != undefined, geometries != undefined,  fPKeys != undefined];
    const headers: ("Meta" | "FKeys" | "Ginfo" | "Props")[] = ["Meta", "FKeys", "Ginfo", "Props"];
    const tableObjects: {[index: string]: metadataTypes | GeoJsonProperties | Feature<Geometry, GeoJsonProperties> | Geometry[] | undefined} = {
        "Meta" : metadata,
        "FKeys" : features![0],
        "Ginfo": geometries,
        "Props" : features![0].properties
    }
    const tableTypes: {[index:string]: dtVal} = {
        "Meta" : "metadata",
        "Props" : "props"
    }
    function DTable(props: DTableProps){
        const tkeys: string[] | undefined = props.target !== undefined ? Object.keys(props.target as object) : undefined;
        return props.target !== undefined ? (
            <section className="diWrapper">
                <table className="diTable">
                    <tbody>
                        {tkeys!.map(key=>{
                            return(
                                <tr key={`${key}${Math.round(Math.random()*10)}`} >
                                    <th>{key}</th>
                                    <td>{props.parser === "metadata" ? props.target![key] : typeof props.target![key]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        ) : (
            <>
                <span className="promptText">Select a tab to draw a table</span>
            </>
        )
    }
    return (
        <>
            <article className="dataTable">
                <section className="spanRow" data-flag={panelFlag}>{headerBools.map((bool, i) => {
                    return (bool ? <span className={`srHeader sr${headers[i]}`} key={`${headers[i]}${Math.round(Math.random()*10)}`} onClick={()=>{
                        setPanelTarget(tableObjects[headers[i]]);
                        setPanelType(tableTypes[headers[i]]);
                        setPanelFlag(headers[i])
                    }} >{headers[i]}</span> : null)
                })}</section>
                <section className="dataInfo">
                    <DTable target={panelTarget} parser={panelType}/>
                </section>
            </article>
        </>
    )
}