import MapBlock from './MapBlock'
import './App.css'

function App() {
  const placeholder = {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    properties: {}
  };
  return (
    <>
      <MapBlock mKey={'mappy'} basemap={placeholder} center={[51.505, -0.09]} zoom={14}/>
        
    </>
  )
}

export default App
