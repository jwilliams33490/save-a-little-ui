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

        this.toggleShowAddBucket= this.toggleShowAddBucket.bind(this);
        this.onAddBucket= this.onAddBucket.bind(this);
        this.onCancelBucket= this.onCancelBucket.bind(this);
    }
    toggleShowAddBucket(){
      this.setState(prevState => ({
        showAddBucket: !prevState.showAddBucket
      }));

    }

    onAddBucket(){

    }
    onCancelBucket(){
      this.setState({showAddBucket: false});
    }

    render() {
        return (
            <MuiThemeProvider>
                <Grid container styles={styles.root}>
                    <Paper style={paperStyle} zDepth={4}>
                    <Grid item className={s.container}>
                        <h1>Jessica</h1>
                    </Grid>
                    <Button label="Default" raised={true} style={buttonStyle} onClick={this.toggleShowAddBucket}>Add Bucket</Button>
                    { this.state.showAddBucket ? <AddBucket onAddBucket= {this.onAddBucket} onCancelBucket= {this.onCancelBucket} /> : null }
                    {
                        this.state.buckets ? (
                          this.state.buckets.map(function(bucket){
                            return <Bucket b={bucket} />
                            })
                        ) : (
                           null
                          )
                        
                    }
                    </Paper>
                </Grid>
            </MuiThemeProvider>
        );
    } 
}


export default withTheme(Buckets, s);
