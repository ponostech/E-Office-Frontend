import React, { Component } from "reactn";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardHeader,
  InputAdornment,
  TextField
} from "@material-ui/core";
import { StaffService } from "../../../services/StaffService";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import AddressField from "../../../components/AddressField";
import OfficeSelect from "../../../components/OfficeSelect";
import { Validators } from "../../../utils/Validators";
import { LoginService } from "../../../services/LoginService";
import moment from "moment";
import { AvatarView } from "../../../components/AvatarView";
import SubmitDialog from "../../../components/SubmitDialog";

class BasicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
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

      submit: false
    };
    this.staffService = new StaffService();
  }

  componentDidMount() {
    const user = LoginService.getCurrentUser();

    this.setGlobal({ loading: true });
    Promise.all([this.fetchBranches(), this.fetchRoles()]).finally(() =>
      this.setGlobal({ loading: false })
    );

    console.log(user);
    this.setStaff(LoginService.getCurrentUser());
  }

  setStaff = user => {
    this.setState({
      photo: user.photo,
      name: user.staff.name,
      email: user.email,
      phone: user.phone_no,
      designation: user.staff.designation,
      address: user.staff.address,
      dob: moment(user.staff.dob),
      branch: {
        label: user.staff.branch,
        value: user.staff.branch
      },
      role: {
        label: user.roles[0] ? user.roles[0].name : "",
        value: user.roles[0] ? user.roles[0].id : ""
      },
      bloodGroup: user.staff.bloodGroup
    });
  };
  getUser = async () => {
    const id = LoginService.getCurrentUser().id;
    await this.staffService.getStaff(
      id,
      errorMsg => this.setGlobal({ errorMsg }),
      staff => this.setStaff(staff)
    );
  };

  fetchBranches = async () => {
    await this.staffService.getBranch(
      errorMsg => this.setGlobal({ errorMsg }),
      branches => this.setState({ branches })
    );
  };

  fetchRoles = async () => {
    await this.staffService.getRoles(
      errorMsg => this.setGlobal({ errorMsg }),
      roles => this.setState({ roles })
    );
  };

  updateProfile = () => {
    const {
      id,
      photo,
      name,
      email,
      phone,
      designation,
      address,
      dob,
      branch,
      role,
      bloodGroup
    } = this.state;
    this.setState({ submit: true });
    this.staffService
      .update(
        {
          id,
          photo,
          name,
          email,
          phone_no: phone,
          designation,
          address,
          dob: moment(dob).format("YYYY/MM/DD"),
          branch: branch.value,
          role: role.value,
          bloodGroup
        },
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg })
      )
      .finally(() => this.setState({ submit: false }));
  };

  reset = () => {};

  onBlur = (name, value) => {
    switch (name) {
      case "name":
        value.length <= 0
          ? this.setState({ nameError: "Name is required" })
          : this.setState({ nameError: "" });
        break;
      case "email":
        if (value.length <= 0)
          this.setState({ emailError: "Email is required" });
        else if (!Validators.EMAIL_REGEX.test(value))
          this.setState({ emailError: "Invalid Email" });
        else this.setState({ emailError: "" });
        break;
      case "phone":
        if (value.length <= 0)
          this.setState({ phoneError: "Phone No is required" });
        else if (!Validators.PHONE_REGEX.test(value))
          this.setState({ phoneError: "Phone No must be 10 digit number" });
        else this.setState({ phoneError: "" });
        break;
      case "address":
        value.length <= 0
          ? this.setState({ addressError: "Address is required" })
          : this.setState({ addressError: "" });
        break;
      case "designation":
        value.length <= 0
          ? this.setState({ designationError: "Designation is required" })
          : this.setState({ designationError: "" });
        break;
      case "dob":
        value.length <= 0
          ? this.setState({ dobError: "Date of Birth is required" })
          : this.setState({ dobError: "" });
        break;
      case "branch":
        value.length <= 0
          ? this.setState({ branchError: "Branch is required" })
          : this.setState({ branchError: "" });
        break;
      case "role":
        value.length <= 0
          ? this.setState({ roleError: "Role is required" })
          : this.setState({ roleError: "" });
        break;
      default:
        break;
    }
  };
  onChange = (name, value) => this.setState({ [name]: value });

  render() {
    const { branches, roles } = this.state;
    const {
      name,
      photo,
      email,
      phone,
      designation,
      address,
      dob,
      branch,
      role,
      bloodGroup,
      submit
    } = this.state;
    const {
      nameError,
      emailError,
      phoneError,
      designationError,
      addressError,
      dobError,
      branchError,
      roleError
    } = this.state;
    return (
      <Card>
        <CardHeader
          style={{ textAlign: "center" }}
          title={
            <AvatarView
              url={photo}
              onChange={photo => this.setState({ photo })}
            />
          }
        />
        <CardContent>
          <TextField
            variant={"outlined"}
            name={"name"}
            margin={"dense"}
            label={"Name"}
            value={name}
            required={true}
            fullWidth={true}
            onBlur={e => this.onBlur("name", e.target.value)}
            onChange={event => this.onChange("name", event.target.value)}
            error={Boolean(nameError)}
            helperText={nameError}
          />
          <TextField
            variant={"outlined"}
            name={"email"}
            label={"Email"}
            required={true}
            margin={"dense"}
            type={"email"}
            value={email}
            fullWidth={true}
            onBlur={e => this.onBlur("email", e.target.value)}
            onChange={event => this.onChange("email", event.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <TextField
            variant={"outlined"}
            name={"phone"}
            label={"Phone"}
            required={true}
            margin={"dense"}
            value={phone}
            fullWidth={true}
            onBlur={e => this.onBlur("phone", e.target.value)}
            onChange={event => this.onChange("phone", event.target.value)}
            error={Boolean(phoneError)}
            helperText={phoneError}
          />
          <OfficeSelect
            value={branch}
            label={"Branch"}
            name={"branch"}
            required={true}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            onBlur={value => this.onBlur("branch", value)}
            onChange={value => this.onChange("branch", value)}
            error={Boolean(branchError)}
            helperText={branchError}
            options={branches}
          />

          <OfficeSelect
            value={role}
            label={"Staff Role"}
            name={"role"}
            required={true}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            onBlur={value => this.onBlur("role", value)}
            onChange={value => this.onChange("role", value)}
            error={Boolean(roleError)}
            helperText={roleError}
            options={roles}
          />

          <TextField
            variant={"outlined"}
            name={"designation"}
            label={"Designation"}
            required={true}
            margin={"dense"}
            value={designation}
            fullWidth={true}
            onBlur={e => this.onBlur("designation", e.target.value)}
            onChange={event => this.onChange("designation", event.target.value)}
            error={Boolean(designationError)}
            helperText={designationError}
          />
          <AddressField
            textFieldProps={{
              value: address,
              onBlur: e => this.onBlur("address", e.target.value),
              onChange: event => this.onChange("address", event.target.value),
              error: Boolean(addressError),
              helperText: addressError,
              margin: "dense",
              variant: "outlined",
              fullWidth: true,
              name: "address",
              label: "Address",
              required: true
            }}
            onPlaceSelect={place => {
              if (place) {
                let name = place.name;
                let address = place.formatted_address;
                let complete_address = address.includes(name)
                  ? address
                  : `${name} ${address}`;
                this.setState({ address: complete_address });
              }
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              required={true}
              fullWidth={true}
              error={!!dobError}
              helperText={dobError}
              margin="dense"
              name={"dob"}
              variant="outlined"
              label="Date of birth"
              value={dob}
              onBlur={date => this.onBlur("dob", date)}
              onChange={date => this.onChange("dob", date)}
              format={"dd/MM/yyyy"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    <CalendarIcon color={"action"} />
                  </InputAdornment>
                )
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            variant={"outlined"}
            name={"bloodGroup"}
            label={"Blood Group"}
            required={true}
            margin={"dense"}
            value={bloodGroup}
            fullWidth={true}
            onBlur={e => this.onBlur("bloodGroup", e.target.value)}
            onChange={event => this.onChange("bloodGroup", event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={e => this.updateProfile()}
            color={"primary"}
            variant={"outlined"}
          >
            Update
          </Button>
          <Button
            onClick={e => this.reset()}
            color={"secondary"}
            variant={"outlined"}
          >
            Reset
          </Button>
        </CardActions>

        <SubmitDialog
          open={submit}
          title={"Updating Profile"}
          text={"Please wait ... "}
        />
      </Card>
    );
  }
}

export default BasicProfile;
