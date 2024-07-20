import './App.css';
import { GameProvider } from './contexts/GameContext';
import SectionLeft from './components/SectionLeft/SectionLeft';
import SectionRight from './components/SectionRight/SectionRight';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <GameProvider>
      <ErrorBoundary>
        <div className="app">
          <SectionLeft/>
          <SectionRight/>
        </div>
      </ErrorBoundary>
    </GameProvider>
  );
};

export default App;