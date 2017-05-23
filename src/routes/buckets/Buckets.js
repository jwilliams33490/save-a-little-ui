/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import { MuiThemeProvider } from 'material-ui/styles';
import Bucket from './Bucket.js';
import AddBucket from './AddBucket.js';
import fetch from 'node-fetch';

import s from './Buckets.scss';

const styles = {
  root: { 
    display: 'flex',
    flexWrap: 'wrap',
   justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};


const buttonStyle = {
  margin: 12,
};

const paperStyle = { 

//   height: 100,
//   width: 100,
  margin: 20,
  // textAlign: 'center',
  display: 'inline-block',
};

// const d = [
//   {
//     "_id": "58f67e44282419e32cd33030",
//     "friendlyName": "Misc",
//     "friendlyColor": "Green",
//     "filter": "Type=Misc",
//     "__v": 0,
//     "transactions": [
//       {
//         "amount": 52.14,
//         "transactionType": "Food",
//         "vendor": "Kroger",
//         "label": "Food",
//         "_id": "58f67e44282419e32cd33031",
//         "date": "2017-04-18T20:59:48.992Z"
//       },
//       {
//         "label": "Misc",
//         "vendor": "Kroger",
//         "transactionType": "Misc",
//         "amount": 147.14,
//         "_id": "58f92ce3a8725901591c0071",
//         "date": "2017-04-20T21:49:23.112Z"
//       },
//       {
//         "_id": "58ffb9546fe0c43cc5ae1727",
//         "label": "Wine",
//         "vendor": "Chateau Elan",
//         "transactionType": "Wine",
//         "amount": 30.99,
//         "date": "2017-04-25T21:02:12.388Z"
//       }
//     ]
//   }
// ]



class Buckets extends React.Component {
    constructor(props){
        super(props);
        this.state = {showAddBucket: false,buckets:[]}
        

        this.showAddBucket= this.showAddBucket.bind(this);
        this.onAddBucket= this.onAddBucket.bind(this);
        this.onCancelBucket= this.onCancelBucket.bind(this);
    }
    showAddBucket(){
       this.setState({showAddBucket: true});
    }

    onAddBucket(data){
      console.log('about to add bucket ' + JSON.stringify(data));
      const postData = {friendlyName: data.name, friendlyColor: data.color, filter: data.filter, transactions: []}
      let local = this;
      fetch('http://localhost:3030/admin', { method: 'POST', headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(postData)})
        .then(function(res) {
            fetch('http://localhost:3030/admin')
              .then(function(res) {
                if(!res.ok){
                  console.log(res.status);
                  console.log(res.statusText);
                  throw new Error(res.statusText);
                }
                  return res.json();
              }).then(function(json) {
                  console.log(JSON.stringify(json));
                  local.setState({
                    buckets:json
                  })          
              });
        }).catch(function(err) {
        console.log(err);
    });


       this.setState({showAddBucket: false});
    }
    onCancelBucket(){
      this.setState({showAddBucket: false});
    }
    componentDidMount(){
      var local = this;
        fetch('http://localhost:3030/admin')
          .then(function(res) {
              return res.json();
          }).then(function(json) {
              console.log(json);
              local.setState({
                buckets:json
              })          
          });
    }

    render() {
        return (
            <MuiThemeProvider>
                <Grid container styles={styles.root}>
                    <Paper style={paperStyle} zDepth={4}>
                    <Grid item className={s.container}>
                        <h1>Jessica</h1>
                    </Grid>
                    <Button label="Default" raised={true} style={buttonStyle} onClick={this.showAddBucket}>Add Bucket</Button>
                    { this.state.showAddBucket ? <AddBucket onAddBucket= {this.onAddBucket} onCancelBucket= {this.onCancelBucket} /> : null }
                    { this.state.buckets.map(function(bucket){
                        return <Bucket b={bucket} />
                    })};
                    </Paper>
                </Grid>
            </MuiThemeProvider>
        );
    } 
}


export default withTheme(Buckets, s);
