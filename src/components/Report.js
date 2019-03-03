import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';

const App = props => {

  return (

    <Card style={{margin: 5}}>
      {
        props.name ?
        <CardActionArea>
          <CardContent>
            <h1 style={{textAlign: 'center'}}>{ props.main.temp }&deg;F  </h1>
            <h2> { props.name }</h2>  
             {/* <h4>{ props.coord.lon} &deg; , { props.coord.lat } &deg;</h4>*/}
            <div style={{display:'flex'}}>
            <h3> { props.weather[0].description } </h3>
            <img 
              alt="weather icon"
              style={{verticalAlign:'middle'}} 
              src={"http://openweathermap.org/img/w/" + props.weather[0].icon + ".png"}
            />
           </div>
          </CardContent>
        </CardActionArea>
        :
         <CircularProgress />
      }
      <CardActions>
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <RefreshIcon />
          </IconButton>
        </label>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>        
      </CardActions>
    </Card>
  )
}

export default App;
