import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Buckets.scss';

const buttonStyle = {
  margin: 12,
};

class AddEditTransaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.t.date,
      amount: this.props.t.amount,
      transactionType: this.props.t.transactionType,
      vendor: this.props.t.vendor,
      label: this.props.t.label,
    };

    this.okClick = this.okClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
  }
  okClick() {
    this.props.onAddEditTransaction(this.state);
  }
  cancelClick() {
    this.props.onCancelTransaction();
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // for datepickers, this is the signature. Event is always null
  handleDateInputChange(event, dt) {
    this.setState({ date: dt });
  }

  render() {
    return (<div>
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
        value={new Date(this.state.date)}
        onChange={this.handleDateInputChange}
        floatingLabelText="Date"
        hintText="Date of transaction"
        name="date"
      /><br />
      <RaisedButton label="OK" style={buttonStyle} onClick={this.okClick} />
      <RaisedButton label="Cancel" style={buttonStyle} onClick={this.cancelClick} />
    </div>);
  }
}

AddEditTransaction.propTypes = ({
  t: PropTypes.shape({
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    transactionType: PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onAddEditTransaction: PropTypes.func.isRequired,
  onCancelTransaction: PropTypes.func.isRequired,
});

AddEditTransaction.defaultProps = function() {
  let d = new Date(Date.now());
  let n = d.toDateString();
  return ({
    t: {
      date: n, amount: 0, transactionType: '', vendor: '', label: '',
    },
  });
}();

export default withStyles(AddEditTransaction, s);
