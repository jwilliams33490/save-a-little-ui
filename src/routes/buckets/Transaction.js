import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
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
    this.state = { editTransaction: false, checkDeleteTransaction: false};
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
        <Paper style={paperStyle} zDepth={3}>
          <IconButton tooltip="Edit" onClick={this.showEditTransaction} style={buttonStyle} > <EditorModeEdit /> </IconButton>
          <IconButton tooltip="Delete" onClick={this.deleteTransaction} style={buttonStyle} > <ActionDelete /> </IconButton>
          <Dialog
            title="Delete Transaction"
            actions={actions}
            modal={true}
            open={this.state.checkDeleteTransaction}
          >
            Are you sure?
          </Dialog>
          <div style={{margin:'20px'}}>
            {this.state.editTransaction ?
              <AddEditTransaction
                onAddEditTransaction={this.editTransaction}
                onCancelTransaction={this.cancelEditTransaction}
                t={this.props.t}
              />
              :
              <div>
                <div>Label: {this.props.t.label}</div>
                <div>Vendor: {this.props.t.vendor}</div>
                <div>Type: {this.props.t.transactionType}</div>
                <div>Amount: {this.props.t.amount}</div>
                <div>Date: {Moment(this.props.t.date).format('MMM Do, YYYY')}</div>
              </div>
            }
          </div>
        </Paper>
      </div>);
  }
}

Transaction.propTypes = {
  t: PropTypes.shape({
    _id: PropTypes.string,
    label: PropTypes.string,
    vendor: PropTypes.string,
    transactionType: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.date,
  }).isRequired,
  onAddEditTransaction: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(Transaction, s);
