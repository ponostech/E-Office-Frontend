import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
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
import CalendarIcon from "@material-ui/icons/CalendarToday";

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
    dob: null,
    branch: undefined,
    role: undefined,
    bloodGroup: "",

    nameError: "",
    emailError: "",
    phoneError: "",
    designationError: "",
    addressError: "",
    dobError: "",
    branchError: "",
    roleError: "",

    branches: [],
    roles: [],
    prestine:true
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { staff, roles, branches } = nextProps;
    let branch = undefined;
    let role = undefined;


    if (staff) {
      roles.forEach(function(r) {
        if (r.label === staff.roles[0].name || r.value===staff.roles[0].name) {
          role = r;
        }
      });

      branches.forEach(function(b) {
        if (b.label === staff.staff.branch || b.value===staff.staff.branch)
          branch = b;
      });

      this.setState({
        name: staff.staff.name,
        email: staff.email,
        phone: staff.phone_no,
        designation: staff.staff.designation,
        address: staff.staff.address,
        branch,
        role,
        bloodGroup: staff.blood_group,

        branches,
        roles: roles
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
    this.setState({prestine:false})
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
    const { id, name,phone,email,designation,branch,role,dob } = this.state;
    const { onClose } = this.props;

    const invalid = Boolean(this.state.nameError) || Boolean(this.state.emailError) || Boolean(this.state.phoneError)
      || Boolean(this.state.addressError) || Boolean(this.state.designationError) || Boolean(this.state.branchError)
      || Boolean(this.state.roleError) || Boolean(this.state.prestine);

    let newStaff={id,name,phone_no:phone,email,designation,branch:branch.value,role:role.value, dob} ;
    if (invalid)
      this.setState({ errorMessage: "Please fill the required field" });
    else
      onClose(newStaff)

  };
  handleRequired = (e) => {
    switch (e.target.name) {
      case "designation":
        this.state.designation ? this.setState({ designationError: "" }) : this.setState({ designationError: "Designation is required" });
        break;
      case "name":
        this.state.name ? this.setState({ nameError: "" }) : this.setState({ nameError: "Name is required" });
        break;
      case "email":
        this.state.name ? this.setState({ emailError: "" }) : this.setState({ emailError: "Email is required" });
        break;
      case "phone":
        this.state.name ? this.setState({ phoneError: "" }) : this.setState({ phoneError: "Phone Number is required" });
        break;
      case "address":
        this.state.address ? this.setState({ addressError: "" }) : this.setState({ addressError: "Address is required" });
        break;
    }

  };


  render() {
    const { open, onClose, classes, branches, roles, ...rest } = this.props;
    return (
      <Dialog {...rest} fullWidth={true} maxWidth={"sm"} open={open} onClose={this.close.bind(this)}>
        <CardHeader title={"Edit Staff"} action={
          <>
            <Tooltip title={"Close"}>
              <IconButton onClick={this.close.bind(this)}> <CloseIcon/> </IconButton>
            </Tooltip>
          </>
        }/>
        <Divider/>
        <DialogContent>

          <GridContainer justify={"center"}>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <TextField variant={"outlined"}
                         name={"name"}
                         margin={"dense"}
                         label={"Name"}
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
                         label={"Email"}
                         required={true}
                         margin={"dense"}
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
                         label={"Phone"}
                         required={true}
                         margin={"dense"}
                         value={this.state.phone}
                         fullWidth={true}
                         onBlur={this.handleRequired.bind(this)}
                         onChange={this.handleChange.bind(this)}
                         error={Boolean(this.state.phoneError)}
                         helperText={this.state.phoneError}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
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
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
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
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <TextField variant={"outlined"}
                         name={"designation"}
                         label={"Designation"}
                         required={true}
                         margin={"dense"}
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
                  value: this.state.address,
                  onChange: this.handleChange.bind(this),
                  onBlur: this.handleRequired.bind(this),
                  error: Boolean(this.state.addressError),
                  helperText: this.state.addressError,
                  margin: "dense",
                  variant: "outlined",
                  fullWidth: true,
                  name: "address",
                  label: "Address",
                  required: true
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={"end"}>
                        <CalendarIcon color={"action"}/>
                      </InputAdornment>
                    )
                  }}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <TextField variant={"outlined"}
                         name={"bloodGroup"}
                         label={"Blood Group"}
                         required={true}
                         margin={"dense"}
                         value={this.state.bloodGroup}
                         fullWidth={true}
                         onBlur={this.handleRequired.bind(this)}
                         onChange={this.handleChange.bind(this)}
              />
            </GridItem>

          </GridContainer>


        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"} onClick={this.handleEdit.bind(this)}>Update</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.close.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

StaffEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  branches: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  staff: PropTypes.object.isRequired
};

export default withStyles(style)(StaffEditDialog);