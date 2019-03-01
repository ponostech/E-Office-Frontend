import React, {Component} from "react";
import {Button, Card, CardActions, CardHeader, TextField} from "@material-ui/core";

import CardBody from "../../components/Card/CardBody.jsx";

import {StaffViewModel} from "../model/StaffViewModel";
import GridItem from "../../components/Grid/GridItem";
import moment from "moment";
import OfficeSelect from "../../components/OfficeSelect";
import axios from "axios";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import DocumentsDropzone from "../../components/DocumentsDropzone";
import Constraint from "../../config/Constraint";

class StaffRegistrationForm extends Component {
  state = {
    formValues: {
      name: "",
      designation: null,
      address: "",
      branch: null,
      dob: null,
      blood: ""
    },

    nameError: "",
    addressError: "",
    dobError: "",

    designations: [
      {value: "ldc", label: "LDC"},
      {value: "udc", label: "UDC"},
      {value: "Assistant", label: "Assistant"}
    ],
    branches: [
      {value: "one", label: "one"},
      {value: "two", label: "two"},
      {value: "three", label: "three"}
    ],
    submit: false,
    openDialog: false,
    attachments: []
  };

  handleChange = name => ({  target: { value }}) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    });
    //console.log(this.state);
  };

  componentDidMount() {
    document.title = "e-AMC | Staff Registration Form";
  }

  handleSelect = (value, identifier) => {
    switch (identifier.name) {
      case "designation":
        this.setState({designation: value});
        break;
      case "branch":
        this.setState({branch: value});
        break;
      default:
        break;

    }
  };

  validate = () => {
    if (this.state.name === "") {
      this.setState({nameError: StaffViewModel.NAME_REQUIRED});
      return false;
    }
    if (this.state.addressError === "") {
      this.setState({addressError: StaffViewModel.ADDRESS_REQUIRED});
      return false;
    }
    if (this.state.dobError === "") {
      this.setState({dobError: StaffViewModel.DOB_REQUIRED});
      return false;
    }

    let dob = moment(this.state.do);
    let today = moment.now();
    if (dob > today) {
      this.setState({dobError: StaffViewModel.DOB_FUTURE_ERROR});
      return;
    }

    this.setState({
      nameError: "",
      addressError: "",
      dobError: ""
    });

    return true;
  };

  onSubmit = (e) => {
    const data = {
      name: "name",
      address: "test"
    };
    axios.post("https://jsonplaceholder.typicode.com/users", data)
        .then(response => {
          console.log(response);
        });
  };

  handleClick = (e) => {
    this.setState({open: true});
    const name = e.target.name;
    switch (name) {
      case "primary":
        this.onSubmit();
        //TODO: submit data
        break;
      case "secondary":
        //TODO: clear data
        break;
      case "upload":
        this.setState({openDialog: true});
        break;
      default:
        break;
    }
  };

  handleDocuments = (data) => {
    if (data) {
      this.setState({attachments: data.files});
    }
    this.setState({openDialog: false});
  };

  getAttachmentView = () => {
    const docExist = this.state.attachments.length > 0;
    if (docExist) {
      return (<Button
              name={"reset"}
              onClick={(e) => {
                this.setState({attachments: []});
              }
              }
              variant={"outlined"} color={"secondary"}>
            {StaffViewModel.RESELECT_ATTACHMENT}
          </Button>
      );
    } else {
      return (
          <Button
              name={"upload"}
              onClick={this.handleClick.bind(this)}
              variant={"outlined"} color={"primary"}>
            {StaffViewModel.ATTACHMENT_LABEL}
          </Button>
      );
    }
  };

  render() {
    const {designation} = this.props;
    const {branch} = this.props;
    const {classes} = this.props;

    return (
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <form>
                <Card>
                  <CardHeader title={StaffViewModel.TILE} subheader={StaffViewModel.SUBHEADER}/>
                  <CardBody>
                    <TextField name={"name"}
                               required={true}
                               variant={"outlined"}
                               margin={"dense"}
                               fullWidth={true}
                               onChange={this.handleChange('name')}
                               label={StaffViewModel.NAME}
                               error={Boolean(this.state.nameError)}
                               helperText={this.state.nameError}
                    />

                    <OfficeSelect value={designation}
                                  defaultValue={this.state.designations[0]}
                                  name={"designation"}
                                  placeholder={StaffViewModel.DESIGNATION}
                                  onChange={this.handleSelect.bind(this, "designation")}
                                  searchAble={true}
                                  ClearAble={true}
                                  label={StaffViewModel.DESIGNATION}
                                  options={this.state.designations}/>

                    <TextField name={"address"}
                               required={true}
                               multiline={true}
                               rows={3}
                               variant={"outlined"}
                               margin={"dense"}
                               fullWidth={true}
                               error={Boolean(this.state.addressError)}
                               helperText={this.state.addressError}
                               onChange={this.handleChange.bind(this)}
                               label={StaffViewModel.ADDRESS}/>

                    <OfficeSelect value={branch}
                                  label={StaffViewModel.BRANCH}
                                  name={"branch"}
                                  variant={"outlined"}
                                  margin={"dense"}
                                  fullWidth={true}
                                  onChange={this.handleSelect.bind(this, "branch")}
                                  options={this.state.branches}/>

                    <TextField name={"dob"}
                               variant={"outlined"}
                               margin={"dense"}
                               required={true}
                               fullWidth={true}
                               onChange={this.handleChange.bind(this)}
                               type={"date"}
                               InputLabelProps={
                                 {shrink: true}
                               }
                               label={StaffViewModel.DOB}
                               error={Boolean(this.state.dobError)}
                               helperText={this.state.dobError}
                    />

                    <TextField name={"blood"}
                               variant={"outlined"}
                               margin={"dense"}
                               fullWidth={true}
                               onChange={this.handleChange('blood')}
                               label={StaffViewModel.BLOOD}/>
                    {this.getAttachmentView()}

                    <DocumentsDropzone documents={[
                      {name: "Staff signature", fileName: "signature"}
                    ]}
                                       openDialog={this.state.openDialog}
                                       onCloseHandler={this.handleDocuments.bind(this)}
                                       acceptedFiles={Constraint.ACCEPTED_IMAGES}/>
                  </CardBody>
                  <CardActions>
                    <Button name={"primary"} disabled={this.state.submit}
                            color={"primary"} variant={"outlined"}
                            onClick={this.handleClick.bind(this)}>
                      {StaffViewModel.PRIMARY_TEXT}
                    </Button>
                    <Button name={"secondary"}
                            color={"secondary"}
                            variant={"outlined"}
                            onClick={this.handleClick.bind(this)}>
                      {StaffViewModel.SECONDARY_TEXT}
                    </Button>
                  </CardActions>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
    );
  }

}

export default withStyles(loginPageStyle)(StaffRegistrationForm);