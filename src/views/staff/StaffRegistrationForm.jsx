import React, { Component } from "react";
import { Button, Card, CardActions, CardHeader, Chip, TextField } from "@material-ui/core";

import CardBody from "../../components/Card/CardBody.jsx";

import { StaffViewModel } from "../model/StaffViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import axios from "axios";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import DocumentsDropzone from "../../components/DocumentsDropzone";
import Constraint from "../../config/Constraint";
import { ApiRoutes } from "../../config/ApiRoutes";

class StaffRegistrationForm extends Component {
  state = {
    name: "",
    designation: null,
    address: "",
    branch: "",
    dob: "12,12,1990",
    blood: "",

    nameError: "",
    addressError: "",
    dobError: "",
    designations: [
      { value: "ldc", label: "LDC" },
      { value: "udc", label: "UDC" },
      { value: "Assistant", label: "Assistant" }
    ],
    branches: [
      { value: "one", label: "one" },
      { value: "two", label: "two" },
      { value: "three", label: "three" }
    ],
    submit: false,
    openDialog: false,
    attachments: []
  };

  componentDidMount() {
    document.title = "e-AMC | Staff Registration Form";
    this.state.designation = this.state.designations[0];
    this.state.branch = this.state.branches[0];
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "designation":
        this.setState({ designation: value });
        break;
      case "branch":
        this.setState({ branch: value });
        break;
      default:
        break;

    }
  };

  onSubmit = (e) => {
    const data = {
      name: "name",
      address: "test"
    };
    this.setState({ submit: true });
    axios.post(ApiRoutes.CREATE_STAFF, data)
      .then(res => {
        setTimeout(e => {
        }, 5000);

      })
      .catch(err => {
        console.error("Staff registration error", err);
      })
      .then(() => this.setState({ submit: false }));
  };

  handleClick = (e) => {
    this.setState({ open: true });
    const valid = (this.state.nameError.length !== 0 && this.state.addressError.length !== 0);

    console.log(valid);
    const name = e.target.name;
    switch (name) {
      case "primary":
        if (valid) {
          this.onSubmit();
        }
        break;
      case "secondary":
        this.setState({
          name: "",
          address: "",
          dob: "",
          blood: "",
          designation:this.state.designations[0],
          branch:this.state.branches[0],
          attachments:[]
        });
        break;
      case "upload":
        this.setState({ openDialog: true });
        break;
      default:
        break;
    }
  };

  handleDocuments = (data) => {
    if (data) {
      this.setState({ attachments: data.files });
    }
    this.setState({ openDialog: false });
  };
  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: StaffViewModel.NAME_REQUIRED }) : this.setState({ nameError: "" });
        break;
      case "address":
        value.length === 0 ? this.setState({ addressError: StaffViewModel.ADDRESS_REQUIRED }) : this.setState({ addressError: "" });
        break;
        case "dob":
        value.length === 0 ? this.setState({ dobError: StaffViewModel.DOB_REQUIRED }) : this.setState({ dobError: "" });
        break;
      default:
        break;
    }
  };

  getAttachmentView = () => {
    const docExist = this.state.attachments.length > 0;
    if (docExist) {
      return (
        <div>
          <div>
            {this.state.attachments.map(value => {
              return (
                <Chip style={{ margin: 10 }} key={value.name} color={"primary"} variant={"outlined"}
                      label={value.name}/>
              );
            })}
          </div>
          <div>
            <Button
              name={"reset"}
              onClick={(e) => {
                this.setState({ attachments: [] });
              }
              }
              variant={"outlined"} color={"secondary"}>
              {StaffViewModel.RESELECT_ATTACHMENT}
            </Button>
          </div>
        </div>
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
    const { designation } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <form>
              <Card>
                <CardHeader title={StaffViewModel.TILE} subheader={StaffViewModel.SUBHEADER}/>
                <CardBody>
                  <TextField
                    value={this.state.name}
                    ref={"nameRef"}
                    name={"name"}
                    onBlur={this.handleBlur.bind(this)}
                    required={true}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
                    onChange={this.handleChange.bind(this)}
                    label={StaffViewModel.NAME}
                    error={Boolean(this.state.nameError)}
                    helperText={this.state.nameError}
                  />

                  <OfficeSelect
                    value={designation}
                    defaultValue={this.state.designations[0]}
                    name={"designation"}
                    placeholder={StaffViewModel.DESIGNATION}
                    onChange={this.handleSelect.bind(this, "designation")}
                    searchAble={true}
                    ClearAble={true}
                    label={StaffViewModel.DESIGNATION}
                    options={this.state.designations}/>

                  <TextField
                    value={this.state.address}
                    name={"address"}
                    onBlur={this.handleBlur.bind(this)}
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

                  <OfficeSelect value={this.state.branch}
                                label={StaffViewModel.BRANCH}
                                name={"branch"}
                                variant={"outlined"}
                                margin={"dense"}
                                fullWidth={true}
                                onChange={this.handleSelect.bind(this, "branch")}
                                options={this.state.branches}/>

                  <TextField name={"dob"}
                             value={this.state.dob}
                             variant={"outlined"}
                             margin={"dense"}
                             required={true}
                             fullWidth={true}
                             onChange={this.handleChange.bind(this)}
                             type={"date"}
                             InputLabelProps={
                               { shrink: true }
                             }
                             label={StaffViewModel.DOB}
                             error={Boolean(this.state.dobError)}
                             helperText={this.state.dobError}
                  />

                  <TextField
                    value={this.state.blood}
                    ref={"bloodRef"}
                    name={"blood"}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
                    onChange={this.handleChange.bind(this)}
                    label={StaffViewModel.BLOOD}/>
                  {this.getAttachmentView()}

                  <DocumentsDropzone documents={[
                    { name: "Staff signature", fileName: "signature" }
                  ]}
                                     openDialog={this.state.openDialog} onCloseHandler={this.handleDocuments.bind(this)}
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