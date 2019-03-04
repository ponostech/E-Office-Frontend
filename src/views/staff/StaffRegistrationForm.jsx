import React, { Component } from "react";
import { Button, Card, CardActions, CardHeader, Divider, TextField } from "@material-ui/core";

import CardBody from "../../components/Card/CardBody.jsx";

import { StaffViewModel } from "../model/StaffViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import { StaffService } from "../../services/StaffService";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";

class StaffRegistrationForm extends Component {

  staffService = new StaffService();

  state = {
    name: "",
    designation: null,
    address: "",
    branch: "",
    dob: "1991/12/12",
    blood: "",

    nameError: "",
    addressError: "",
    dobError: "",
    signature: null,
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
    complete: false,
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
    // const invalid = this.state.name.length===0 || this.state.address.length === 0 || this.state.dob.length === 0 || this.state.signature === null

    // if (!this.state.name) {
    //   return
    // }
    // if (this.state.address) {
    //   return
    // }
    // if (!this.state.dob) {
    //   return ;
    // }
    // if (!this.state.signature) {
    //   return
    // }

    this.setState({ submit: true });
    this.staffService.create(this.state)
      .then(res => {
        this.setState({complete:true })
        console.log(res);
      })
      .then(() => {
        this.setState({ submit: false });
      });
  };

  handleClick = (e) => {
    const name = e.target.name;
    switch (name) {
      case "primary":
          this.onSubmit();
        break;
      case "secondary":
        this.setState({
          name: "",
          address: "",
          dob: '',
          blood: "",
          designation: this.state.designations[0],
          branch: this.state.branches[0],
          signature:null,
        });
        break;
      default:
        break;
    }
  };

  onSignatureSelect = (signature) => {
    this.setState({ signature });
  };
  onSignatureRemove = () => {
    this.setState({ signature: null });
  };
  setImagePreviewUrl = (url) => {

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


  render() {
    const { designation } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <form>
              <Card style={{padding:50}}>
                <CardHeader title={StaffViewModel.TILE} subheader={StaffViewModel.SUBHEADER}/>
                <SubmitDialog open={this.state.submit} text={StaffViewModel.SUBMIT}/>
                <OfficeSnackbar variant={"success"} open={this.state.complete} message={StaffViewModel.CREATE_MESSAGE} />
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
                  {/*{this.getAttachmentView()}*/}

                  <Divider/>
                  <ImageUpload setImagePreviewUrl={this.setImagePreviewUrl.bind(this)}
                               onFileSelect={this.onSignatureSelect.bind(this)}
                               onRemove={this.onSignatureRemove.bind(this)} label={StaffViewModel.SIGNATURE}/>
                  {/*<DocumentsDropzone documents={[*/}
                  {/*{ name: "Staff signature", fileName: "signature" }*/}
                  {/*]}*/}
                  {/*openDialog={this.state.openDialog} onCloseHandler={this.handleDocuments.bind(this)}*/}
                  {/*acceptedFiles={Constraint.ACCEPTED_IMAGES}/>*/}

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