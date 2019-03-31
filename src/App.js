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
  

  function onSubmit(zipcode) {
    // only allow unique zipcodes
    if (reports.indexOf(zipcode) !== -1) {
      return setError(`A weather report for ${zipcode} is already being displayed`);
    } 

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
            dispatchError={err => setError(err)}
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
