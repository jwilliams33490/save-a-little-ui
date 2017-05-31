import React, { PropTypes } from 'react';
// import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import {render, findDOMNode} from 'react-dom';
import DatePicker from 'material-ui/DatePicker';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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

class AddEditTransaction extends React.Component{
  constructor(props) {
    super(props)
    var dt = new Date().toLocaleTimeString()

    if (this.props.t) {
      this.state = {date: this.props.t.date,
      amount: this.props.t.amount,
      transactionType: this.props.t.transactionType,
      vendor: this.props.t.vendor,
      label: this.props.t.label};
    } else {
      this.state = {date: '',
      amount: '',
      transactionType: '',
      vendor: '',
      label: ''};
    }

    this.okClick = this.okClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
  }
  okClick() {
    console.log(this.state.amount)
    this.props.onAddEditTransaction(this.state);
  }
  cancelClick() {
    console.log(this.state.vendor) 
    this.props.onCancelTransaction();
  }
  handleInputChange(event) {
    this.setState({[event.target.name]:event.target.value})
  }

  // for datepickers, this is the signature. Event is always null
  handleDateInputChange(event, dt) {
    this.setState({date: dt})
  }

  render(){
    return <div> 
      <TextField
        value={this.state.amount}
        onChange={this.handleInputChange}
        floatingLabelText="Amount"
        hintText="45.67"
        type="number"
        name="amount"
      /><br />
      <TextField
        value={this.state.vendor}
        onChange={this.handleInputChange}
        floatingLabelText="Vendor"
        hintText="Fox Bros."
        name="vendor"
      /><br />
      <TextField
        value={this.state.label}
        onChange={this.handleInputChange}
        floatingLabelText="Label"
        hintText="Lunch with Joe."
        name="label"
      /><br />
      <TextField
        value={this.state.transactionType}
        onChange={this.handleInputChange}
        floatingLabelText="Transaction Type"
        hintText="Restaurant"
        name="transactionType"
      /><br />
      <DatePicker
        value={this.state.date}
        onChange={this.handleDateInputChange}
        floatingLabelText="Date"
        hintText="Date of transaction"
        name="date"
      /><br />
      <RaisedButton label="OK" style={buttonStyle} onClick={this.okClick} />
      <RaisedButton label="Cancel" style={buttonStyle} onClick={this.cancelClick} />
    </div>
  }
}

export default withStyles(AddEditTransaction, s);