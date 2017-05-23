import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withTheme, createStyleSheet} from 'material-ui/styles';
import Transaction from './Transaction.js';
import AddTransaction from './AddTransaction.js';

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

class Bucket extends React.Component{
    constructor(props){
        super(props)
        this.state={showAddTransaction:false}
    }
    showAddTransaction(){
        this.setState({showAddTransaction:true})
    }
    render(){
        return <div>
            <Grid item lg={6} md={6} xs={12} key={this.props.b._id} title={this.props.b.friendlyName}>
                <Paper style={paperStyle} zDepth={5}>
                <h1>{this.props.b.friendlyName}</h1>
                <Button label="Default" raised={true} style={buttonStyle} >Edit Bucket</Button>
                <Button label="Default" raised={true} style={buttonStyle} >Delete Bucket</Button>
                <Grid container styles={styles.root}>
            {
                this.props.b.transactions.map(function(trans){
                    return <Transaction t={trans}/>;
                })
            }
                </Grid>
                <Button label="Default" raised={true} style={buttonStyle} onClick={this.showAddTransaction} >Add Transaction</Button>
                {this.showAddTransaction ? 
                    <AddTransaction/>
                    : null
                }
                </Paper>
            </Grid>
        </div>
    }
};

export default withTheme(Bucket, s);