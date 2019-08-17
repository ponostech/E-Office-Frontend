import React, { Component } from "react";
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
import { ShopLicenseViewModel } from "../../model/ShopLicenseViewModel";
import OfficeSelect from "../../../components/OfficeSelect";
import AddressField from "../../../components/AddressField";
import PlaceIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

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
      success: undefined,
      documents: [],
      flaDocuments: [],
      noFlaDocuments: [],
      uploadedDoc: [],
      openMap: false,
      prestine: true,
      openOtp: false,
      otpMessage: "",

      hiddens:[]
    };
  }

  render() {
    const { application } = this.props;
    return (
      <Card>
        <CardContent>
          <Grid spacing={3} container={true}>
            <Grid item={true} md={12} sm={12} xs={12}>
              <Typography variant={"h5"} align="center">FORM-I</Typography>
              <Typography variant={"h5"} align="center">FORM-II</Typography>
              <Typography variant={"h5"} align="center">APPLICATION FOR LICENSE (Except Hotels & Lodgings)</Typography>
              <Typography variant={"subtitle1"} align="center">[See Section 4(a) of the AMC Licensing Regulations,
                2012]</Typography>
            </Grid>

            <GridItem md={12} sm={12} xs={12}>
              <Typography className={classes.subTitle} variant={"h6"}> Details of Applicant</Typography>
            </GridItem>

            <GridItem md={12} sm={12} xs={12}>
              <Divider component={"div"}/>
            </GridItem>

            <Grid item={true}  xs={12} sm={12} md={6}>
              <TextField
                defaultValue={application["name"]}
                value={this.state.name}
                name={"name"}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={event => this.handleChange('name',event.target.value)}
                label={"Name of Applicant"}
                error={Boolean(this.state.nameError)}
                helperText={this.state.nameError}
              />
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.phone}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                name={"phone"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={ShopLicenseViewModel.PHONE}
                error={Boolean(this.state.phoneError)}
                helperText={this.state.phoneError}
              />
            </Grid>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <OfficeSelect
                variant={"outlined"}
                margin={"dense"}
                value={this.state.type}
                required={true}
                fullWidth={true}
                name={"type"}
                error={!!this.state.typeError}
                onBlur={this.handleSelectBlur.bind(this, "type")}
                onChange={this.handleSelect.bind(this, "type")}
                ClearAble={true}
                label={""}
                helperText={this.state.typeError}
                options={this.state.types}/>
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                type={"email"}
                value={this.state.email}
                name={"email"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={ShopLicenseViewModel.EMAIL}
              />

            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <AddressField
                textFieldProps={
                  {
                    value: this.state.ownerAddress,
                    name: "ownerAddress",
                    placeholder: "Owner Address",
                    onBlur: this.handleBlur.bind(this),
                    required: true,
                    variant: "outlined",
                    margin: "dense",
                    fullWidth: true,
                    error: Boolean(this.state.ownerAddressError),
                    helperText: this.state.ownerAddressError,
                    onChange: this.handleChange.bind(this),
                    label: ShopLicenseViewModel.OWNER_ADDRESS
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
            </GridItem>

            <GridItem md={12} sm={12} xs={12}>
              <Typography className={classes.subTitle} variant={"h6"}> Details of Proposed
                Shop</Typography>
            </GridItem>

            <GridItem sm={12} xs={12} md={12}>
              <Divider component={"div"}/>
            </GridItem>

            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.shopName}
                name={"shopName"}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={"Name of Proposed Shop"}
                error={Boolean(this.state.shopNameError)}
                helperText={this.state.shopNameError}
              />
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <OfficeSelect
                variant={"outlined"}
                margin={"dense"}
                value={this.state.tradeName}
                fullWidth={true}
                name={"trade"}
                required={true}
                error={Boolean(this.state.tradeNameError)}
                helperText={this.state.tradeNameError}
                onBlur={this.handleSelectBlur.bind(this, "trade")}
                onChange={this.handleSelect.bind(this, "trade")}
                ClearAble={true}
                label={"Name of Trade"}
                options={this.state.trades}/>
            </GridItem>

            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <AddressField
                textFieldProps={
                  {
                    value: this.state.address,
                    name: "address",
                    placeholder: "Address of Proposed Shop",
                    onBlur: this.handleBlur.bind(this),
                    required: true,
                    variant: "outlined",
                    margin: "dense",
                    fullWidth: true,
                    error: Boolean(this.state.addressError),
                    helperText: this.state.addressError,
                    onChange: this.handleChange.bind(this),
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
            </GridItem>

            <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                onBlur={this.handleSelectBlur.bind(this, "localCouncil")}
                onChange={this.handleSelect.bind(this, "localCouncil")}
                options={this.state.localCouncils}/>
            </GridItem>


            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                onClick={(e) => this.setState({ openMap: true })}
                value={this.state.coordinate}
                name={"coordinate"}
                onBlur={this.handleBlur.bind(this)}
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
            </GridItem>


            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.businessDetail}
                name={"businessDetail"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={"Details of business"}
              />
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                  onChange={this.handleEstdChange}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.tinNo}
                name={"tinNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={"TIN No (If Any)"}
              />
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.cstNo}
                name={"cstNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={"CST No (If Any)"}
              />
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.panNo}
                name={"panNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={"PAN No (If Any)"}
              />
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.gstNo}
                name={"gstNo"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={"GST No (If Any)"}
              />
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={6}>
              <FormControl fullWidth={true} margin={"dense"}>
                <FormLabel>Whether Premises is Owned or Leased?</FormLabel>
                <RadioGroup
                  name={"premised"}
                  row={true}
                  value={this.state.premised}
                  onChange={this.handleRadio.bind(this)}
                >
                  <FormControlLabel value={"Owned"} control={<Radio color={"primary"}/>}
                                    label={"Owned"}/>
                  <FormControlLabel value={"Leased"} control={<Radio color={"primary"}/>}
                                    label={"Leased"}/>
                </RadioGroup>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Typography className={classes.subTitle} variant={"h6"}>Declaration</Typography>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
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
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Divider/>
            </GridItem>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

ChangeForm.propTypes = {
  application: PropTypes.object.isRequired,
  selectedFields: PropTypes.array.isRequired
};

export default ChangeForm;