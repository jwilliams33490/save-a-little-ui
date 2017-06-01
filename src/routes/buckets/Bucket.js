import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import AddEditBucket from './AddEditBucket';
import Transaction from './Transaction';
import AddEditTransaction from './AddEditTransaction';

import s from './Buckets.scss';

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
    this.state = {
      showAddTransaction: false,
      transactions: props.b.transactions,
      checkDeleteBucket: false,
      showEditBucket: false,
    };
    this.showAddTransaction = this.showAddTransaction.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
    this.cancelTransaction = this.cancelTransaction.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDeleteTransaction = this.onDeleteTransaction.bind(this);
    this.onEditTransaction = this.onEditTransaction.bind(this);
    this.showEditBucket = this.showEditBucket.bind(this);
    this.onEditBucket = this.onEditBucket.bind(this);
    this.onCancelEditBucket = this.onCancelEditBucket.bind(this);
    this.deleteBucketAborted = this.deleteBucketAborted.bind(this);
    this.deleteBucketConfirmed = this.deleteBucketConfirmed.bind(this);
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
    this.setState({ checkDeleteBucket: true });
  }

  deleteBucketConfirmed() {
    this.props.deleteBucket(this.props.b._id);
    this.setState({ checkDeleteBucket: false });
  }

  deleteBucketAborted() {
    this.setState({ checkDeleteBucket: false });
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
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.deleteBucketConfirmed}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.deleteBucketAborted}
      />,
    ];
    let divStyle= {background: this.props.b.friendlyColor};
    return (<div>
      <Paper style={paperStyle} zDepth={3}>
        <AppBar
          showMenuIconButton={false}
          style={divStyle}
          title={<span>{this.props.b.friendlyName}</span>}
          iconElementRight={<span>
            <IconButton tooltip="Edit" onClick={this.showEditBucket} ><EditorModeEdit /></IconButton>
            <IconButton tooltip="Delete" onClick={this.onDelete} ><ActionDelete /></IconButton>
          </span>}
        />
        <Dialog
          title="Delete Bucket"
          actions={actions}
          modal={true}
          open={this.state.checkDeleteBucket}
        >
        Are you sure?
        </Dialog>
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
            <div style={{margin:'20'}}>
              {this.state.showAddTransaction ?
                <AddEditTransaction
                  onAddEditTransaction={this.addTransaction}
                  onCancelTransaction={this.cancelTransaction}
                />
                : null
              }
              <div  style={{display: 'flex', justifyContent: 'flex-end'}}>
                <FloatingActionButton
                  mini={true}
                  secondary={true}
                  onClick={this.showAddTransaction}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>
          </div>
        }
      </Paper>
    </div>);
  }
}

Bucket.propTypes = {
  b: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    transactions: PropTypes.array.isRequired,
  }).isRequired,
  onEditBucket: PropTypes.func.isRequired,
  deleteBucket: PropTypes.func.isRequired,
};

export default withStyles(Bucket, s);
