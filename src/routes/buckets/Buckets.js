/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
// import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Bucket from './Bucket.js';
import AddBucket from './AddBucket.js';
import fetch from 'node-fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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

class Buckets extends React.Component {
    constructor(props){
        super(props);
        this.state = {showAddBucket: false,buckets:[]}
        this.showAddBucket= this.showAddBucket.bind(this);
        this.onAddBucket= this.onAddBucket.bind(this);
        this.onCancelBucket= this.onCancelBucket.bind(this);
        this.onDeleteBucket = this.onDeleteBucket.bind(this);
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
              });          
          });
    }

    onDeleteBucket(id){
      console.log("ready to delete" + id);
      let local = this;
      fetch('http://localhost:3030/admin/' + id, { method: 'DELETE'})
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
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div >
                    <Paper style={paperStyle} zDepth={4}>
                    <div className={s.container}>
                        <h1>Jessica</h1>
                    </div>
                    { this.state.buckets.map(function(bucket){
                        return (<div key={bucket._id}><Bucket b={bucket} deleteBucket={this.onDeleteBucket} /></div>)
                    }, this)}
                    <div style={paperStyle}>
                      <FloatingActionButton secondary={true} onClick={this.showAddBucket} ><ContentAdd/></FloatingActionButton>
                      { this.state.showAddBucket ? <AddBucket onAddBucket= {this.onAddBucket} onCancelBucket= {this.onCancelBucket} /> : null }
                    </div>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    } 
}
export default withStyles(Buckets, s);

