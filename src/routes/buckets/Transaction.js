import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddEditTransaction from './AddEditTransaction';

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
    this.state = { editTransaction: false };
    this.state = { checkDeleteTransaction: false };
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.showEditTransaction = this.showEditTransaction.bind(this);
    this.deleteTransactionConfirmed = this.deleteTransactionConfirmed.bind(this);
    this.deleteTransactionAborted = this.deleteTransactionAborted.bind(this);
    this.editTransaction = this.editTransaction.bind(this);
    this.cancelEditTransaction = this.cancelEditTransaction.bind(this);
  }
  deleteTransaction() {
    this.setState({ checkDeleteTransaction: true });
  }
  showEditTransaction() {
    this.setState({ editTransaction: true });
  }
  editTransaction(data) {
    this.props.onAddEditTransaction(data, this.props.t._id);
    this.setState({ editTransaction: false });
  }
  cancelEditTransaction() {
    this.setState({ editTransaction: false });
  }

  deleteTransactionConfirmed() {
    this.props.onDelete(this.props.t._id);
    this.setState({ checkDeleteTransaction: false });
  }

  deleteTransactionAborted() {
    this.setState({ checkDeleteTransaction: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.deleteTransactionConfirmed}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.deleteTransactionAborted}
      />,
    ];

    return (
      <div>
        <Paper style={paperStyle}>
          <RaisedButton onClick={this.showEditTransaction} label="Edit Transaction" style={buttonStyle} />
          <RaisedButton onClick={this.deleteTransaction} label="Delete Transaction" style={buttonStyle} />
          <Dialog
            title="Delete Transaction"
            actions={actions}
            modal={true}
            open={this.state.checkDeleteTransaction}
          >
            Are you sure?
          </Dialog>
          {this.state.editTransaction ?
            <AddEditTransaction
              onAddEditTransaction={this.editTransaction}
              onCancelTransaction={this.cancelEditTransaction}
              t={this.props.t}
            />
            :
            <div>
              <div>label: {this.props.t.label}</div>
              <div>vendor: {this.props.t.vendor}</div>
              <div>type: {this.props.t.transactionType}</div>
              <div>amount: {this.props.t.amount}</div>
              <div>date: {this.props.t.date}</div>
            </div>
          }
        </Paper>
      </div>);
  }
}

export default withStyles(Transaction, s);
