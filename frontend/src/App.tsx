import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import { useEffect } from 'react';
import OfflineStoreManager from './store/offlineStoreManager';
import FormWrapper from './components/FormWrapper';

function App() {

  useEffect(() => {
    const handleOnline = async () => {
      const dexieDB = OfflineStoreManager.getInstance();
      console.log('Processing pending submissions...');
      await dexieDB.processPendingSubmissions();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<FormWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
