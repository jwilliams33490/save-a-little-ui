import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Buckets.scss';

const buttonStyle = {
  margin: 12,
};

class AddEditBucket extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.b) {
      this.state = { name: this.props.b.friendlyName,
        color: this.props.b.friendlyColor,
        filter: this.props.b.filter };
    } else {
      this.state = { name: '', color: '', filter: '' };
    }

    this.okClick = this.okClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  okClick() {
    this.props.onAddEditBucket(this.state);
  }
  cancelClick() {
    this.props.onCancelBucket();
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleColorChange(event) {
    this.setState({ color: event.target.value });
  }
  handleFilterChange(event) {
    this.setState({ filter: event.target.value });
  }
  render() {
    return (<div>
      <TextField
        value={this.state.name}
        onChange={this.handleNameChange}
        hintText="Groceries"
        floatingLabelText="Bucket Name"
      /><br />
      <TextField
        value={this.state.color}
        onChange={this.handleColorChange}
        hintText="Blue"
        floatingLabelText="Color"
      /><br />
      <TextField
        value={this.state.filter}
        onChange={this.handleFilterChange}
        hintText="Type = Liquor"
        floatingLabelText="Filter"
      /><br />
      <RaisedButton label="OK" style={buttonStyle} onClick={this.okClick} />
      <RaisedButton label="Cancel" style={buttonStyle} onClick={this.cancelClick} />
    </div>);
  }
}

AddEditBucket.propTypes = {
  onAddEditBucket: PropTypes.func.isRequired,
  onCancelBucket: PropTypes.func.isRequired,
  b: PropTypes.shape({
    friendlyName: PropTypes.string,
    friendlyColor: PropTypes.string,
    filter: PropTypes.string,
  }),
};

AddEditBucket.defaultProps = {
  b: { friendlyName: '', friendlyColor: '', filter: '' },
};

export default withStyles(AddEditBucket, s);
