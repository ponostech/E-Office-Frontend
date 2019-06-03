import React, {Component} from 'react';
import {Grid, Card, CardHeader, CardContent, CardActions, Divider, Button} from "@material-ui/core";
import {TextField, withStyles} from "@material-ui/core"
import Editor from '../e-office/common/Editor';
import ErrorHandler, {SuccessHandler} from "../common/StatusHandler";
import LoadingView from "../common/LoadingView";

const styles = {};

class GrievanceCreate extends Component {
  state = {
    name: '',
    phone_no: '',
    address: '',
    branch: '',
    subject: '',
    content: '',
    agreed: true,

    nameError: '',

    errorMsg: '',
    successMsg: '',
    loading: false,
  };

  changeField = (name, e) => this.setState({[name]: e.target.value});


  changeContent = (e) => this.setState({content: e.target.getContent()});

  submit = () => {
    this.valid() ? console.log('Submit Successfully') : console.log("false");
  };

  valid = () => {
    const {agreed, name, phone_no, address, subject, errorMsg, content, successMsg, loading} = this.state;
    if (name === '') {
      this.setState({errorMsg: 'Enter all the required field'});
      return false;
    } else {
      return true;
    }
  };

  reset = () => this.setState({
    name: '', phone_no: '', address: '', branch: '', subject: '', content: '',
    errorMsg: '', successMsg: 'Reset Successfully!'
  });

  closeStatus = () => this.setState({errorMsg: '', successMsg: ''});

  render() {
    const {agreed, name, phone_no, address, subject, errorMsg, content, successMsg, loading} = this.state;
    const {nameError} = this.state;
    const title = 'Submit your grievance to Aizawl Municipal Corporation (AMC)';
    const subtitle = 'We will get back to you as soon as possible.';
    console.log("stata", this.state);
    const forms =
        <Grid container spacing={16}>
          <Grid item md={6}>
            <TextField value={name} name={"name"} margin={"dense"} required={true} fullWidth={true}
                       variant={"outlined"} label="Your Name" placeholder={"Your name"}
                       onChange={this.changeField.bind(this, 'name')}
                       error={Boolean(nameError)} helperText={nameError}/>
          </Grid>
          <Grid item md={6}>
            <TextField value={phone_no} name={"phone_no"} margin={"dense"} required={true} fullWidth={true}
                       variant={"outlined"} label="Your Mobile No." placeholder={"Your Mobile No."}
                       onChange={this.changeField.bind(this, 'phone_no')}/>
          </Grid>
          <Grid item md={12}>
            <TextField value={address} name={"address"} margin={"dense"} required={true} fullWidth={true}
                       variant={"outlined"} label="Your Address" placeholder={"Your Address"}
                       onChange={this.changeField.bind(this, 'address')}/>
          </Grid>
          <Grid item md={12}><Divider/></Grid>
          <Grid item md={12}>
            <TextField value={subject} name={"subject"} margin={"dense"} required={true} fullWidth={true}
                       variant={"outlined"} label="Subject" placeholder={"Subject"}
                       onChange={this.changeField.bind(this, 'subject')}/>
          </Grid>
          <Grid item md={12}><br/><Editor onChange={this.changeContent} default={content}/></Grid>
        </Grid>;

    const actions =
        <Grid container justify={'flex-end'}>
          <Button name="submit" disabled={!agreed} onClick={this.submit} variant={"outlined"} color={"primary"}>
            Submit
          </Button>
          <Button name="reset" variant={"outlined"} onClick={this.reset} color={"secondary"}>Reset</Button>
        </Grid>;

    const grievanceFormWrap =
        <Grid item xs={12} sm={12} md={10}>
          <Card>
            <Grid item><CardHeader title={title} subheader={subtitle}/><Divider/></Grid>
            <CardContent>
              {forms}
            </CardContent>
            <CardActions justify={'flex-end'}>
              {actions}
            </CardActions>
          </Card>
        </Grid>;

    return (
        <Grid container justify="flex-start">
          {loading ? <LoadingView/> : grievanceFormWrap}
          {errorMsg && <ErrorHandler messages={errorMsg} onClose={this.closeStatus}/>}
          {successMsg && <SuccessHandler messages={successMsg} onClose={this.closeStatus}/>}
        </Grid>
    );
  }
}

export default withStyles(styles)(GrievanceCreate);