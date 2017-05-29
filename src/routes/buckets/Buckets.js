/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fetch from 'node-fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Bucket from './Bucket';
import AddEditBucket from './AddEditBucket';
import s from './Buckets.scss';

injectTapEventPlugin();

const paperStyle = {

//   height: 100,
//   width: 100,
  margin: 20,
  // textAlign: 'center',
  display: 'inline-block',
};

class Buckets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAddBucket: false, buckets: [] };
    this.showAddBucket = this.showAddBucket.bind(this);
    this.onAddBucket = this.onAddBucket.bind(this);
    this.onEditBucket = this.onEditBucket.bind(this);
    this.onCancelBucket = this.onCancelBucket.bind(this);
    this.onDeleteBucket = this.onDeleteBucket.bind(this);
  }

  showAddBucket() {
    this.setState({ showAddBucket: true });
  }

  onAddBucket(data) {
    const postData = {
      friendlyName: data.name,
      friendlyColor: data.color,
      filter: data.filter,
      transactions: [],
    };
    const local = this;
    fetch('http://localhost:3030/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
    .then(() => {
      fetch('http://localhost:3030/admin')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }
          return res.json();
        }).then((json) => {
          console.log(JSON.stringify(json));
          local.setState({
            buckets: json,
          });
        });
    }).catch((err) => {
      console.log(err);
    });
    this.setState({ showAddBucket: false });
  }

  onEditBucket(data, id) {
    const postData = {
      friendlyName: data.name,
      friendlyColor: data.color,
      filter: data.filter,
      transactions: [],
    };
    const local = this;
    fetch(`http://localhost:3030/admin/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
    .then(() => {
      fetch('http://localhost:3030/admin')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }
          return res.json();
        }).then((json) => {
          console.log(JSON.stringify(json));
          local.setState({
            buckets: json,
          });
        });
    }).catch((err) => {
      console.log(err);
    });
  }

  onCancelBucket() {
    this.setState({ showAddBucket: false });
  }

  componentDidMount() {
    const local = this;
    fetch('http://localhost:3030/admin')
      .then(res => res.json(),
      ).then((json) => {
        console.log(json);
        local.setState({
          buckets: json,
        });
      });
  }

  onDeleteBucket(id) {
    const local = this;
    fetch(`http://localhost:3030/admin/${id}`, { method: 'DELETE' })
    .then(() => {
      fetch('http://localhost:3030/admin')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }
          return res.json();
        }).then((json) => {
          console.log(JSON.stringify(json));
          local.setState({
            buckets: json,
          });
        });
    }).catch((err) => {
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
            { this.state.buckets.map(bucket =>
              (<div key={bucket._id}>
                <Bucket
                  b={bucket}
                  deleteBucket={this.onDeleteBucket}
                  onEditBucket={this.onEditBucket}
                />
              </div>)
            , this)}
            <div style={paperStyle}>
              <FloatingActionButton secondary={true} onClick={this.showAddBucket}>
                <ContentAdd />
              </FloatingActionButton>
              { this.state.showAddBucket ?
                <AddEditBucket
                  onAddEditBucket={this.onAddBucket}
                  onCancelBucket={this.onCancelBucket}
                /> : null }
            </div>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(Buckets, s);

