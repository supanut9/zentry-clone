import './index.css';

import About from './components/About';
import Features from './components/Features';
import Hero from './components/Hero';
import Nabar from './components/Nabar';

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Nabar />
      <Hero />
      <About />
      <Features />
    </main>
  );
};

export default App;
