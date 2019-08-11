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

class OtherRateDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayType: null,
      category: null,
      landlordType: "Public",
      rate: 0,
      duration: "Day",

      rateError: "",
      typeError: "",
      displayTypeError: "",
      categoryError: "",

      types:[
        { value: "Collapsible Kiosk", label: "Collapsible Kiosk" },
        { value: "Poster/Banner", label: "Poster/Banner" },
        { value: "Umbrella", label: "Umbrella " },
        { value: "Balloons", label: "Balloons " },
        { value: "Audio/Sound", label: "Audio/Sound " },
        { value: "Vehicle", label: "Vehicle" },
        { value: "Video", label: "Video" },
      ],
      displayTypes: [
        { value: "ILLUMINATED", label: "ILLUMINATED" },
        { value: "NON-ILLUMINATED", label: "NON ILLUMINATED" }
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
    const { type } = this.state;
    return !Boolean(type) ;
  }
  save = () => {
    const { type, rate,duration } = this.state;

    if (this.invalid()) {
      this.setGlobal({ errorMsg: "Please fill all the required fields" });
    } else {
      let data = {
        type:type?type.value:null,
        display_type:null,
        area_category_id:null,
        land_owner_type: "Private",
        per_time: duration ,
        rate
      };
      this.clear()
      this.props.onCreate(data);
    }
  };
  clear=()=>this.setState({
    type:null,
    rate:0,
    duration:"Day"
  })
  render() {

    const { type, displayType, category, rate, duration } = this.state;
    const { typeError, displayTypeError, categoryError, rateError } = this.state;
    const { types, displayTypes, categories } = this.state;
    const { open, onClose, classes } = this.props;
    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={onClose} fullWidth={true}
              maxWidth={"sm"}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Create Advertisement Rate
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        {this.state.loading === false &&

        <DialogContent>

          <OfficeSelect
            value={type}
            label={"Type of Advertisement"}
            name={"type"}
            required={true}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            helperText={typeError}
            error={Boolean(typeError)}
            onChange={val => this.handleChange("type", val)}
            options={types}/>

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
          <Button disabled={!Boolean(type)} href={"#"}
                  variant={"outlined"} color={"primary"} onClick={this.save.bind(this)}>Save</Button>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(OtherRateDialog);