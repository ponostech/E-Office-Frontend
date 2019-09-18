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
import PropTypes, { number } from "prop-types";
import FileUpload from "../../../components/FileUpload";
import { APPLICATION_NAME } from "../../../utils/Util";
import LoadingView from "../../common/LoadingView";
import { TradeService } from "../../../services/TradeService";
import OfficeFileUpload from "../../../components/OfficeFileUpload";

const style = {
  subTitle: {
    fontSize: 16,
    color: "#727272",
    marginTop: 6,
    marginBottom: 6
  }
};

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
      uploadDocuments: [],

      nameError: "",
      typeError: "",
      addressError: "",
      tradeNameError: "",
      coordinateError: "",
      phoneError: "",
      shopNameError: "",
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
      submit: false

    };
    this.localCouncilService = new LocalCouncilService();
    this.tradeService=new TradeService();

  }

  componentDidMount() {
    var self = this;
    this.setGlobal({ loading: true });
    Promise.all([self.fetchTrades(), self.fetchLocalCouncil()])
      .finally(function() {
        self.setGlobal({ loading: false });
      });
  }

  fetchLocalCouncil = async () => {
    await this.localCouncilService.fetch(errorMsg => this.setGlobal({ errorMsg }),
      localCouncils => this.setState({ localCouncils }));
  };
  fetchTrades = async () => {
    const { type } = this.props;
    await this.tradeService.fetch(type,(errorMsg) => this.setGlobal({ errorMsg })
      , (trades) => this.setState({ trades }));
  };

  render() {
    const {  selectedFields, selectedDocuments,formData,onChange, onUploadDocument,classes } = this.props;
    return (
      <> {this.global.loading ? <LoadingView/> :

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

              <Grid style={{ display: selectedFields["owner"] ? "block" : "none" }} item={true} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.owner}
                  name={"name"}
                  required={true}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("owner", event.target.value)}
                  label={"Name of Applicant"}
                />
              </Grid>
              <Grid style={{ display: selectedFields["phone"] ? "block" : "none" }} item={true} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.phone}
                  required={true}
                  name={"phone"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("phone", event.target.value)}
                  label={"Phone No"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["type"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <OfficeSelect
                  variant={"outlined"}
                  margin={"dense"}
                  value={formData.type}
                  required={true}
                  fullWidth={true}
                  name={"type"}
                  onChange={val => onChange("type", val)}
                  ClearAble={true}
                  label={"Type of Applicant"}
                  options={this.state.types}/>
              </Grid>
              <Grid item={true} style={{ display: selectedFields["email"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  type={"email"}
                  value={formData.email}
                  name={"email"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("email", event.target.value)}
                  label={"Email"}
                />

              </Grid>
              <Grid item={true} style={{ display: selectedFields["owner_address"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <AddressField
                  textFieldProps={
                    {
                      value: formData.owner_address,
                      name: "ownerAddress",
                      placeholder: "Owner Address",
                      variant: "outlined",
                      margin: "dense",
                      fullWidth: true,
                      onChange: e => onChange("owner_address", e.target.value),
                      label: "Address of Applicant"
                    }
                  }
                  onPlaceSelect={(place) => {
                    if (place) {
                      let name = place.name;
                      let address = place.formatted_address;
                      let complete_address = address.includes(name) ? address : `${name} ${address}`;
                      onChange("owner_address",complete_address)
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

              <Grid item={true} style={{ display: selectedFields["name"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.name}
                  name={"shopName"}
                  required={true}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event =>onChange("name", event.target.value)}
                  label={"Name of Proposed Shop"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["trade"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <OfficeSelect
                  variant={"outlined"}
                  margin={"dense"}
                  value={formData.trade}
                  fullWidth={true}
                  name={"trade"}
                  onChange={val => onChange("trade", val)}
                  ClearAble={true}
                  label={"Name of Trade"}
                  options={this.state.trades}/>
              </Grid>

              <Grid item={true} style={{ display: selectedFields["address"] ? "block" : "none" }} xs={12} sm={12}
                    md={6}>
                <AddressField
                  textFieldProps={
                    {
                      value: formData.address,
                      name: "address",
                      placeholder: "Address of Proposed Shop",
                      variant: "outlined",
                      margin: "dense",
                      fullWidth: true,
                      onChange: e => onChange("address", e.target.value),
                      label: "Address of Proposed Shop"
                    }
                  }

                  onPlaceSelect={(place) => {
                    if (place) {
                      let name = place.name;
                      let address = place.formatted_address;
                      let complete_address = address.includes(name) ? address : `${name} ${address}`;
                      onChange("address",complete_address)
                    }
                  }}/>
              </Grid>

              <Grid item={true} style={{ display: selectedFields["local_council"] ? "block" : "none" }} xs={12} sm={12}
                    md={6}>
                <OfficeSelect
                  value={formData.local_council}
                  label={"Local Council of Proposed Hotel"}
                  name={"localCouncil"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={val =>onChange("local_council", val)}
                  options={this.state.localCouncils}/>
              </Grid>

              <Grid item={true} style={{ display: selectedFields["coordinate"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  onClick={(e) => this.setState({ openMap: true })}
                  value={formData.coordinate}
                  name={"coordinate"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
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


              <Grid item={true} style={{ display: selectedFields["details"] ? "block" : "none" }} xs={12} sm={12}
                    md={6}>
                <TextField
                  value={formData.details}
                  name={"businessDetail"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("details", event.target.value)}
                  label={"Details of business"}
                />
              </Grid>

              <Grid item={true} style={{ display: selectedFields["ac_rooms"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  type={"number"}
                  defaultValue={0}
                  value={formData.ac_rooms}
                  name={"acRooms"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("ac_rooms", event.target.value)}
                  label={"No of AC Room"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["non_ac_rooms"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  type={"number"}
                  value={formData.non_ac_rooms}
                  name={"nonAcRooms"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("non_ac_rooms", event.target.value)}
                  label={"No of Non AC Room"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["conference_halls"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  type={"number"}
                  value={formData.conference_halls}
                  name={"conferenceHall"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("conference_halls", event.target.value)}
                  label={"No of Conference Hall"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["banquet_halls"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  type={"number"}
                  value={formData.banquet_halls}
                  name={"banquet_halls"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("banquet_halls", event.target.value)}
                  label={"No of Banquet Hall"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["other_facilities"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.other_facilities}
                  name={"banquet_halls"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("other_facilities", event.target.value)}
                  label={"Other Facilities"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["estd"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    fullWidth={true}
                    InputLabelProps={
                      { shrink: true }
                    }
                    label={"Date of Establishment"}
                    margin="dense"
                    name={"estd"}
                    variant="outlined"
                    value={formData.estd}
                    onChange={val => onChange("estd", val)}
                    format={"dd/MM/yyyy"}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item={true} style={{ display: selectedFields["tin_no"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.tin_no}
                  name={"tinNo"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("tin_no", event.target.value)}
                  label={"TIN No (If Any)"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["cst_no"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.cst_no}
                  name={"cstNo"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("cst_no", event.target.value)}
                  label={"CST No (If Any)"}
                />
              </Grid>
              <Grid item={true} style={{ display: selectedFields["pan_no"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.pan_no}
                  name={"panNo"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("pan_no", event.target.value)}
                  label={"PAN No (If Any)"}
                />
              </Grid>
              <GridItem style={{ display: selectedFields["gst_no"] ? "block" : "none" }} xs={12} sm={12} md={6}>
                <TextField
                  value={formData.gst_no}
                  name={"gstNo"}
                  variant={"outlined"}
                  margin={"dense"}
                  fullWidth={true}
                  onChange={event => onChange("gst_no", event.target.value)}
                  label={"GST No (If Any)"}
                />
              </GridItem>
              <Grid item={true} style={{ display: selectedFields["premise_type"] ? "block" : "none" }} xs={12} sm={12}
                    md={6}>
                <FormControl fullWidth={true} margin={"dense"}>
                  <FormLabel>Whether Premises is Owned or Leased?</FormLabel>
                  <RadioGroup
                    name={"premised"}
                    row={true}
                    value={formData.premise_type}
                    onChange={event => onChange("premise_type", event.target.value)}
                  >
                    <FormControlLabel value={"Owned"} control={<Radio color={"primary"}/>}
                                      label={"Owned"}/>
                    <FormControlLabel value={"Leased"} control={<Radio color={"primary"}/>}
                                      label={"Leased"}/>
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item={true} style={{display:selectedFields["passport"]?"block":"none"}} xs={12} sm={12} md={6}>
               { formData.passport &&  <OfficeFileUpload applicationName={APPLICATION_NAME.HOTEL}
                                  document={formData.passport}
                                  onUploadSuccess={(data) => {
                                    let temp={
                                      name:"passport",
                                      location:data.location
                                    }
                                    onChange('passport',temp)
                                  }} onUploadFailure={(err) => {
                  console.log(err);
                }}/>}
              </Grid>
              <Grid item={true} xs={12} sm={12} md={12}>
                <Typography className={classes.subTitle} variant={"h6"}>Upload Document(s)</Typography>
              </Grid>

              <Grid item={true} xs={12} sm={12} md={12}>
                <Divider component={"div"}/>
              </Grid>

              {
                Object.entries(selectedDocuments).map(([key, value]) => {
                  return <Grid item={true} key={key} className={classes.root} sm={12} xs={12}
                               md={12}>

                    <FileUpload
                      applicationName={APPLICATION_NAME.HOTEL}
                      document={value}
                      onUploadSuccess={(data) => {
                        let temp = {
                          mandatory: value.mandatory,
                          document_id: value.id,
                          name: value.name,
                          path: data.location
                        };
                        onUploadDocument(temp)
                      }} onUploadFailure={(err) => {
                      console.log(err);
                    }}/>
                  </Grid>;

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
      }
      </>
    );
  }
}

ChangeForm.propTypes = {
  selectedFields: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  selectedDocuments: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onUploadDocument: PropTypes.func.isRequired,
};

export default withStyles(style)(ChangeForm);