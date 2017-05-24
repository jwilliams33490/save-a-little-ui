import React, { PropTypes } from 'react';
// import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Buckets.scss';

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

class Transaction extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
                <div>
                    <Paper style={paperStyle}>
                        <RaisedButton label="Edit Transaction" style={buttonStyle} />
                        <RaisedButton label="Delete Transaction" style={buttonStyle} />
                        <div>label: {this.props.t.label}</div>
                        <div>vendor: {this.props.t.vendor}</div>
                        <div>type: {this.props.t.transactionType}</div>
                        <div>amount: {this.props.t.amount}</div>
                        <div>date: {this.props.t.date}</div>
                    </Paper>
                </div>);
    }
};

export default withStyles(Transaction, s);