import { createContext, useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import App from './App'
import axios from 'axios'


type CVals = number[][][] | number[][] | number[];

interface LeafletVectorProps {
    radius?: number,
    stroke?: boolean,
    color?: string,
    weight?: number,
    opacity?: number,
    dashArray?: string,
    dashOffset?: string,
    fill?: boolean,
    fillColor?: string,
    fillOpacity?: number,
    pane?: string,
    attribution?: string
}

interface WDMetadata {
    id?: string
}

interface WeightedObjects { coords: CVals, props: LeafletVectorProps, meta?: WDMetadata };

export type WData = WeightedObjects[];

type WDState = React.Dispatch<React.SetStateAction<WData>>;

export interface WContext {
    wData: WData,
    setWData: WDState
}

const WCInit: WContext = {
    wData: [],
    setWData: ()=>[]
}

export const WeightedData = createContext<WContext>(WCInit);

interface WDPProps {
    url?: string,
}

export function WDataProvider(props: WDPProps){
    const { data:dataset, isLoading } = useQuery({
        queryKey: ["dataset"],
        queryFn: async () => {
            const { data } = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2023-12-08%2000:00:00&endtime=2023-12-08%2023:59:59&minmagnitude=2.5&orderby=time');
            return data
        },
    });
    const [wData, setWData] = useState<WData>([]);
    useEffect(()=>{
        if (!isLoading) {
        const base = dataset.features!;
        console.log('base: ', base);
        const holder: WData = [];
        base.forEach((feature: any)=>{
            let mholder: any = {}
            if (feature.geometry.type == 'Point') {
            mholder.coords = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
            mholder.props = {
                radius: 10,
                stroke: false,
                fill: true,
                fillColor: 'color-mix(in srgb, #E63946 80%, #FFF 20%)',
                fillOpacity: .5
            }
            }
            holder.push(mholder);
        });
        console.log('holder: ', holder);
        setWData([...holder]);
        }
    },[isLoading]);   
    return(
        <WeightedData.Provider value={{wData, setWData}}>
            {!isLoading ?  <App dataset={dataset} /> : null}
        </WeightedData.Provider>
    )
}