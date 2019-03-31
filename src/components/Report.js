import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
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

import queryString from '../utils/queryString';

const RootURL='http://api.openweathermap.org/data/2.5/weather'
const KEY='7025a0745e9914c37a16678c2ddd9f32'; // steal my key, see if I care...


const Report = ({ location, onDelete, dispatchError }) => {

	const [report, setReport] = useState(null);

	useEffect(() => {
		fetchReport();
	}, []);

	function fetchReport() {
		const lat = location.latitude;
		const lon = location.longitude;
		const query = queryString({ appid: KEY, units: 'imperial', lat, lon });

		fetch(`${RootURL}${query}`)
			.then(data => data.json())
			.then(data => {

				if (data.cod !== 200) {
					dispatchError(data.message || 'Something went wrong');
					onDelete();
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
			<CardContent className="card-content">
				<h2> {location.city}, {location.state }  { location.zip }</h2>  
				 {/* <h4>{ report.coord.lon} &deg; , { report.coord.lat } &deg;</h4>*/}
				{
					report ?
					<React.Fragment>
						<h1>{ report.main.temp }&deg;F  </h1> 
						<img 
							alt="weather icon"
							src={"http://openweathermap.org/img/w/" + report.weather[0].icon + ".png"}
						/>
						<h3> { report.weather[0].description } </h3>
						<small>Last checked: {report.updatedAt} </small>					
					</React.Fragment>
					:
					<div style={{width: '100%', minHeight: 150}}>
						<div style={{width: '50%',margin: '40px auto'}}>
							<CircularProgress />
						</div>
					</div> 					
				}
			</CardContent> 
			<CardActions>  
				<IconButton 
					aria-label="Refresh"
					color="primary" 
					component="span"
					disabled={!report}
					onClick={fetchReport}
				>
					<RefreshIcon />
				</IconButton>
			
				<IconButton 
					aria-label="Delete"
					onClick={onDelete}
				>
					<DeleteIcon />
				</IconButton>        
			</CardActions>
		</Card>
	)
}

export default Report;
