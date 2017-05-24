import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import Transaction from './Transaction.js';
import AddTransaction from './AddTransaction.js';


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

    render(){
        return <div>
            <Grid item lg={6} md={6} xs={12} key={this.props.b._id} title={this.props.b.friendlyName}>
                <Paper style={paperStyle} zDepth={5}>
                <h1>{this.props.b.friendlyName}</h1>
                <Button label="Default" raised={true} style={buttonStyle} >Edit Bucket</Button>
                <Button label="Default" raised={true} style={buttonStyle} onClick={this.onDelete}>Delete Bucket</Button>
                <Grid container styles={styles.root}>
            {
                this.state.transactions.map(function(trans){
                    return <Transaction t={trans}/>;
                })
            }
                </Grid>
                <Button label="Default" raised={true} style={buttonStyle} onClick={this.showAddTransaction} >Add Transaction</Button>
                {this.state.showAddTransaction ? 
                    <AddTransaction onAddTransaction= {this.addTransaction} onCancelTransaction= {this.cancelTransaction}/>
                    : null
                }
                </Paper>
            </Grid>
        </div>
    }
};

export default withTheme(Bucket, s);