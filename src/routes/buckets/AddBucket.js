import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import Transaction from './Transaction.js'

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
        super()
    }
    render(){
        return <div>Create Add Bucket Here 
        <Button label="Default" raised={true} style={buttonStyle} >OK</Button>
        <Button label="Default" raised={true} style={buttonStyle} >Cancel</Button>
        </div>
    }
}

export default withTheme(AddBucket, s);