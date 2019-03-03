import React, { useEffect, useState } from 'react';
import Report from './components/Report';
import SearchForm from './components/Input';

import './styles/index.css';

const RootURL='http://api.openweathermap.org/data/2.5/weather?'
const KEY='&appid=7025a0745e9914c37a16678c2ddd9f32'; // steal my key, see if I care...

const App = props => {

  const [ reports, setReports ] = useState([]);
  
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      
      fetch(`${RootURL}${KEY}&lat=${latitude}&lon=${longitude}&units=imperial`)
        .then(data => data.json())
        .then(data => {
          setReports([data]);
        })
        .catch(err => { throw err });
    })
  },[]);

  const fetchReportByZipcode = zipcode => {
    fetch(`${RootURL}${KEY}&units=imperial&zip=${zipcode}`)
      .then(data => data.json())
      .then(data => {
        setReports([...reports, data]);
      })
      .catch(err => { throw err });
  }

  return (
    <div style={{ width: '100%'}}>
      <SearchForm onSubmit={fetchReportByZipcode}/>
      <div style={{display: 'flex', justifyContent: 'center', padding: 7}}>
      {
        reports.map(report => 
          <Report {...report} key={report.id} />
        )
      }
      </div>
    </div>
  )
}

export default App;
