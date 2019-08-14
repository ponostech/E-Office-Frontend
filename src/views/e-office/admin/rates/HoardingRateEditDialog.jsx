import React, { Component } from "reactn";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField, withStyles
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import { CategoryServices } from "../../../../services/CategoryServices";
import OfficeSelect from "../../../../components/OfficeSelect";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from 'prop-types'

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

class HoardingRateEditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Hoarding/Kiosk",
      displayType: null,
      category: null,
      landlordType: "Public",
      rate: 0,
      duration: "Day",

      rateError: "",
      typeError: "",
      displayTypeError: "",
      categoryError: "",

      // types:[
      //   { value: "Hoarding/Kiosk", label: "Hoarding/Kiosk" },
      //   { value: "Collapsible Kiosk", label: "Collapsible Kiosk" },
      //   { value: "Poster/Banner", label: "Poster/Banner" },
      //   { value: "Umbrella", label: "Umbrella " },
      //   { value: "Balloons", label: "Balloons " },
      //   { value: "Audio/Sound", label: "Audio/Sound " },
      //   { value: "Vehicle", label: "Vehicle" },
      //   { value: "Video", label: "Video" },
      // ],
      displayTypes: [
        { value: "ILLUMINATED", label: "ILLUMINATED" },
        { value: "NON-ILLUMINATED", label: "NON ILLUMINATED" }
      ],
      loading: false
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const{rate}=nextProps;
    // this.setState({
    //   type:rate.type,
    //   displayType:rate.display_type,
    //   category:rate.category,
    //   landlordType:rate.landlord_type,
    //   rate:rate.rate,
    //   duration:rate.per_time
    // })
  }

  componentDidMount() {
    this.setState({ loading: true });
    new CategoryServices().fetch(
      errorMsg => this.setGlobal({ errorMsg }),
      categories => this.setState({ categories })
    )
      .finally(() => this.setState({ loading: false }));

  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
    if (name === "type") {
      this.setState({ landlordType: "Private" });
    }
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
        this.state.rate === null ? this.setState({ rateError: "Rate is required" }) : this.setState({ rateError: "" });
        break;

    }
  };
  invalid=()=>{
    const { type, displayType, category, landlordType, rate,duration } = this.state;
    return !Boolean(type) || !Boolean(displayType) || !Boolean(category)
  }
  updateRate = () => {
    const { type, displayType, category, landlordType, rate,duration } = this.state;

    if (this.invalid()) {
      this.setGlobal({ errorMsg: "Please fill all the required fields" });
    } else {
      let data = {
        type:type,
        display_type:displayType?displayType.value:null,
        area_category_id:category?category.value:null,
        land_owner_type: landlordType,
        per_time: duration ,
        rate
      };
      this.clear()
      this.props.onUpdate(data);
    }
  };
  clear=()=>{

  }
  render() {

    const { type, displayType, category, rate, duration } = this.state;
    const { typeError, displayTypeError, categoryError, rateError } = this.state;
    const { types, displayTypes, categories } = this.state;
    const { open, onClose,onUpdate, classes } = this.props;
    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={onClose} fullWidth={true}
              maxWidth={"sm"}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Create Hoarding/Kiosk Rate
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        {this.state.loading === false &&

        <DialogContent >

          <OfficeSelect
            value={category}
            label={"Categories"}
            name={"category"}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            helperText={categoryError}
            error={Boolean(categoryError)}
            onChange={val => this.handleChange("category", val)}
            options={categories}/>

          <OfficeSelect
            value={displayType}
            label={"Type of Display"}
            name={"displayType"}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            helperText={displayTypeError}
            error={Boolean(displayTypeError)}
            onChange={val => this.handleChange("displayType", val)}
            options={displayTypes}/>

          <FormControl component={"div"} fullWidth={true} margin={"dense"}>
            <FormLabel component={"div"}>Rate Duration</FormLabel>
            <RadioGroup
              defaultValue={"Day"}
              value={duration}
              name={"duration"}
              row={true}
              onChange={event => this.handleChange("duration", event.target.value)}
            >
              <FormControlLabel value={"Day"} control={<Radio color={"primary"}/>}
                                label={"Day"}/>
              <FormControlLabel value={"Month"} control={<Radio color={"primary"}/>}
                                label={"Month"}/>
              <FormControlLabel value={"Year"} control={<Radio color={"primary"}/>}
                                label={"Year"}/>
            </RadioGroup>
          </FormControl>

          <TextField
            value={rate}
            type={"number"}
            name={"rate"}
            fullWidth={true}
            variant={"outlined"}
            label={"Rate"}
            required={true}
            error={Boolean(rateError)}
            helperText={rateError}
            onChange={event => this.handleChange("rate", event.target.value)}/>
        </DialogContent>
        }
        <Divider component={"div"}/>

        <DialogActions>
          <Button disabled={!Boolean(type) || !Boolean(displayType) || !Boolean(category)} href={"#"}
                  variant={"outlined"} color={"primary"} onClick={event => this.updateRate()}>Update</Button>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
HoardingRateEditDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired,
  rate:PropTypes.object.isRequired,
  onUpdate:PropTypes.func.isRequired
}

export default withStyles(styles)(HoardingRateEditDialog);