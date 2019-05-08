import React, { Component } from "react";
import {
  Button, Card, CardActions, CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip
} from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from "prop-types";
import AddressField from "../../../components/AddressField";
import OfficeSelect from "../../../components/OfficeSelect";
import { StaffViewModel } from "../../model/StaffViewModel";
import { Validators } from "../../../utils/Validators";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
const style = {
  item: {
    padding: "10px 15px !important"
  }
};
class StaffEditDialog extends Component {

  state = {
    name: "",
    email: "",
    phone: "",
    designation: "",
    address: "",
    dob:null,
    branch: undefined,
    role: undefined,
    bloodGroup: "",

    nameError: "",
    emailError: "",
    phoneError: "",
    designationError: "",
    addressError: "",
    dobError:"",
    branchError: "",
    roleError:"",

    branches: [],
    roles:[]
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { staff,roles,branches } = nextProps;
    let branch=undefined;
    let role=undefined;


    if (staff) {
      roles.forEach(function(r) {
        if (r.id===staff.role_id){
          role=r;
        }
      });

      branches.forEach(function(b) {
        if (b.id === staff.branch_id)
          branch=b;
      });

      this.setState({
        name: staff.staff.name,
        email: staff.email,
        phone: staff.phone_no,
        designation: staff.staff.designation,
        address: staff.staff.address,
        branch,
        role,
        bloodGroup: "",
      });
    }
  }
  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "designation":
        this.setState({ designation: value });
        break;
      case "branch":
        this.setState({ branch: value });
        break;
      case "role":
        this.setState({ role: value });
        break;
      default:
        break;
    }
  };
  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "branch":
        this.state.branch === undefined ? this.setState({ branchError: "Branch is required" }) : this.setState({ branchError: "" });
        break;
      case "role":
        this.state.role === undefined ? this.setState({ roleError: "Staff role is required" }) : this.setState({ roleError: "" });
        break;
      default:
        break;
    }
  };
  close = () => {
    this.props.onClose(null);
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "email":
        !Validators.EMAIL_REGEX.test(value) ? this.setState({ emailError: StaffViewModel.EMAIL_ERROR }) : this.setState({ emailError: "" });
        break;
      case "phone":
        !Validators.PHONE_REGEX.test(value) ? this.setState({ phoneError: StaffViewModel.PHONE_ERROR }) : this.setState({ phoneError: "" });
        break;
    }
    this.setState({ prestine: false });
  };
  handleEdit = (e) => {
    const { id,name, rate, fla, nameError, rateError } = this.state;
    const { onClose } = this.props;
    if (!name || !rate) {
      this.setState({errorMessage:"Please fill the required field"});
    }else{
      onClose({id,name,rate,fla});
    }

  };
  handleRequired = (e) => {
    switch (e.target.name) {
      case "name":
        this.state.name ? this.setState({ nameError: "" }) : this.setState({ nameError: "Name is required" });
        break;
      case "rate":
        this.state.rate ? this.setState({ rateError: "" }) : this.setState({ rateError: "Rate is required" });
        break;
    }

  };


  render() {
    const { open, onClose,classes,branches,roles,...rest } = this.props;
    return (
      <Dialog {...rest} fullWidth={true} maxWidth={"sm"} open={open} onClose={this.close.bind(this)}>
        <DialogContent>
          <Card>
            <CardHeader title={"Edit Staff"} action={
              <>
                <Tooltip title={"Close"}>
                  <IconButton onClick={this.close.bind(this)}> <CloseIcon/> </IconButton>
                </Tooltip>
              </>
            }/>
            <CardContent>
              <GridContainer justify={"center"}>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <TextField variant={"outlined"}
                             name={"name"}
                             value={this.state.name}
                             required={true}
                             fullWidth={true}
                             onBlur={this.handleRequired.bind(this)}
                             onChange={this.handleChange.bind(this)}
                             error={Boolean(this.state.nameError)}
                             helperText={this.state.nameError}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <TextField variant={"outlined"}
                             name={"email"}
                             required={true}
                             type={"email"}
                             value={this.state.email}
                             fullWidth={true}
                             onBlur={this.handleRequired.bind(this)}
                             onChange={this.handleChange.bind(this)}
                             error={Boolean(this.state.emailError)}
                             helperText={this.state.emailError}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <TextField variant={"outlined"}
                             name={"phone"}
                             required={true}
                             value={this.state.phone}
                             fullWidth={true}
                             onBlur={this.handleRequired.bind(this)}
                             onChange={this.handleChange.bind(this)}
                             error={Boolean(this.state.phoneError)}
                             helperText={this.state.phoneError}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <TextField variant={"outlined"}
                             name={"designation"}
                             required={true}
                             value={this.state.designation}
                             fullWidth={true}
                             onBlur={this.handleRequired.bind(this)}
                             onChange={this.handleChange.bind(this)}
                             error={Boolean(this.state.designationError)}
                             helperText={this.state.designationError}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <AddressField
                    textFieldProps={{
                      placeholder: "Address",
                      value: this.state.address,
                      onChange: this.handleChange.bind(this),
                      onBlur: this.handleRequired.bind(this),
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
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
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
                      onChange={(val) => this.setState({ dob: val })}
                      format={"dd/MM/yyyy"}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <OfficeSelect value={this.state.branch}
                                label={"Branch"}
                                name={"branch"}
                                required={true}
                                variant={"outlined"}
                                margin={"dense"}
                                fullWidth={true}
                                helperText={this.state.branchError}
                                error={Boolean(this.state.branchError)}
                                onBlur={this.handleSelectBlur.bind(this, "branch")}
                                onChange={this.handleSelect.bind(this, "branch")}
                                options={this.state.branches}/>
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <OfficeSelect value={this.state.role}
                                label={"Staff Role"}
                                name={"role"}
                                required={true}
                                variant={"outlined"}
                                margin={"dense"}
                                fullWidth={true}
                                helperText={this.state.roleError}
                                error={Boolean(this.state.roleError)}
                                onBlur={this.handleSelectBlur.bind(this, "role")}
                                onChange={this.handleSelect.bind(this, "role")}
                                options={this.state.roles}/>
                </GridItem>
              </GridContainer>
            </CardContent>
            <CardActions style={{justifyContent:"flex-end"}}>
              <Button variant={"outlined"} color={"primary"} onClick={this.handleEdit.bind(this)}>Update</Button>
              <Button variant={"outlined"} color={"secondary"} onClick={this.close.bind(this)}>Close</Button>
            </CardActions>
          </Card>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    );
  }
}
StaffEditDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired,
  branches:PropTypes.array.isRequired,
  roles:PropTypes.array.isRequired,
  staff:PropTypes.object.isRequired
}

export default withStyles(style)(StaffEditDialog);