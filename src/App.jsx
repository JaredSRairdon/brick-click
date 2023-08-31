import './App.css';
import { GameProvider } from './contexts/GameContext';
import SectionLeft from './components/SectionLeft/SectionLeft';
import SectionRight from './components/SectionRight/SectionRight';

function App() {
  return (
    <GameProvider>
      <div className="app">
        <SectionLeft/>
        <SectionRight/>
      </div>
    </GameProvider>
  );
};

export default App;
