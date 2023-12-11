import MapBlock from './MapBlock'
import DataDisplay from './DataDisplay'
import DataTable from './DataTable'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import './App.css'
import './DataPreview.css'

export default function App() {
  const { data:dataset } = useQuery({
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
  return (
    <>
    <main className="contentWrapper" data-orientation='portrait' >
      <section className='dataPreview'>
        {dataset != undefined ? <DataDisplay mKey={'mappy'} basemap={placeholder} center={[51.505, -0.09]} zoom={10} data={dataset} /> : null}
        {dataset != undefined ? <DataTable data={dataset} /> : null}
      </section>
      {/* <MapBlock mKey={'mappy2'} basemap={placeholder} center={[51.505, -0.09]} zoom={14} mbstyle={{height: '450px', width: '450px' }}/> */}
    </main>
    </>
  )
}

