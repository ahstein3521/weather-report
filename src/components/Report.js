import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';

import { lookup as zipcodeLookup } from 'zipcodes';

import queryString from '../utils/queryString';

const RootURL='http://api.openweathermap.org/data/2.5/weather'
const KEY='7025a0745e9914c37a16678c2ddd9f32'; // steal my key, see if I care...


const Report = ({ zipcode, index, onDelete, dispatchError }) => {

	const [report, setReport] = useState(null);

	useEffect(() => {
		fetchReport();
	}, []);

	function fetchReport() {
		// open weather api doesnt give accurate location from zipcode...
		// this lookup only works for us/canada though
		const location = zipcodeLookup(zipcode);

		const query = { appid: KEY, units: 'imperial' };


		if (location) {
			// use lat,lon returned from lookup if possible
			query.lat = location.latitude;
			query.lon = location.longitude;
		} else {
			query.zip = zipcode;
		}

		fetch(`${RootURL}${queryString(query)}`)
			.then(data => data.json())
			.then(data => {

				if (data.cod !== 200) {
					dispatchError(data.message || 'Something went wrong');
					onDelete(index);
				} else {
				
					data.updatedAt = new Date().toLocaleString();
					data.location = location;
					console.log(data);
					setReport(data);
				}
				
			})
		}

	return (
		<Card style={{margin: 5, maxWidth: 400}}>
	
				{ report ?
					<CardContent className="card-content">
						<h1>{ report.main.temp }&deg;F  </h1>
						<h2> {report.name} {report.location ? ', ' + report.location.state : null}</h2>  
						 {/* <h4>{ report.coord.lon} &deg; , { report.coord.lat } &deg;</h4>*/}
						<img 
							alt="weather icon"
							src={"http://openweathermap.org/img/w/" + report.weather[0].icon + ".png"}
						/>
						<h3> { report.weather[0].description } </h3>
						<small>Last checked: {report.updatedAt} </small>
					</CardContent>  
					:
					<div style={{width: '100%', minHeight: 150}}>
						<div style={{width: '50%',margin: '40px auto'}}>
							<CircularProgress />
						</div>
					</div> 
				}
			
			<CardActions>  
				<IconButton 
					aria-label="Refresh"
					color="primary" 
					component="span"
					disabled={!report}
					onClick={() => fetchReport({ zip: zipcode })}
				>
					<RefreshIcon />
				</IconButton>
			
				<IconButton 
					aria-label="Delete"
					onClick={() => onDelete(index)}
				>
					<DeleteIcon />
				</IconButton>        
			</CardActions>
		</Card>
	)
}

export default Report;
