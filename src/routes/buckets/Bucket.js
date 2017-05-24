import React, { PropTypes } from 'react';
// import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import Transaction from './Transaction.js';
import AddTransaction from './AddTransaction.js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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
        this.state={showAddTransaction:false}
    }
    showAddTransaction(){
        this.setState({showAddTransaction:true})
    }
    render(){
        return <div >
                <Paper style={paperStyle} zDepth={5}>
                <h1>{this.props.b.friendlyName}</h1>
                <RaisedButton label="Default" style={buttonStyle} >Edit Bucket</RaisedButton>
                <RaisedButton label="Default" style={buttonStyle} >Delete Bucket</RaisedButton>
                <div >
                {
                    this.props.b.transactions.map(function(trans){
                        return <div key={trans._id}><Transaction t={trans}/></div>;
                    })
                }
                </div>
                <RaisedButton style={buttonStyle} onClick={this.showAddTransaction} >Add Transaction</RaisedButton>
                {this.showAddTransaction ? 
                    <AddTransaction/>
                    : null
                }
                </Paper>
            </div>
    }
};

export default withStyles(Bucket, s);