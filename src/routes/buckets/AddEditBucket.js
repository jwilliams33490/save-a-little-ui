import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { TwitterPicker } from 'react-color';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
        filter: this.props.b.filter, 
        showColorPicker:false };
    } else {
      this.state = { name: '', color: '', filter: '', showColorPicker:false };
    }

    this.okClick = this.okClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleColorChangeComplete = this.handleColorChangeComplete.bind(this);
    this.onColorClicked = this.onColorClicked.bind(this);
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

  handleColorChangeComplete (color, event) {
    this.setState({ color: color.hex });
    this.setState({showColorPicker:false});
  }

  onColorClicked(event) {
    console.log("clicked")
    this.setState({showColorPicker:true});
  }

  render() {
    let divStyle= {background: this.state.color};
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
        onClick={this.onColorClicked}
        inputStyle={divStyle}
      /><br />
      { this.state.showColorPicker ?
      <TwitterPicker  onChangeComplete={ this.handleColorChangeComplete } color={ this.state.color } />
      : null }
      <TextField
        value={this.state.filter}
        onChange={this.handleFilterChange}
        hintText="Type = Liquor"
        floatingLabelText="Filter"
      /><br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FloatingActionButton style={buttonStyle} onClick={this.okClick} > <ActionDone /> </FloatingActionButton>
        <FloatingActionButton style={buttonStyle} onClick={this.cancelClick} > <ContentClear /> </FloatingActionButton>
      </div>
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
