import { useQuery } from '@tanstack/react-query'
import { CVals, LeafletVectorProps, WDMetadata, WeightedObjects, WeightedData } from './WeightedData.ts'
import { useState, useEffect } from 'react'
import MapBlock from './MapBlock'
import DataDisplay from './DataDisplay'
import DataTable from './DataTable'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import './App.css'
import './DataPreview.css'

export default function App() {
  const { data:dataset, isLoading } = useQuery({
    queryKey: ["dataset"],
    queryFn: async () => {
      const { data } = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2023-12-08%2000:00:00&endtime=2023-12-08%2023:59:59&minmagnitude=2.5&orderby=time');
      return data
    },
  });
  const placeholder = {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    properties: {}
  };
  const [wData, setWData] = useState<WeightedObjects[] | undefined>(undefined);
  useEffect(()=>{
    if (!isLoading) {
      const base = dataset.features!;
      const holder: WeightedObjects[] | undefined = [];
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
      })
      setWData(holder);
    }
  },[isLoading]);
  console.log(wData);
  return (
    <>
    <WeightedData.Provider value={wData}>
      <main className='app' data-orientation='portrait' >
        <section className="controlHeader" ></section>
        <section className="controlBox"></section>
        <section className="contentWrapper">
          <article className='dataPreview'>
            {dataset !== undefined ? <DataDisplay mKey={'mappy'} basemap={placeholder} center={[51.505, -0.09]} zoom={10} data={dataset} /> : null}
            {dataset !== undefined ? <DataTable data={dataset} /> : null}
          </article>
        </section>
        {/* <MapBlock mKey={'mappy2'} basemap={placeholder} center={[51.505, -0.09]} zoom={14} mbstyle={{height: '450px', width: '450px' }}/> */}
      </main>
    </WeightedData.Provider>
    </>
  )
}

