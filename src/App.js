import React, { useEffect, useState, useReducer } from 'react';
import Report from './components/Report';
import SearchForm from './components/Input';
import ErrorPopup from './components/ErrorPopup';

import uuid from './utils/uuid';
import queryString from './utils/queryString';

import './styles/index.css';


const App = props => {

  const [ reports, setReports ] = useState([]);
  const [ error, setError ] = useState('');

  useEffect(() => {
  	// load in weather report of users current location automatically
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      //fetchReport({ lat: latitude, lon: longitude });
    })
  },[]);
  
  function triggerErrorPopup(message) {
    // open the popup (or overwrite existing popup message)
    setError(message);
    // auto hide popup after 5 seconds by setting error message to falsey empty string
    setTimeout(() => {
      // check that user didnt manually close the popup already
      if (error) {
        setError('');
      }
    }, 5000);
  }

  function onSubmit(zipcode) {
    if (reports.indexOf(zipcode) !== -1) return;

    setReports([...reports, zipcode]);
  }

  function onDelete(index) {
    const updatedReports = reports.slice(0, index)
      .concat(reports.slice(index + 1));

    setReports(updatedReports);
  }

  return (
    <main>
      <SearchForm onSubmit={onSubmit}/>
      <div className="report-wrapper">
      {
        reports.map((zipcode, i) => 
          <Report 
            key={zipcode}
            index={i}
            dispatchError={triggerErrorPopup}
            onDelete={onDelete}
            zipcode={zipcode}
          />
        )
      }
      </div>
      <ErrorPopup
        onClose={() => setError('')}
        message={error}
      />        
    </main>
  )
}

export default App;
