/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Buckets.scss';
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
    render(){
         return (
            <div className={s.root}>
            <div className={s.container}>
                <h1>Jessica</h1>
                {
                    d.map(function(bucket){
                        return <Grid>
                            <Row>name: {bucket.friendlyName}</Row>
                            <Row>
                            {
                                bucket.transactions.map(function(trans){
                                    return <Col md={6}>
                                    <div>label: {trans.label}</div>
                                    <div>vendor: {trans.vendor}</div>
                                    <div>type: {trans.transactionType}</div>
                                    <div>amount: {trans.amount}</div>
                                    <div>date: {trans.date}</div>
                                    </Col>
                                })
                            }
                            </Row>
                        </Grid>
                    })
                }
            </div>
            </div>
        );
    }
 
}

Buckets.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Buckets, s);
