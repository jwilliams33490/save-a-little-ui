import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withTheme, createStyleSheet} from 'material-ui/styles';

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
    }
    render(){
        return (<div key={this.props.t._id}>
                <Grid item lg={4} md={4} xs={12}>
                    <Paper style={paperStyle}>
                        <Button label="Default" raised={true} style={buttonStyle} >Edit Transaction</Button>
                        <Button label="Default" raised={true} style={buttonStyle} >Delete Transaction</Button>
                        <div>label: {this.props.t.label}</div>
                        <div>vendor: {this.props.t.vendor}</div>
                        <div>type: {this.props.t.transactionType}</div>
                        <div>amount: {this.props.t.amount}</div>
                        <div>date: {this.props.t.date}</div>
                    </Paper>
                </Grid>
            <div>&nbsp;</div>
            </div>);
    }
};

export default withTheme(Transaction, s);