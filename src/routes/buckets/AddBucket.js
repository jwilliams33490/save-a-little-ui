import React, { PropTypes } from 'react';
// import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import Transaction from './Transaction.js'
import TextField from 'material-ui/TextField';
import {render, findDOMNode} from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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

class AddBucket extends React.Component{
    constructor(props){
        super(props)
        this.state = {name:'', color:'', filter:''};

        this.okClick = this.okClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    okClick() {
        console.log(this.state.name)
        this.props.onAddBucket(this.state);
    }
    cancelClick() {
        console.log(this.state.color) 
        this.props.onCancelBucket();
    }
    handleNameChange(event) {
        console.log("Hi");
        this.setState({name: event.target.value});
    }
    handleColorChange(event) {
        this.setState({color: event.target.value});
    }
    handleFilterChange(event) {
        this.setState({filter: event.target.value});
    }
    render(){
        return <div> 
            <TextField
                value={this.state.name}
                onChange={this.handleNameChange}
                hintText="Groceries"
                label="Bucket Name"
                floatingLabelFixed={true}
            /><br/>
            <TextField
                value={this.state.color}
                onChange={this.handleColorChange}
                hintText="Blue"
                label="Color"
                floatingLabelFixed={true}
            /><br/>
            <TextField
                value={this.state.filter}
                onChange={this.handleFilterChange}
                hintText="Type = Liquor"
                label="Filter"
                floatingLabelFixed={true}
            /><br/>
            <RaisedButton label="Default" style={buttonStyle} onClick={this.okClick} >OK</RaisedButton>
            <RaisedButton label="Default" style={buttonStyle} onClick={this.cancelClick} >Cancel</RaisedButton>
        </div>
    }
}

export default withStyles(AddBucket, s);