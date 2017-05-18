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

const d = [
  {
    "_id": "58f67e44282419e32cd33030",
    "friendlyName": "Misc",
    "friendlyColor": "Green",
    "filter": "Type=Misc",
    "__v": 0,
    "transactions": [
      {
        "amount": 52.14,
        "transactionType": "Food",
        "vendor": "Kroger",
        "label": "Food",
        "_id": "58f67e44282419e32cd33031",
        "date": "2017-04-18T20:59:48.992Z"
      },
      {
        "label": "Misc",
        "vendor": "Kroger",
        "transactionType": "Misc",
        "amount": 147.14,
        "_id": "58f92ce3a8725901591c0071",
        "date": "2017-04-20T21:49:23.112Z"
      },
      {
        "_id": "58ffb9546fe0c43cc5ae1727",
        "label": "Wine",
        "vendor": "Chateau Elan",
        "transactionType": "Wine",
        "amount": 30.99,
        "date": "2017-04-25T21:02:12.388Z"
      }
    ]
  }
]



class Buckets extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Grid container lg={12} md={12} xs={12} styles={styles.root}>
                    <Paper style={paperStyle} zDepth={4}>
                    <Grid item className={s.container}>
                        <h1>Jessica</h1>
                    </Grid>
                    {
                        d.map(function(bucket){
                            return <div>
                                <Grid item lg={6} md={6} xs={12} key={bucket._id} title={bucket.friendlyName}>
                                    <Paper style={paperStyle} zDepth={5}>
                                    <h1>{bucket.friendlyName}</h1>
                                    <Grid container styles={styles.root}>
                                {
                                    bucket.transactions.map(function(trans){
                                        return <div key={trans._id}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            <Paper style={paperStyle}>
                                                <div>label: {trans.label}</div>
                                                <div>vendor: {trans.vendor}</div>
                                                <div>type: {trans.transactionType}</div>
                                                <div>amount: {trans.amount}</div>
                                                <div>date: {trans.date}</div>
                                            </Paper>
                                        </Grid>
                                        <div>&nbsp;</div>
                                        </div>
                                    })
                                }
                                    </Grid>
                                    </Paper>
                                </Grid>
                            </div>
                        })
                    }
                    </Paper>
                    <Button label="Default" raised={true} style={buttonStyle} >Add Bucket</Button>
                </Grid>
            </MuiThemeProvider>
        );
    } 
}


export default withTheme(Buckets, s);
