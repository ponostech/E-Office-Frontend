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
import Divider from "@material-ui/core/Divider";

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
      landlordType: "Private",
      rate: 0,
      duration:"Day",
      rateError: "",
      typeError: "",
      displayTypeError: "",
      categoryError: "",

      types:[
        { value: "Hoarding/Kiosk", label: "Hoarding/Kiosk" },
        { value: "Collapsible Kiosk", label: "Collapsible Kiosk" },
        { value: "Poster/Banner", label: "Poster/Banner" },
        { value: "Umbrella", label: "Umbrella " },
        { value: "Balloons", label: "Balloons " },
        { value: "Audio/Sound", label: "Audio/Sound " },
        { value: "Vehicle", label: "Vehicle" },
        { value: "Video", label: "Video" },
      ],
      displayTypes:[
        { value: "ILLUMINATED", label: "ILLUMINATED" },
        { value: "NON-ILLUMINATED", label: "NON ILLUMINATED" },
      ],
      loading: false
    };
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
      this.setState({landlordType:"Private"})
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

  isValid = () => {
    const { type, displayType, category, landlordType, rate,duration } = this.state;
    let valid=false;
    if (type==="Hoarding/Kiosk") {
      valid=Boolean(displayType);
      if (landlordType === "Public"){
        valid=Boolean(category)
      }else {
        this.setGlobal({errorMsg:"Hoarding/Kiosk must be in public"})
        valid=false
      }
    }else{
      valid=Boolean(type);
    }
    return valid;
  };
  save = () => {
    const { type, displayType, category, landlordType, rate,duration } = this.state;

    if (!this.isValid()) {
      this.setGlobal({ errorMsg: "Please fill all the required fields" });
    } else {
      let data = {
        type:type?type.value:null,
        display_type:displayType?displayType.value:null,
        area_category_id:category?category.value:null,
        land_owner_type: landlordType,
        per_time: duration ,
        rate
      };
      this.clear()
      // this.props.onCreate(data);
    }
  };

  clear=()=>{
    this.setState({
      type: null,
      displayType: null,
      category: null,
      landlordType: "Private",
      rate: 0,
      duration:"Day",

      rateError: "",
      typeError: "",
      displayTypeError: "",
      categoryError: "",
    })
  }
  close = () => {
    this.clear()
    this.props.onClose(null);
  };

  render() {
    const { type, displayType, category, landlordType, rate,duration } = this.state;
    const { typeError, displayTypeError, categoryError, rateError,heightVh } = this.state;
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
              Create Advertisement Rate
            </Typography>
            <Button href={"#"} onClick={this.close.bind(this)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {
          this.state.loading === false &&
          <DialogContent style={{height:"50vh"}}>
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
              onChange={val => this.handleChange("type", val)}
              options={types}/>
           { type && type.value==="Hoarding/Kiosk" &&
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
              options={displayTypes}/>}
            {
              type && type.value==="Hoarding/Kiosk" &&
              <FormControl component={"div"} fullWidth={true} margin={"dense"}>
                <FormLabel component={"div"}>Type of Landlord/ Land owner</FormLabel>
                <RadioGroup
                  defaultValue={"0"}
                  value={landlordType}
                  name={"landlordType"}
                  row={true}
                  onChange={event => this.handleChange("landlordType", event.target.value)}
                >
                  <FormControlLabel value={"Private"} control={<Radio color={"primary"}/>}
                                    label={"Private"}/>
                  <FormControlLabel value={"Public"} control={<Radio color={"primary"}/>}
                                    label={"Public"}/>
                </RadioGroup>
              </FormControl>
            }
            {
              landlordType && landlordType==="Public" &&<OfficeSelect
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
            }

            <FormControl component={"div"} fullWidth={true} margin={"dense"}>
              <FormLabel component={"div"}>Rate Duration</FormLabel>
              <RadioGroup
                defaultValue={"0"}
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
          <Button disabled={!Boolean(type)} href={"#"} variant={"outlined"} color={"primary"} onClick={this.save.bind(this)}>Save</Button>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={this.close.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(RateCreateDialog);