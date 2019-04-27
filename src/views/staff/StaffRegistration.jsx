import React, { Component } from "react";
import { Button, Divider, InputAdornment, TextField, Typography } from "@material-ui/core";

import { StaffViewModel } from "../model/StaffViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import { StaffService } from "../../services/StaffService";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import FileUpload from "../../components/FileUpload";
import AddressField from "../../components/AddressField";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";

const style = {
  item: {
    padding: "10px 15px !important"
  }
};

class StaffRegistration extends Component {
  staffService = new StaffService();

  state = {
    name: "",
    designation: null,
    address: "",
    branch: "",
    dob: new Date("12/12/1995"),
    blood: "",
    signature: null,

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
    complete: false,

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

    this.setState({ submit: true });
    this.staffService.create(this.state)
      .then(res => {
        this.setState({ complete: true });
        console.log(res);
      })
      .then(() => {
        this.setState({ submit: false });
      });
  };

  handleClear=()=>{}

  handleSave = (e) => {
    const name = e.target.name;
    this.setState({ submit: true });
    this.staffService.create(this.state)
      .then(res => {
        console.log(res)
      })
      .then(() => {
        this.setState({ submit: false });
      });
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
      <GridContainer justify="flex-start">
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Typography variant={"h5"}>Staff registration</Typography>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Divider/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <TextField
                name={"name"}
                value={this.state.name}
                ref={"nameRef"}
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
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <OfficeSelect
                variant={"outlined"}
                margin={"dense"}
                value={this.state.designation}
                fullWidth={true}
                name={"designation"}
                onChange={this.handleSelect.bind(this, "designation")}
                ClearAble={true}
                label={StaffViewModel.DESIGNATION}
                options={this.state.designations}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <AddressField
                textFieldProps={{
                  placeholder: "Address",
                  value: this.state.address,
                  onChange: this.handleChange.bind(this),
                  onBlur: this.handleBlur.bind(this),
                  error: Boolean(this.state.addressError),
                  helperText: this.state.addressError,
                  margin: "dense",
                  variant: "outlined",
                  fullWidth: true,
                  name: "address",
                  required: true,
                  label: "Address"
                }}
                onPlaceSelect={(place) => {
                  if (place) {
                    let name = place.name;
                    let address = place.formatted_address;
                    let complete_address = address.includes(name) ? address : `${name} ${address}`;
                    this.setState({ address: complete_address });
                  }
                }}/>
            </GridItem>

            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <OfficeSelect value={this.state.branch}
                            label={StaffViewModel.BRANCH}
                            name={"branch"}
                            variant={"outlined"}
                            margin={"dense"}
                            fullWidth={true}
                            onChange={this.handleSelect.bind(this, "branch")}
                            options={this.state.branches}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  required={true}
                  fullWidth={true}
                  error={!!this.state.dobError}
                  helperText={this.state.dobError}
                  margin="dense"
                  name={"dob"}
                  variant="outlined"
                  label="Date of birth"
                  value={this.state.dob}
                  onChange={(val)=>this.setState({dob:val})}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <TextField
                value={this.state.blood}
                ref={"bloodRef"}
                name={"blood"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={StaffViewModel.BLOOD}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <FileUpload document={{ id: 0, name: "Signature", mime: "image/*", mandatory: 1 }}
                          onUploadSuccess={(data) => {
                            let temp = {
                              document_id: 0,
                              name: "signature",
                              path: data.location
                            };
                            this.setState({ signature: temp });
                          }} onUploadFailure={(data) => {
              }}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <GridContainer alignItems={"flex-end"}>
                <div>
                  <Button name={"primary"} disabled={this.state.submit}
                          color={"primary"} variant={"outlined"}
                          onClick={this.handleSave.bind(this)}>
                    {StaffViewModel.PRIMARY_TEXT}
                  </Button>
                  {"\u00A0 "}
                  {"\u00A0 "}
                  {"\u00A0 "}
                  <Button name={"secondary"}
                          color={"secondary"}
                          variant={"outlined"}
                          onClick={this.handleClear.bind(this)}>
                    {StaffViewModel.SECONDARY_TEXT}
                  </Button>
                </div>
              </GridContainer>
            </GridItem>

            {/*{this.getAttachmentView()}*/}

            {/*<DocumentsDropzone documents={[*/}
            {/*{ name: "Staff signature", fileName: "signature" }*/}
            {/*]}*/}
            {/*openDialog={this.state.openDialog} onCloseHandler={this.handleDocuments.bind(this)}*/}
            {/*acceptedFiles={Constraint.ACCEPTED_IMAGES}/>*/}

          </GridContainer>
        </GridItem>
        <SubmitDialog open={this.state.submit} text={StaffViewModel.SUBMIT}/>
        <OfficeSnackbar variant={"success"} open={this.state.complete} message={StaffViewModel.CREATE_MESSAGE}/>
      </GridContainer>
    );
  }
}

export default withStyles(style)(StaffRegistration);