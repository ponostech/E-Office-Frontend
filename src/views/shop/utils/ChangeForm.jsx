import React, { Component } from "reactn";
import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";
import GridItem from "../../../components/Grid/GridItem";
import OfficeSelect from "../../../components/OfficeSelect";
import AddressField from "../../../components/AddressField";
import PlaceIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { LocalCouncilService } from "../../../services/LocalCouncilService";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import FileUpload from "../../../components/FileUpload";
import { APPLICATION_NAME } from "../../../utils/Util";
import GridContainer from "../../../components/Grid/GridContainer";

const style={
  subTitle:{
    fontSize: 16,
    color: "#727272",
    marginTop: 6,
    marginBottom: 6
  }
}

class ChangeForm extends Component {
  static TITLE1 = "FORM-I";
  static TITLEb = "FORM-II";
  static TITLE2 = "AIZAWL MUNICIPAL CORPORATION";
  static TITLE = "APPLICATION FOR LICENSE (Except Hotels & Lodgings)";
  static TITLEI = "APPLICATION FOR LICENSE (For Hotels & Lodgings)";
  static SUBTITLE = "[See Section 4(a) of the AMC Licensing Regulations, 2012]";

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      type: "",
      email: "",
      address: "",
      ownerAddress: "",
      localCouncil: undefined,
      places: "",
      tradeName: undefined,
      shopName: "",
      coordinate: "",
      businessDetail: "",
      estd: new Date(),
      tinNo: "",
      cstNo: "",
      gstNo: "",
      panNo: "",
      premised: "Owned",
      displayType: undefined,
      passport: undefined,
      latitude: undefined,
      longitude: undefined,
      uploadDocuments: [],

      nameError: "",
      typeError: "",
      addressError: "",
      tradeNameError: "",
      coordinateError: "",
      phoneError: "",
      shopNameError: "",
      displayTypeError: "",
      estdError: "",
      localCouncilError: "",
      ownerAddressError: "",

