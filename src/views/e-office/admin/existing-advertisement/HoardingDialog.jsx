import React, { Component } from "reactn";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Slide,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MapIcon from "@material-ui/icons/PinDrop";
import DialogContent from "@material-ui/core/DialogContent";
import { LocalCouncilService } from "../../../../services/LocalCouncilService";
import { CategoryServices } from "../../../../services/CategoryServices";
import OfficeSelect from "../../../../components/OfficeSelect";
import AddressField from "../../../../components/AddressField";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class HoardingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localCouncil: undefined,
      category: undefined,
      displayType: undefined,

      latitude: undefined,
      longitude: undefined,

      coordinate: "",
      length: 0,
      height: 1,
      clearance: undefined,
      address: "",
      bothSide: false,

      landLord: "",
      landlordType: "0",

      localCouncils: [],
      categories: [],
      displayTypes: [
        { value: "ILLUMINATED", label: "ILLUMINATED" },
        { value: "NON-ILLUMINATED", label: "NON ILLUMINATED" },
        { value: "FLICKERING_LIGHT", label: "FLICKERING LIGHT" }
      ],
      openMap: false,
      errors: {}
    };

    this.localCouncilservice = new LocalCouncilService();
    this.categoryService = new CategoryServices();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    var self = this;
    this.setGlobal({ loading: true });
    Promise.all([self.fetchCategory(), self.fetchLocalCouncil()]).finally(
      () => {
        self.setGlobal({ loading: false });
      }
    );
  }

  fetchLocalCouncil = async () => {
    await this.localCouncilservice
      .fetch(
        errorMsg => this.setGlobal({ errorMsg }),
        localCouncils => this.setState({ localCouncils })
      )
      .finally(() => console.info("Local council request has been made"));
  };

  fetchCategory = async () => {
    await this.categoryService
      .fetch(
        errorMsg => this.setGlobal({ errorMsg }),
        categories => this.setState({ categories })
      )
      .finally(() => console.info("Areas categories fetch successfully"));
  };

  validate = (name, value) => {
    let errors = {};
    switch (name) {
      case "localCouncil":
        value
          ? delete errors["localCouncil"]
          : (errors["localCouncil"] = "Local council is required");
        break;
      case "category":
        value
          ? delete errors["category"]
          : (errors["localCouncil"] = "Category is required");
        break;
      default:
        break;
    }
  };
  onBlur = (name, value) => {};
  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleCreate = () => {};
  handleClose = () => {};

  render() {
    const { open, onClose, classes } = this.props;

    const {
      localCouncil,
      category,
      displayType,
      coordinate,
      length,
      height,
      roadDetail,
      clearance,
      address,
      bothSide,
      landLord,
      landlordType
    } = this.state;
    const { localCouncils, categories, displayTypes, errors } = this.state;
    return (
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              href={"#"}
              color="inherit"
              onClick={e => onClose()}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              color="inherit"
              className={classes.flex}
            >
              New Hoarding
            </Typography>
            <Button href={"#"} onClick={e => onClose()} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid
            spacing={3}
            container={true}
            justify={"center"}
            alignItems={"center"}
          >
            <Grid item={true} xs={12} sm={12} md={6}>
              <OfficeSelect
                value={localCouncil}
                defaultValues={localCouncils[0]}
                label={"Local Council"}
                name={"localCouncil"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                helperText={errors["localCouncil"]}
                error={errors["localCouncil"]}
                onBlur={val => this.onBlur("localCouncil", val)}
                onChange={val => this.onChange("localCouncil", val)}
                options={localCouncils}
              />
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6}>
              <OfficeSelect
                value={category}
                label={"Category"}
                name={"category"}
                variant={"outlined"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                helperText={errors["category"]}
                error={errors["category"]}
                onBlur={val => this.onBlur("category", val)}
                onChange={val => this.onChange("category", val)}
                options={categories}
              />
            </Grid>

            <Grid item={true} xs={12} sm={12} md={3}>
              <TextField
                name={"length"}
                value={length}
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                type={"number"}
                margin={"dense"}
                fullWidth={true}
                variant={"outlined"}
                label={"Length(Feet)"}
                required={true}
                onChange={event => this.onChange("length", event.target.value)}
                onBlur={event => this.onChange("length", event.target.value)}
                error={errors["length"]}
                helperText={errors["length"]}
              />
            </Grid>
            <Grid item={true} xs={12} sm={12} md={3}>
              <TextField
                name={"height"}
                value={height}
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                type={"number"}
                margin={"dense"}
                fullWidth={true}
                variant={"outlined"}
                label={"Height(Feet)"}
                required={true}
                onChange={event => this.onChange("height", event.target.value)}
                onBlur={event => this.onChange("height", event.target.value)}
                error={errors["height"]}
                helperText={errors["height"]}
              />
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6}>
              <AddressField
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
                textFieldProps={{
                  required: true,
                  error: errors["address"],
                  helperText: errors["address"],
                  name: "address",
                  placeholder: "Address",
                  value: address,
                  margin: "dense",
                  fullWidth: true,
                  variant: "outlined",
                  onBlur: event => this.onBlur("address", event.target.value),
                  onChange: event =>
                    this.onChange("address", event.target.value),
                  label: "Address"
                }}
              />
            </Grid>

            <Grid item={true} xs={12} sm={12} md={6}>
              <OfficeSelect
                value={displayType}
                error={errors["displayType"]}
                helperText={errors["displayType"]}
                required={true}
                name={"displayType"}
                variant={"outlined"}
                placeHolder={"Type of Display"}
                margin={"dense"}
                fullWidth={true}
                onBlur={val => this.onBlur("displayType", val)}
                onChange={val => this.onChange("displayType", val)}
                options={displayTypes}
                label={"Type of Display"}
              />
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6}>
              <TextField
                value={coordinate}
                name={"coordinate"}
                margin={"dense"}
                fullWidth={true}
                variant={"outlined"}
                required={true}
                onChange={e => {}}
                onClick={() => this.setState({ openMap: true })}
                helperText={errors["coordinateError"]}
                error={errors["coordinateError"]}
                label={"Location"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <Tooltip title={"Click here to see the map"}>
                        <IconButton
                          onClick={e => {
                            this.setState({ openMap: true });
                          }}
                        >
                          <MapIcon color={"action"} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item={true} xs={12} sm={12} md={6}>
              <TextField
                name={"roadDetail"}
                value={roadDetail}
                margin={"dense"}
                fullWidth={true}
                variant={"outlined"}
                label={"Details of road"}
                onChange={event =>
                  this.onChange("roadDetail", event.target.value)
                }
              />
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6}>
              <FormControl margin={"dense"}>
                <FormControlLabel
                  onChange={event =>
                    this.setState({ bothSide: event.target.checked })
                  }
                  name={"bothSide"}
                  control={
                    <Switch
                      color={"primary"}
                      value={bothSide}
                      checked={bothSide}
                      required={true}
                    />
                  }
                  label={"Both Sided?"}
                />
              </FormControl>
            </Grid>

            <Grid item={true} xs={12} sm={12} md={12}>
              <TextField
                name={"clearance"}
                value={clearance}
                margin={"dense"}
                fullWidth={true}
                variant={"outlined"}
                label={"Clearance"}
                onChange={event =>
                  this.onChange("clearance", event.target.value)
                }
              />
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6}>
              <TextField
                name={"landLord"}
                margin={"dense"}
                value={landLord}
                fullWidth={true}
                variant={"outlined"}
                label={"Name of the Landlord/Land Owner"}
                onChange={event =>
                  this.onChange("landLord", event.target.value)
                }
              />
            </Grid>

            <Grid item={true} xs={12} sm={12} md={6}>
              <FormControl fullWidth={true} margin={"dense"}>
                <FormLabel>Type of Landlord/ Land owner</FormLabel>
                <RadioGroup
                  defaultValue={"0"}
                  value={landlordType}
                  name={"landlordType"}
                  row={true}
                  onChange={event =>
                    this.onChange("landlordType", event.target.value)
                  }
                >
                  <FormControlLabel
                    value={"0"}
                    control={<Radio color={"primary"} />}
                    label={"Private"}
                  />
                  <FormControlLabel
                    value={"1"}
                    control={<Radio color={"primary"} />}
                    label={"Public"}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider component={"li"} />
        <DialogActions>
          <Button
            onClick={this.handleCreate}
            variant={"outlined"}
            color={"primary"}
          >
            Save
          </Button>
          <Button
            onClick={this.handleClose}
            variant={"outlined"}
            color={"primary"}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
HoardingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default withStyles(styles)(HoardingDialog);
