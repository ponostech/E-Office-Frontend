import React, { Component } from "reactn";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField, withStyles
} from "@material-ui/core";
import { CategoryServices } from "../../../../services/CategoryServices";
import OfficeSelect from "../../../../components/OfficeSelect";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RateCreateDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      displayType: null,
      category: null,
      landlordType: "0",
      rate: 0,

      rateError: "",
      typeError: "",
      displayTypeError: "",
      categoryError: "",

      types:[
        { value: "Hoarding", label: "Hoarding" },
        { value: "Kiosk", label: "Kiosk" },
        { value: "Shop", label: "Shop" },
        { value: "Banner", label: "Banner" }
      ],
      displayTypes:[
        { value: "ILLUMINATED", label: "ILLUMINATED" },
        { value: "NON-ILLUMINATED", label: "NON ILLUMINATED" },
        { value: "FLICKERING_LIGHT", label: "FLICKERING LIGHT" }
      ],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    new CategoryServices().fetch(
      errorMsg => this.setGloba({ errorMsg }),
      categories => this.setState({ categories })
    )
      .finally(() => this.setState({ loading: false }));

  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleRequired = (name) => {
    switch (name) {
      case "type":
        this.state.types === null ? this.setState({ typeError: "Type of advertisement is required" }) : this.setState({ typeError: "" });
        break;
      case "displayType":
        this.state.displayType === null ? this.setState({ displayTypeError: "Type of Display is required" }) : this.setState({ displayTypeError: "" });
        break;
      case "category":
        this.state.category === null ? this.setState({ categoryError: "Category is required" }) : this.setState({ categoryError: "" });
        break;
      case "rate":
        this.state.category === null ? this.setState({ rateError: "Rate is required" }) : this.setState({ rateError: "" });
        break;

    }
  };

  invalid = () => {
    const { type, displayType, category, landlordType, rate } = this.state;
    return !Boolean(type) || !Boolean(displayType) || !Boolean(category) || !Boolean(rate);
  };
  save = () => {
    const { type, displayType, category, landlordType, rate } = this.state;
    if (this.invalid) {
      this.setGlobal({ errorMsg: "Please fill all the required fields" });
    } else {
      let data = {
        type,
        display_type:displayType.value,
        category_id:category.value,
        landlord_type: landlordType ? "Public" : "Private",
        rate
      };
      this.props.onClose(data);
    }
  };

  close = () => {
    this.props.onClose(null);
  };

  render() {
    const { type, displayType, category, landlordType, rate } = this.state;
    const { typeError, displayTypeError, categoryError, rateError } = this.state;
    const { types, displayTypes, categories } = this.state;
    const { open,onClose,classes } = this.props;
    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={this.close.bind(this)} fullWidth={true} maxWidth={"sm"}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.close.bind(this)} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              "Create Advertisement Rate"
            </Typography>
            <Button href={"#"} onClick={this.close.bind(this)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {
          this.state.loading === false &&
          <DialogContent>
            <OfficeSelect
              value={type}
              label={"Type of Advertisement"}
              name={"type"}
              variant={"outlined"}
              margin={"dense"}
              fullWidth={true}
              required={true}
              helperText={typeError}
              error={Boolean(typeError)}
              onBlur={e => this.handleRequired("type")}
              onChange={val => this.handleChange("type", val)}
              options={types}/>
            <OfficeSelect
              value={displayType}
              label={"Type of Display"}
              name={"displayType"}
              variant={"outlined"}
              margin={"dense"}
              fullWidth={true}
              required={true}
              helperText={displayTypeError}
              error={Boolean(displayTypeError)}
              onBlur={e => this.handleRequired("displayType")}
              onChange={val => this.handleChange("displayType", val)}
              options={displayTypes}/>

            <OfficeSelect
              value={category}
              label={"Categories"}
              name={"category"}
              variant={"outlined"}
              margin={"dense"}
              fullWidth={true}
              required={true}
              helperText={categoryError}
              error={Boolean(categoryError)}
              onBlur={e => this.handleRequired("category")}
              onChange={val => this.handleChange("category", val)}
              options={categories}/>

            <FormControl component={"div"} fullWidth={true} margin={"dense"}>
              <FormLabel component={"div"}>Type of Landlord/ Land owner</FormLabel>
              <RadioGroup
                defaultValue={"0"}
                value={landlordType}
                name={"landlordType"}
                row={true}
                onChange={event => this.handleChange("landlordType", event.target.value)}
              >
                <FormControlLabel value={"0"} control={<Radio color={"primary"}/>}
                                  label={"Private"}/>
                <FormControlLabel value={"1"} control={<Radio color={"primary"}/>}
                                  label={"Public"}/>
              </RadioGroup>
            </FormControl>

            <TextField
              value={rate}
              name={"rate"}
              fullWidth={true}
              variant={"outlined"}
              label={"Rate"}
              required={true}
              error={Boolean(rateError)}
              helperText={rateError}
              onChange={event => this.handleChange("name", event.target.value)}/>
          </DialogContent>
        }

        <DialogActions>
          <Button href={"#"} variant={"outlined"} color={"primary"} onClick={this.save.bind(this)}>Save</Button>
          <Button href={"#"} variant={"outlined"} color={"primary"} onClick={this.close.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(RateCreateDialog);