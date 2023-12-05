import MapBlock from './MapBlock'
import './App.css'

function App() {
  const placeholder = {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    properties: {}
  };
  return (
    <>
      <MapBlock mKey={'mappy'} basemap={placeholder} />
        
    </>
  )
}

export default App
