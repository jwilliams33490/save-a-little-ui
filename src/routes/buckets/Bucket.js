import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AddEditBucket from './AddEditBucket';
import Transaction from './Transaction';
import AddEditTransaction from './AddEditTransaction';

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

class Bucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showEditBucket: false };

    this.state = { showAddTransaction: false, transactions: props.b.transactions };
    this.showAddTransaction = this.showAddTransaction.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
    this.cancelTransaction = this.cancelTransaction.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDeleteTransaction = this.onDeleteTransaction.bind(this);
    this.onEditTransaction = this.onEditTransaction.bind(this);
    this.showEditBucket = this.showEditBucket.bind(this);
    this.onEditBucket = this.onEditBucket.bind(this);
    this.onCancelEditBucket = this.onCancelEditBucket.bind(this);
  }
  showEditBucket() {
    this.setState({ showEditBucket: true });
  }
  onEditBucket(data) {
    this.props.onEditBucket(data, this.props.b._id);
    this.setState({ showEditBucket: false });
  }
  onCancelEditBucket() {
    this.setState({ showEditBucket: false });
  }
  showAddTransaction() {
    this.setState({ showAddTransaction: true });
  }
  addTransaction(data) {
    const local = this;
    fetch(`http://localhost:3030/transaction/${this.props.b._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(() => {
      fetch(`http://localhost:3030/transaction/${local.props.b._id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }
          return res.json();
        }).then((json) => {
          local.setState({
            transactions: json,
          });
        });
    }).catch((err) => {
      console.log(err);
    });
    this.setState({ showAddTransaction: false });
  }

  cancelTransaction() {
    this.setState({ showAddTransaction: false });
  }

  onDelete() {
    this.props.deleteBucket(this.props.b._id);
  }

  onDeleteTransaction(id) {
    const local = this;
    fetch(`http://localhost:3030/transaction/${this.props.b._id}/tid/${id}`, { method: 'DELETE' })
    .then(() => {
      fetch(`http://localhost:3030/transaction/${local.props.b._id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }
          return res.json();
        }).then((json) => {
          local.setState({
            transactions: json,
          });
        });
    }).catch((err) => {
      console.log(err);
    });
  }

  onEditTransaction(data, id) {
    const local = this;
    fetch(`http://localhost:3030/transaction/${this.props.b._id}/tid/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(() => {
      fetch(`http://localhost:3030/transaction/${local.props.b._id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }
          return res.json();
        }).then((json) => {
          local.setState({
            transactions: json,
          });
        });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (<div>
      <Paper style={paperStyle} zDepth={5}>
        <AppBar
          showMenuIconButton={false}
          title={<span style={styles.title}>{this.props.b.friendlyName}</span>}
          iconElementRight={<span>
            <FlatButton label="Edit Bucket" onClick={this.showEditBucket} />
            <FlatButton label="Delete Bucket" onClick={this.onDelete} />
          </span>}
        />
        {this.state.showEditBucket ?
          <AddEditBucket
            onAddEditBucket={this.onEditBucket}
            onCancelBucket={this.onCancelEditBucket}
            b={this.props.b}
          />
          :
          <div>
            <div>
              {
                this.state.transactions.map(trans =>
                  (<div key={trans._id}>
                    <Transaction
                      t={trans}
                      onDelete={this.onDeleteTransaction}
                      onAddEditTransaction={this.onEditTransaction}
                    />
                  </div>)
                  , this)
              }
            </div>
            <RaisedButton label="Add Transaction" style={buttonStyle} onClick={this.showAddTransaction} />
            {this.state.showAddTransaction ?
              <AddEditTransaction
                onAddEditTransaction={this.addTransaction}
                onCancelTransaction={this.cancelTransaction}
              />
              : null
            }
          </div>
        }
      </Paper>
    </div>);
  }
}

export default withStyles(Bucket, s);
