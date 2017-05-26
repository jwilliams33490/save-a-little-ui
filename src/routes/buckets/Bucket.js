import React, { PropTypes } from 'react';
// import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import Transaction from './Transaction.js';
import AddEditTransaction from './AddEditTransaction.js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import s from './Buckets.scss';

const buttonStyle = {
  margin: 12,
};

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

const paperStyle = { 

//   height: 100,
//   width: 100,
  margin: 20,
  // textAlign: 'center',
  display: 'inline-block',
};

class Bucket extends React.Component{
    constructor(props){
        super(props)
        this.state={showAddTransaction:false, transactions:props.b.transactions}
        this.showAddTransaction = this.showAddTransaction.bind(this);
        this.addTransaction = this.addTransaction.bind(this);
        this.cancelTransaction = this.cancelTransaction.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onDeleteTransaction = this.onDeleteTransaction.bind(this);
        this.onEditTransaction = this.onEditTransaction.bind(this);
    }
    showAddTransaction(){
        this.setState({showAddTransaction:true})
    }
    addTransaction(data){
        console.log("adding transaction" + JSON.stringify(data));
        let local = this;
        fetch('http://localhost:3030/transaction/' + this.props.b._id, { method: 'POST', headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(data)})
        .then(function(res) {
            fetch('http://localhost:3030/transaction/' + local.props.b._id)
              .then(function(res) {
                if(!res.ok){
                  console.log(res.status);
                  console.log(res.statusText);
                  throw new Error(res.statusText);
                }
                  return res.json();
              }).then(function(json) {
                  console.log("here are the transactions" + JSON.stringify(json));
                  local.setState({
                    transactions:json
                  })
                  console.log(JSON.stringify(local.state));
              });
        }).catch(function(err) {
            console.log(err);
        });
        this.setState({showAddTransaction:false});
    }

    cancelTransaction() {
        this.setState({showAddTransaction:false});
    }

    onDelete (){
        console.log("starting delete");
        this.props.deleteBucket(this.props.b._id);
    }

    onDeleteTransaction(id) {
        console.log("deleting Transaction" + id)
        let local = this;
        fetch('http://localhost:3030/transaction/' + this.props.b._id + '/tid/' + id, { method: 'DELETE'})
        .then(function(res) {
            fetch('http://localhost:3030/transaction/' + local.props.b._id)
              .then(function(res) {
                if(!res.ok){
                  console.log(res.status);
                  console.log(res.statusText);
                  throw new Error(res.statusText);
                }
                  return res.json();
              }).then(function(json) {
                  console.log("here are the transactions" + JSON.stringify(json));
                  local.setState({
                    transactions:json
                  })
                  console.log(JSON.stringify(local.state));
              });
        }).catch(function(err) {
            console.log(err);
        });
    }

    onEditTransaction(data, id) {
        console.log(data)
        let local = this;
        fetch('http://localhost:3030/transaction/' + this.props.b._id + '/tid/' + id, { method: 'PUT', headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(data)})
        .then(function(res) {
            fetch('http://localhost:3030/transaction/' + local.props.b._id)
              .then(function(res) {
                if(!res.ok){
                  console.log(res.status);
                  console.log(res.statusText);
                  throw new Error(res.statusText);
                }
                  return res.json();
              }).then(function(json) {
                  console.log("here are the transactions" + JSON.stringify(json));
                  local.setState({
                    transactions:json
                  })
                  console.log(JSON.stringify(local.state));
              });
        }).catch(function(err) {
            console.log(err);
        });
    }

    render(){
        return <div>
                <Paper style={paperStyle} zDepth={5}>
                <AppBar
                showMenuIconButton={false}
                title={<span style={styles.title}>{this.props.b.friendlyName}</span>}
                iconElementRight={<span>
                <FlatButton label="Edit Bucket" />
                <FlatButton label="Delete Bucket" onClick={this.onDelete}/>
                </span>}
                />
                <div >
                {
                  this.state.transactions.map(function(trans){
                        return (
                          <div key={trans._id}>
                            <Transaction t={trans} onDelete={this.onDeleteTransaction} onEdit={this.onEditTransaction} onAddEditTransaction={this.onEditTransaction} />
                          </div>);
                    }, this)
                }
                </div>
                <RaisedButton label="Add Transaction" style={buttonStyle} onClick={this.showAddTransaction}/>
                {this.state.showAddTransaction ?
                    <AddEditTransaction onAddEditTransaction={this.addTransaction} onCancelTransaction={this.cancelTransaction}/>
                    : null
                }
                </Paper>
            </div>
    }
};

export default withStyles(Bucket, s);