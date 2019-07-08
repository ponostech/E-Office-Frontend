import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  List,
  Checkbox, FormControlLabel, FormControl, FormLabel
} from "@material-ui/core";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import DetailViewRow from "../../../common/DetailViewRow";
import ApplicationResolver from "./ApplicationResolver";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state={
      subject: "",
      message: "",
      sms:false,
      email:false,

      subjectError: "",
      messageError:""
    }
  }


  onChange=(name,event)=> this.setState({[name]:event.target.value})
  onBlur=(name,event)=>{
    switch (name) {
      case "subject":
        event.target.value === ""?this.setState({subjectError:"Subject is required"}):this.setState({subjectError:""});
        break;
      case "message":
        event.target.value === ""?this.setState({messageError:"Message is required"}):this.setState({messageError:""});
        break;
      default:
        break;
    }
  }
  handleMessage=()=>{
    const { application } = this.props;
    const { subject, message, sms, email } = this.props;
    let applicant_email=application.email?application.email:application.advertiser.email;
    let applicant_phone=application.phone_no?application.phone_no:application.advertiser.phone_no;
    let to=sms?applicant_phone:applicant_email;

    let msg={
      subject,message,sms,email,to
    }
    this.props.onMessageSend(msg);
  }
  render() {
    const { subject, subjectError, message, messageError,onBack,onMessageSend } = this.props;
    const details=ApplicationResolver(this.props.application);
    return (
      <Card>
        <CardHeader title={"Send Message"}/>
        <Divider component={"div"}/>
        <CardContent>
          <GridContainer>
            <GridItem xs={12} md={6} sm={12}>
              <TextField margin={"dense"}
                         value={subject}
                         variant={"outlined"}
                         label={"Subject"}
                         required={true}
                         fullWidth={true}
                         error={Boolean(subjectError)}
                         helperText={subjectError}
                         onChange={event => this.onChange("subject",event)}
                         onBlur={event=>this.onBlur("subject",event)}
              />
              <TextField margin={"dense"}
                         value={message}
                         multiline={true}
                         rows={5}
                         variant={"outlined"}
                         label={"Message"}
                         required={true}
                         fullWidth={true}
                         error={Boolean(messageError)}
                         helperText={messageError}
                         onChange={event => this.onChange("message",event)}
                         onBlur={event=>this.onBlur("message",event)}
              />
              <FormControl component={"div"} fullWidth={true} margin={"dense"}>
                <FormLabel component={"label"}>Message Type</FormLabel>
                <FormControlLabel control={
                <Checkbox color={"primary"}
                          onChange={(val, checked) => this.setState({ sms: checked })}/>
              } label={"SMS"}/>
                <FormControlLabel control={
                  <Checkbox color={"primary"}
                            onChange={(val, checked) => this.setState({ email: checked })}/>
                } label={"Email"}/>
              </FormControl>
            </GridItem>

            <GridItem xs={12} md={6} sm={12}>
              <Typography variant={"h6"}>Receiver</Typography>
              <Divider/>
              <List>
                {details.map(value => <DetailViewRow primary={value.name} secondary={value.value}/> )}
              </List>
            </GridItem>
          </GridContainer>

        </CardContent>
        <CardActions>
          <ButtonGroup>
            <Button href={"#"} variant={"contained"} color={"primary"} onClick={onBack}>Back</Button>
            <Button  href={"#"} color={"primary"} variant={"contained"} onClick={this.handleMessage.bind(this)}>Next</Button>

          </ButtonGroup>
        </CardActions>
      </Card>
    );
  }
}
SendMessage.propTypes = {
  application: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onMessageSend: PropTypes.func.isRequired
};
export default SendMessage;
