import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import './App.css';


function App() {
  const {onToggleButton, tg} = useTelegram();


  useEffect (() => {
    tg.ready();
  }, [])
  

  return (
    <div className="App">
        <Header />
        <button onClick={onToggleButton}>Toggle</button>

    </div>
  );
}

export default App;
