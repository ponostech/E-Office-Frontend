import React, { Component } from "reactn";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  withStyles
} from "@material-ui/core";
import Editor from "../e-office/common/Editor";
import LoadingView from "../common/LoadingView";
import { Validators } from "../../utils/Validators";
import { ArrayToString, ErrorToString } from "../../utils/ErrorUtil";
import axios from "axios";
import SubmitDialog from "../../components/SubmitDialog";

const styles = {};

class GrievanceCreate extends Component {
  state = {
    name: "",
    phone_no: "",
    address: "",
    branch: "",
    subject: "",
    content: "",

    nameError: "",
    phoneError: "",
    addressError: "",
    subjectError: "",
    contentError: "",

    prestine: true
  };

  componentDidMount() {
    this.setGlobal({ loading: false });
  }

  changeField = (name, e) => {
    this.setState({ [name]: e.target.value, prestine: false });
    if (name === "phone_no") {
      const valid = Validators.PHONE_REGEX.test(e.target.value);
      if (valid) {
        this.setState({ phoneError: "" });
      } else {
        this.setState({ phoneError: "Phone No must be 10 digit no" });
      }
    }
  };

  changeContent = e => this.setState({ content: e.target.getContent() });

  submit = () => {
    const { name, phone_no, address, subject, content } = this.state;
    const data = {
      name,
      phone_no,
      address,
      subject,
      content
    };

    this.setState({ submit: true });

    if (this.valid()) {
      axios
        .post("", data)
        .then(res => {
          if (res.data.status) {
            this.setGlobal({ successMsg: ArrayToString(res.data.messages) });
          } else {
            if (res.data.validation_error) {
              this.setGlobal({ errorMsg: ErrorToString(res.data.messages) });
            } else {
              this.setGlobal({ errorMsg: ArrayToString(res.data.messages) });
            }
          }
        })
        .catch(err => this.setGlobal({ errorMsg: err.toString() }))
        .finally(() => this.setState({ submit: false }));
    } else {
      this.setGlobal({ errorMsg: "Please fill all the required field" });
    }
  };

  handleBlur = event => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        value.length === 0
          ? this.setState({ nameError: "Name is required" })
          : this.setState({ nameError: "" });
        break;
      case "phone_no":
        let msg = this.state.phoneError;
        value.length === 0
          ? this.setState({ phoneError: "Phone no is required" })
          : this.setState({ phoneError: msg });
        break;
      case "address":
        value.length === 0
          ? this.setState({ addressError: "Address is required" })
          : this.setState({ addressError: "" });
        break;
      case "subject":
        value.length === 0
          ? this.setState({ subjectError: "Subject is required" })
          : this.setState({ subjectError: "" });
        break;
      case "content":
        break;
      default:
        break;
    }
  };

  valid = () => {
    const { name, phone_no, address, subject, content } = this.state;
    return (
      Boolean(name) &&
      Boolean(phone_no) &&
      phone_no.length === 10 &&
      Boolean(address) &&
      Boolean(subject) &&
      Boolean(content)
    );
  };

  reset = () =>
    this.setState({
      name: "",
      phone_no: "",
      address: "",
      branch: "",
      subject: "",
      content: "",
      nameError: "",
      phoneError: "",
      addressError: "",
      contentError: "",
      subjectError: "",
      prestine: true
    });

  render() {
    const { name, phone_no, address, subject, content } = this.state;
    const { nameError, subjectError, addressError, phoneError } = this.state;
    const title = "Submit your grievance to Aizawl Municipal Corporation (AMC)";
    const subtitle = "We will get back to you as soon as possible.";
    const forms = (
      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            value={name}
            name={"name"}
            margin={"dense"}
            required={true}
            fullWidth={true}
            variant={"outlined"}
            label="Your Name"
            placeholder={"Your name"}
            onChange={this.changeField.bind(this, "name")}
            onBlur={this.handleBlur.bind(this)}
            error={Boolean(nameError)}
            helperText={nameError}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            value={phone_no}
            name={"phone_no"}
            margin={"dense"}
            required={true}
            fullWidth={true}
            variant={"outlined"}
            label="Your Mobile No."
            placeholder={"Your Mobile No."}
            onBlur={this.handleBlur.bind(this)}
            onChange={this.changeField.bind(this, "phone_no")}
            error={Boolean(phoneError)}
            helperText={phoneError}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            value={address}
            name={"address"}
            margin={"dense"}
            required={true}
            fullWidth={true}
            variant={"outlined"}
            label="Your Address"
            placeholder={"Your Address"}
            onBlur={this.handleBlur.bind(this)}
            onChange={this.changeField.bind(this, "address")}
            error={Boolean(addressError)}
            helperText={addressError}
          />
        </Grid>
        <Grid item md={12}>
          <Divider component={"li"} />
        </Grid>
        <Grid item md={12}>
          <TextField
            value={subject}
            name={"subject"}
            margin={"dense"}
            required={true}
            fullWidth={true}
            variant={"outlined"}
            label="Subject"
            placeholder={"Subject"}
            onBlur={this.handleBlur.bind(this)}
            onChange={this.changeField.bind(this, "subject")}
            error={Boolean(subjectError)}
            helperText={subjectError}
          />
        </Grid>
        <Grid item md={12}>
          <br />
          <Editor onChange={this.changeContent} default={content} />
        </Grid>
      </Grid>
    );

    const actions = (
      <>
        <Button
          href={"#"}
          name="submit"
          disabled={!this.valid()}
          onClick={this.submit}
          variant={"outlined"}
          color={"primary"}
        >
          Submit
        </Button>
        <Button
          href={"#"}
          name="reset"
          variant={"outlined"}
          onClick={this.reset}
          color={"secondary"}
        >
          Reset
        </Button>
      </>
    );

    const grievanceFormWrap = (
      <Grid item xs={12} sm={12} md={10}>
        <Card>
          <Grid item>
            <CardHeader title={title} subheader={subtitle} />
            <Divider component={"li"} />
          </Grid>
          <CardContent>{forms}</CardContent>
          <CardActions style={{ alignItems: "flex-end" }}>
            {actions}
          </CardActions>
        </Card>
      </Grid>
    );

    return (
      <Grid container justify="flex-start">
        {this.global.loading ? <LoadingView /> : grievanceFormWrap}

        <SubmitDialog
          open={this.state.submit}
          title={"Submit Grievance"}
          text={"Please wait..."}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(GrievanceCreate);