      types: [
        { value: "proprietor", label: "Proprietor" },
        { value: "partnership", label: "Partnership" },
        { value: "private limited", label: "Private Limited" }
      ],
      trades: [],
      localCouncils: [],
      agree: false,
      submit: false,

    };
    this.setApplication(props.application)
      this.localCouncilService = new LocalCouncilService();
  }

  setApplication=(application)=>{
    this.setState({
      name: application['owner'],
      phone:application['phone'],
      type: {
        value:application["type"],
        label:application['type']
      },
      email: application['email'],
      address: application['address'],
      ownerAddress: application['ownerAddress'],
      localCouncil: {
        value:application['local_council'].id,
        label:application['local_council'].name
      },
      tradeName: undefined,
      shopName: application['name'],
      coordinate: "",
      businessDetail: application['details'],
      estd: application['estd'],
      tinNo: application['tin_no'],
      cstNo: application['cst_no'],
      gstNo: application['gst_no'],
      panNo: application['pan_no'],
      premised: application['premise_type'],

      passport: undefined,
      latitude: undefined,
      longitude: undefined,
    })
  }

  componentDidMount() {
  }
  fetchLocalCouncil = async () => {
    await this.localCouncilService.fetch(errorMsg => this.setGlobal({ errorMsg }),
      localCouncils => this.setState({ localCouncils }));
  };

  onChange = (name, value) => {
    switch (name) {
      case "owner":
        this.setState({name:value})
        break;
      case "phone":
        this.setState({phone:value})
        break;
      default:
        this.setState({[name]:value})
    }
  };
  onBlur = (name, value) => {
    Boolean(value) === false ? this.setGlobal({ errorMsg: "Value is required" }) : this.setGlobal({ errorMsg: "" });
  };

  render() {
    const { application,selectedFields,selectedDocuments,classes } = this.props;
    return (
      <Card>
        <CardContent>
          <Grid spacing={3} container={true} justify={"flex-start"} alignItems={"flex-start"}>
            <Grid item={true} md={12} sm={12} xs={12}>
              <Typography variant={"h5"} align="center">{ChangeForm.TITLE1}</Typography>
              <Typography variant={"h5"} align="center">{ChangeForm.TITLE}</Typography>
              <Typography variant={"subtitle1"} align="center">{ChangeForm.SUBTITLE}</Typography>
            </Grid>

            <Grid item={true} md={12} sm={12} xs={12}>
              <Typography className={classes.subTitle} variant={"h6"}> Details of Applicant</Typography>
            </Grid>

            <Grid item={true} md={12} sm={12} xs={12}>
              <Divider component={"div"}/>
            </Grid>

            <Grid style={{display:selectedFields["owner"]?"block":"none" }} item={true} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.name}
                name={"name"}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("owner", event.target.value)}
                label={"Name of Applicant"}
              />
            </Grid>
            <Grid style={{display:selectedFields["phone"]?"block":"none" }} item={true} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.phone}
                required={true}
                name={"phone"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange(event.target.name, event.target.value)}
                label={"Phone No"}
              />
            </Grid>
            <Grid item={true} style={{display:selectedFields["type"]?"block":"none" }} className={classes.root} xs={12} sm={12} md={6}>
              <OfficeSelect
                variant={"outlined"}
                margin={"dense"}
                value={this.state.type}
                required={true}
                fullWidth={true}
                name={"type"}
                error={!!this.state.typeError}
                onBlur={val=>this.onBlur("type",val)}
                onChange={val => this.onChange('type', val)}
                ClearAble={true}
                label={"Type of Applicant"}
                helperText={this.state.typeError}
                options={this.state.types}/>
            </Grid>
            <Grid item={true} style={{display:selectedFields["email"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                type={"email"}
                value={this.state.email}
                name={"email"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("email", event.target.value)}
                label={"Email"}
              />

            </Grid>
            <Grid item={true} style={{display:selectedFields["owner_address"]?"block":"none" }} xs={12} sm={12} md={6}>
              <AddressField
                textFieldProps={
                  {
                    value: this.state.ownerAddress,
                    name: "ownerAddress",
                    placeholder: "Owner Address",
                    onBlur: e => this.onBlur("ownerAddress", e.target.value),
                    required: true,
                    variant: "outlined",
                    margin: "dense",
                    fullWidth: true,
                    error: Boolean(this.state.ownerAddressError),
                    helperText: this.state.ownerAddressError,
                    onChange: e => this.onChange("ownerAddress", e.target.value),
                    label: "Address of Applicant"
                  }
                }

                onPlaceSelect={(place) => {
                  if (place) {
                    let name = place.name;
                    let address = place.formatted_address;
                    let complete_address = address.includes(name) ? address : `${name} ${address}`;
                    this.setState({ ownerAddress: complete_address });
                  }
                }}/>
            </Grid>

            <Grid item={true} md={12} sm={12} xs={12}>
              <Typography className={classes.subTitle} variant={"h6"}> Details of Proposed
                Shop</Typography>
            </Grid>

            <Grid item={true} sm={12} xs={12} md={12}>
              <Divider component={"div"}/>
            </Grid>

            <Grid item={true} style={{display:selectedFields["name"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.shopName}
                name={"shopName"}
                onBlur={event => this.onBlur("shopName", event.target.value)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("shopName", event.target.value)}
                label={"Name of Proposed Shop"}
              />
            </Grid>
            <Grid item={true} style={{display:selectedFields["trade"]?"block":"none" }} xs={12} sm={12} md={6}>
              <OfficeSelect
                variant={"outlined"}
                margin={"dense"}
                value={this.state.tradeName}
                fullWidth={true}
                name={"trade"}
                required={true}
                error={Boolean(this.state.tradeNameError)}
                helperText={this.state.tradeNameError}
                onBlur={val=>this.onBlur("trade", val)}
                onChange={val=>this.onChange("trade",val)}
                ClearAble={true}
                label={"Name of Trade"}
                options={this.state.trades}/>
            </Grid>

            <Grid item={true} style={{display:selectedFields["address"]?"block":"none" }} xs={12} sm={12} md={6}>
              <AddressField
                textFieldProps={
                  {
                    value: this.state.address,
                    name: "address",
                    placeholder: "Address of Proposed Shop",
                    onBlur: event=>this.onBlur("address",event.target.value),
                    required: true,
                    variant: "outlined",
                    margin: "dense",
                    fullWidth: true,
                    error: Boolean(this.state.addressError),
                    helperText: this.state.addressError,
                    onChange: e => this.onChange("address", e.target.value),
                    label: "Address of Proposed Shop"
                  }
                }

                onPlaceSelect={(place) => {
                  if (place) {
                    let name = place.name;
                    let address = place.formatted_address;
                    let complete_address = address.includes(name) ? address : `${name} ${address}`;
                    this.setState({ address: complete_address });
                  }
                }}/>
            </Grid>

            <Grid item={true} style={{display:selectedFields["localCouncil"]?"block":"none" }} xs={12} sm={12} md={6}>
              <OfficeSelect
                value={this.state.localCouncil}
                label={"Local Council of Proposed Shop"}
                name={"localCouncil"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                helperText={this.state.localCouncilError}
                error={Boolean(this.state.localCouncilError)}
                onBlur={val => this.onBlur("localCouncil", val)}
                onChange={val => this.onChange("localCouncil", val)}
                options={this.state.localCouncils}/>
            </Grid>


            <Grid item={true} style={{display:selectedFields["coordinate"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                onClick={(e) => this.setState({ openMap: true })}
                value={this.state.coordinate}
                name={"coordinate"}
                onBlur={event => this.onBlur("coordinate", event.target.value)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                error={Boolean(this.state.coordinateError)}
                helperText={this.state.coordinateError}
                label={"Location of Proposed Shop"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <IconButton onClick={(e) => this.setState({ openMap: true })}>
                        <PlaceIcon/>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>


            <Grid item={true} style={{display:selectedFields["details"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.businessDetail}
                name={"businessDetail"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("details", event.target.value)}
                label={"Details of business"}
              />
            </Grid>
            <Grid item={true} style={{display:selectedFields["estd"]?"block":"none" }} xs={12} sm={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  fullWidth={true}
                  InputLabelProps={
                    { shrink: true }
                  }
                  label={"Date of Establishment"}
                  error={Boolean(this.state.estdError)}
                  helperText={this.state.estdError}
                  margin="dense"
                  name={"estd"}
                  variant="outlined"
                  value={this.state.estd}
                  onChange={val => this.onChange("estd", val)}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item={true} style={{display:selectedFields["tin_no"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                defaultValue={application["tin_no"]}
                value={this.state.tinNo}
                name={"tinNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("tinNo", event.target.value)}
                label={"TIN No (If Any)"}
              />
            </Grid>
            <Grid item={true} style={{display:selectedFields["cst_no"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.cstNo}
                name={"cstNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("cstNo", event.target.value)}
                label={"CST No (If Any)"}
              />
            </Grid>
            <Grid item={true}  style={{display:selectedFields["pan_no"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.panNo}
                name={"panNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("panNo", event.target.value)}
                label={"PAN No (If Any)"}
              />
            </Grid>
            <GridItem style={{display:selectedFields["gst_no"]?"block":"none" }} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.gstNo}
                name={"gstNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.onChange("gstNo", event.target.value)}
                label={"GST No (If Any)"}
              />
            </GridItem>
            <Grid item={true} style={{display:selectedFields["premise_type"]?"block":"none" }} xs={12} sm={12} md={6}>
              <FormControl fullWidth={true} margin={"dense"}>
                <FormLabel>Whether Premises is Owned or Leased?</FormLabel>
                <RadioGroup
                  name={"premised"}
                  row={true}
                  value={this.state.premised}
                  onChange={event => this.onChange("premised", event.target.value)}
                >
                  <FormControlLabel value={"Owned"} control={<Radio color={"primary"}/>}
                                    label={"Owned"}/>
                  <FormControlLabel value={"Leased"} control={<Radio color={"primary"}/>}
                                    label={"Leased"}/>
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item={true}  xs={12} sm={12} md={12}>
              <Typography className={classes.subTitle} variant={"h6"}>Upload Document(s)</Typography>
            </Grid>

            <Grid item={true} xs={12} sm={12} md={12}>
              <Divider component={"div"}/>
            </Grid>

            {
              Object.entries(selectedDocuments).map(([key,value]) => {
                return <GridItem key={key} className={classes.root} sm={12} xs={12}
                                 md={12}>

                  <FileUpload
                    applicationName={APPLICATION_NAME.SHOP}
                    document={value}
                    onUploadSuccess={(data) => {
                    let temp = {
                      mandatory: value.mandatory,
                      document_id: value.id,
                      name: value.name,
                      path: data.location
                    };
                    this.setState(state => {
                      state.uploadDocuments.push(temp);
                    });
                  }} onUploadFailure={(err) => {
                    console.log(err);
                  }}/>
                </GridItem>;

              })
            }
            <Grid item={true} xs={12} sm={12} md={12}>
              <Typography className={classes.subTitle} variant={"h6"}>Declaration</Typography>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={12}>
              <FormControlLabel
                style={{ whiteSpace: "pre-line", alignItems: "flex-start" }}
                control={
                  <Checkbox style={{ paddingTop: 0 }} color={"primary"}
                            onChange={(val, checked) => this.setState({ agree: checked })}/>
                }
                label={"1. I hereby declare that my premises are not located in unauthorized area or any enroachment on government land and there is " +
                "no unauthorized construction." +
                "\n2. I shall dispose of solid waste of these premises as per AMC, Sanitation and Public Health Regulations 2012." +
                "\n3. I shall follow all rules and regulations of AMC." +
                "\n4. It is certified that the above information is correct to the best of my knowledge." +
                "\n"}/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

ChangeForm.propTypes = {
  application: PropTypes.object.isRequired,
  selectedFields: PropTypes.object.isRequired,
  selectedDocuments: PropTypes.object.isRequired
};

export default withStyles(style)(ChangeForm);