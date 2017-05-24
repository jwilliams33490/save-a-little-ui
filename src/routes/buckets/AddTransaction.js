import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import Transaction from './Transaction.js';
import TextField from 'material-ui/TextField';
import {render, findDOMNode} from 'react-dom';

import s from './Buckets.scss';

const buttonStyle = {
  margin: 12,
};

const styles = {
  root:{
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

class AddTransaction extends React.Component{
    constructor(props) {
        super(props)
        var dt = new Date().toLocaleTimeString()
        this.state = {//date: dt,
        amount: 0.0,
        transactionType: '',
        vendor: '',
        label: ''};

        this.okClick = this.okClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    okClick() {
        console.log(this.state.amount)
        this.props.onAddTransaction(this.state);
    }
    cancelClick() {
        console.log(this.state.vendor) 
        this.props.onCancelTransaction();
    }
    handleInputChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        return <div> 
            <TextField
                value={this.state.amount}
                onChange={this.handleInputChange}
                label="Amount"
                floatingLabelFixed={true}
                name="amount"
            /><br/>
            <TextField
                value={this.state.vendor}
                onChange={this.handleInputChange}
                label="Vendor"
                floatingLabelFixed={true}
                name="vendor"
            /><br/>
            <TextField
                value={this.state.label}
                onChange={this.handleInputChange}
                label="Label"
                floatingLabelFixed={true}
                name="label"
            /><br/>
            <TextField
                value={this.state.transactionType}
                onChange={this.handleInputChange}
                label="Transaction Type"
                floatingLabelFixed={true}
                name="transactionType"
            /><br/>
            {/*<DatePicker
                value={this.state.date}
                onChange={this.handleInputChange}
                label="Date"
                name="date"
            /><br/>*/}
            <Button label="Default" raised={true} style={buttonStyle} onClick={this.okClick} >OK</Button>
            <Button label="Default" raised={true} style={buttonStyle} onClick={this.cancelClick} >Cancel</Button>
        </div>
    }
}

export default withTheme(AddTransaction, s);