import React, { useEffect, useState, useReducer } from 'react';
import zipcodes from 'zipcodes';

import Report from './components/Report';
import SearchForm from './components/Input';
import ErrorPopup from './components/ErrorPopup';
import queryString from './utils/queryString';

import './styles/index.css';


const App = props => {

  const [ reports, setReports ] = useState([]);
  const [ error, setError ] = useState('');

  useEffect(() => {
  	// load in weather report of users current location automatically
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      const userLocation = zipcodes.lookupByCoords(latitude, longitude);

      if (userLocation) {
        console.log({ userLocation });
        setReports([ userLocation ]);
      }
      //fetchReport({ lat: latitude, lon: longitude });
    }, positionError => {
      console.log('Could not load user\'s location data');
      //setError(positionError.message);
    })
  },[]);
  

  function onSubmit(zipcode) {
    // only allow unique zipcodes
    if (reports.some(v => v.zip === zipcode)) {
      return setError(`A weather report for ${zipcode} is already being displayed`);
    } 

    const location = zipcodes.lookup(zipcode);
 
    if (!location) {
      return setError('Invalid U.S. zipcode');
    }

    setReports([...reports, location]);
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
        reports.map((location, i) => 
          <Report 
            key={location.zipcode}
            dispatchError={err => setError(err)}
            onDelete={() => onDelete(i)}
            location={location}
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
