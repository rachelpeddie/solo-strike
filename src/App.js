import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaTint } from 'react-icons/fa';
import axios from 'axios';
import './App.css';

//moment
var moment = require('moment');

class App extends Component {

  componentDidMount = () => {
    const now = moment().format();
    const expiration = moment("2019-04-24T17:24:22+0000");

    // get the difference between the moments
    const diff = expiration.diff(now);
    console.log(diff);
    

    //express as a duration
    const diffDuration = moment.duration(diff);
    if( diffDuration.days() >= 0) {
      console.log(`water the plants`);
    }
    else{
      console.log(`relax!`);
      
    }

    // display
    console.log("Days:", diffDuration.days());
    console.log("Hours:", diffDuration.hours());
    console.log("Minutes:", diffDuration.minutes());
    console.log("Seconds:", diffDuration.seconds());
  }

  waterPlant = () => {
    let time = moment().format('YYYY-MM-DD');

    let message = {
      text: `Hey you!  It's time to water your plant!`,
      time: time
    };
    axios({
      method: 'GET',
      url: '/water',
    })
      .then(response => {
        console.log(`woot!  get req sent!`);
      }).catch(error => {
        console.log(`error sending get req`, error);
      })
    
    axios({
      method: 'POST',
      url: '/water',
      data: {
        message
      }
    })
    .then( response => {
      console.log(`woot!  sent a message!`);
    }).catch( error => {
      console.log(`error sending message`, error);
    })
  }

  render() {
    return (
      <IconContext.Provider value={{ color: 'teal'}}>
      <div>
        <button onClick={this.waterPlant}><FaTint size={70}/></button>
      </div>
      </IconContext.Provider>
    );
  }
}

export default App;
