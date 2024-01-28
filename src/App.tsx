import type { FeatureCollection } from 'geojson'
import MapBlock from './MapBlock'
import DataDisplay from './DataDisplay'
import DataTable from './DataTable'
import 'leaflet/dist/leaflet.css'
import './App.css'
import './DataPreview.css'

type appProps = {
  dataset: FeatureCollection
}

export default function App(props: appProps) {
  const placeholder = {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    properties: {}
  };
  const dataset = props.dataset;
  return (
    <>     
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
    </>
  )
}

