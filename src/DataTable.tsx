import { index } from 'd3';
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
    console.log(data);
    const metadata: metadataTypes | undefined = data != undefined ? data.metadata : undefined;
    console.log(metadata);
    const features: Array<Feature<Geometry, GeoJsonProperties>> | undefined = data.features;
    const fKeys: string[] | undefined = Object.keys(features![0].properties as object);
    const geometries : Geometry[] | undefined = data.geometries;
    const headerBools: boolean[] = [metadata != undefined, features != undefined, geometries != undefined,  fKeys != undefined];
    const headers: string[] = ["Meta", "Finfo", "Ginfo", "Props"];
    return (
        <>
            <article className="dataTable">
                <section className="spanRow">{headerBools.map((bool, i) => {
                    return (bool ? <span className='srHeader'>{headers[i]}</span> : null)
                })}</section>
                <section className="dataInfo"></section>
            </article>
        </>
    )
}