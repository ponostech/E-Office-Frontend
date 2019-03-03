import React, {Component} from "react";
import Datetime from 'react-datetime';

import {FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, withStyles} from "@material-ui/core";
import {ShopLicenseFormModel} from "../model/ShopLicenseFormModel";
import moment from "moment";
// @material ui icons
import {
    Business,
    CreditCard,
    Email,
    Face,
    LocationOn,
    MailOutline,
    MyLocation,
    Shop,
    Smartphone
} from "@material-ui/icons";
// theme core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardIcon from "../../components/Card/CardIcon";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button.jsx";

import styles from "../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class ShopLicenseApplicationForm extends Component {
    state = {
        formValues: {
            name: "",
            shopName: "",
            tradeName: "",
            applicantType: "",
            shopLocation: "",
            ownership: "",
            mobileNo: "",
            email: "",
            tinNo: "",
            cstNo: "",
            panNo: "",
            businessDetail: "",
            establishmentDate: "",
            address: "",
            localCouncil: 0,
            latitude: 0,
            longitude: 0,
            attachments: []
        },
        localCouncils: ["one", "two", "three"],
        ownerships: [
            {value: "proprietor", label: "Proprietor"},
            {value: "partnership", label: "Partnership"},
            {value: "private-ltd", label: "Private Limited"}
        ],
        openDialog: false
    };

    componentDidMount = () => {
        const {history} = this.props;
        if (this.state.fakeAuth) {
            history.back();
        } else {
            this.setState({
                displayTypes: ["one", "two", "three"]
            });
        }
    };

    handleChange = name => (event) => {
        this.setState({
            formValues: {
                ...this.state.formValues,
                [name]: event.target.value
            }
        });
        console.log(this.state);
    };

    handleSelect = (selectedValue) => {
        this.setState({selectedValue});
    };

    submitForm = (e) => {
        if (this.validate()) {

        }
    };
    handleRadio = (e) => {
        this.setState({
            premiseType: e.target.value
        });
    };
    handleDocumentClose = (documents = []) => {
        this.setState({
            openDialog: false
        });
        if (documents) {
            this.setState({
                attachments: documents
            });
        }
    };
    validate = () => {
        if (this.state.doeError === "") {
            this.setState({doeError: ShopLicenseFormModel.DOE_REQUIRED});
            return false;
        }

        let doe = moment(this.state.do);
        let today = moment.now();
        if (doe > today) {
            this.setState({doeError: ShopLicenseFormModel.DOE_FUTURE_ERROR});
            return;
        }
        this.setState({
            nameError: "",
            addressError: "",
            doeError: ""
        });
        return true;
    };

    render() {
        const {classes, ownership} = this.props;

        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={10} sm={10} md={10}>
                        <Paper>
                            <form>
                                <Card>
                                    <CardHeader color="rose" icon>
                                        <CardIcon color="rose">
                                            <MailOutline/>
                                        </CardIcon>
                                        <h4 className={classes.cardIconTitle}>Shop License Application Form</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="Name of Applicant..."
                                                    name="name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('name'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Face className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="Name of Shop..."
                                                    name="shopName"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('shopName'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Shop className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="Name of Trade..."
                                                    name="tradeName"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('tradeName')
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    className={classes.selectFormControl}
                                                >
                                                    <InputLabel
                                                        className={classes.labelRoot}
                                                        htmlFor='applicantType'>
                                                        Choose Applicant Type
                                                    </InputLabel>
                                                    <Select
                                                        MenuProps={{
                                                            className: classes.selectMenu
                                                        }}
                                                        classes={{
                                                            select: classes.select
                                                        }}
                                                        value={this.state.formValues.applicantType}
                                                        onChange={this.handleChange("applicantType")}
                                                        inputProps={{
                                                            name: "applicantType",
                                                            id: "simple-select"
                                                        }}
                                                    >
                                                        <MenuItem
                                                            disabled
                                                            classes={{
                                                                root: classes.selectMenuItem
                                                            }}
                                                        >
                                                            Choose Applicant Type
                                                        </MenuItem>
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value="proprietor"
                                                        >
                                                            Proprietor
                                                        </MenuItem>
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value="partnership"
                                                        >
                                                            Partnership
                                                        </MenuItem>
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value="private-limited"
                                                        >
                                                            Private Limited
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="Residential Address"
                                                    name="address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5,
                                                        onChange: this.handleChange('address'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <LocationOn className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="Location of Shops"
                                                    name="shopLocation"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5,
                                                        onChange: this.handleChange('shopLocation'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <MyLocation className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="Mobile No."
                                                    name="mobileNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('mobileNo'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Smartphone className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    success={this.state.emailState === "success"}
                                                    error={this.state.emailState === "error"}
                                                    labelText="Email Address *"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('email'),
                                                        type: "email",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Email className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="Tin No. (if any)"
                                                    name="tinNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('tinNo'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <CreditCard className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="CST No. (if any)"
                                                    name="cstNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('cstNo'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <CreditCard className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <CustomInput
                                                    labelText="PAN No."
                                                    name="panNo"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('panNo'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <CreditCard className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem md={6} xs={12}>
                                                <FormControl>
                                                    <Datetime
                                                        timeFormat={false}
                                                        inputProps={{
                                                            onChange: this.handleChange('establishmentDate'),
                                                            placeholder: "Date of Establishment"
                                                        }}
                                                    />
                                                </FormControl>
                                            </GridItem>
                                            <GridItem md={12} xs={12}>
                                                <CustomInput
                                                    labelText="Details of Business"
                                                    name="businessDetail"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: this.handleChange('businessDetail'),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Business className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        ),
                                                        multiline: true,
                                                        rows: 5
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="rose" round>Submit Application</Button>
                                        <br/>
                                    </CardFooter>
                                </Card>
                            </form>
                        </Paper>
                    </GridItem>
                </GridContainer>
                {/*<GridContainer justify={"center"}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader title={"Shop License Application Form"}/>
                            <CardContent>
                                <TextField name={"name"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Name of Applicant"}/>
                                <TextField name={"shopName"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Name of Shop or Firm"}/>
                                <TextField name={"tradeName"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Name of trade"}/>
                                <TextField name={"location"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Location"}/>
                                <OfficeSelect value={ownership}
                                              defaultValue={this.state.ownership[0]}
                                              name={"ownership"}
                                              placeholder={ShopLicenseFormModel.Ownership}
                                              onChange={this.handleSelect.bind(this)}
                                              searchAble={true}
                                              ClearAble={true}
                                              label={ShopLicenseFormModel.Ownership}
                                              options={this.state.ownerships}/>
                                <TextField
                                           multiline={true}
                                           rows={3}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Residential Address"}/>
                                <TextField name={"mobileNo"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Phone No."}/>
                                <TextField name={"mobileNo"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Mobile No."}/>
                                <TextField name={"email"}
                                           type={"email"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"E-mail"}/>
                                <TextField name={"tinNo"}
                                           required={false}
                                           variant={"outlined"}
                                           label={"Tin No (If any)"}
                                           fullWidth={true}
                                           margin={"dense"}/>
                                <TextField name={"cstNo"}
                                           required={false}
                                           variant={"outlined"}
                                           label={"CST No (If any)"}
                                           fullWidth={true}
                                           margin={"dense"}/>
                                <TextField name={"panNo"}
                                           required={false}
                                           variant={"outlined"}
                                           label={"PAN No (If any)"}
                                           fullWidth={true}
                                           margin={"dense"}/>
                                <FormControl variant={"outlined"} fullWidth={true} margin={"dense"}>
                                    <InputLabel htmlFor="lc">Local Council</InputLabel>
                                    <Select
                                        value={this.state.localCouncil}
                                        onChange={this.handleChange.bind(this)}
                                        input={
                                            <OutlinedInput labelWidth={100} name={"localCouncil"} id={"lc"}/>}
                                    >
                                        {this.state.localCouncils.map((item, i) => <MenuItem key={i}
                                                                                             value={item}> {item}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormGroup row={true}>
                                    <TextField disabled={true} name={"lat"}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               label={"latitude"}
                                               required={true}/>
                                    <TextField style={{marginLeft: 20}}
                                               disabled={true}
                                               name={"long"}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               label={"Longitude"}
                                               required={true}/>
                                    <IconButton>
                                        <MapIcon/>
                                    </IconButton>
                                </FormGroup>

                                <FormControl fullWidth={true} margin={"dense"}>
                                    <FormLabel>Whether premises owned or leased?</FormLabel>
                                    <RadioGroup
                                        name={"premiseType"}
                                        row={true}
                                        value={this.state.premiseType}
                                        onChange={this.handleRadio.bind(this)}
                                    >

                                        <FormControlLabel value={"owned"} control={<Radio/>} label={"Owned"}/>
                                        <FormControlLabel value={"leased"} control={<Radio/>} label={"Leased"}/>
                                    </RadioGroup>
                                </FormControl>
                                <TextField name={"businessDetail"}
                                           margin={"dense"}
                                           fullWidth={true}
                                           variant={"outlined"}
                                           onChange={this.handleChange.bind(this)}
                                           label={"Details of Business"}/>
                                <TextField name={"doe"}
                                           variant={"outlined"}
                                           margin={"dense"}
                                           required={true}
                                           fullWidth={true}
                                           onChange={this.handleChange.bind(this)}
                                           type={"date"}
                                           InputLabelProps={{shrink: true}}
                                           label={ShopLicenseFormModel.DOE}
                                           error={Boolean(this.state.doeError)}
                                           helperText={this.state.doeError}
                                />
                                <Button variant={"outlined"} onClick={() => this.setState({openDialog: true})}>
                                    Document attachment
                                </Button>
                                <Divider/>

                                <DocumentsDropzone documents={[
                                    {name: "Signature of the applicant", fileName: "signature"},
                                    {
                                        name: "NOC from the house or land owner where business is intended to be run",
                                        fileName: "noc-landowner"
                                    },
                                    {
                                        name: "NOC from Local Council where business is intended to be run",
                                        fileName: "noc-local-council"
                                    },
                                    {name: "EPIC", fileName: "epic"},
                                    {
                                        name: "Residential Certificate (From D.C. Office)",
                                        fileName: "residential-certificate"
                                    },
                                    {
                                        name: "License/Registration Certificate from Food Licensing Authority",
                                        fileName: "certificate-fla"
                                    },
                                    {name: "Tribal Certificate", fileName: "tribal-certificate"}
                                ]}
                                                   openDialog={this.state.openDialog}
                                                   onCloseHandler={this.handleDocumentClose.bind(this)}
                                                   acceptedFiles={Constraint.ACCEPTED_IMAGES + " " + Constraint.ACCEPTED_DOCUMENTS}/>

                            </CardContent>
                            <CardActions>
                                <Button color={"primary"} variant={"outlined"} onClick={this.submitForm.bind(this)}> Submit
                                    Application</Button>
                                <Button color={"secondary"} variant={"outlined"}
                                        onClick={this.clearForm.bind(this)}> Reset</Button>
                            </CardActions>
                        </Card>
                    </GridItem>
                </GridContainer>*/}

            </div>
        );
    }
}

export default withStyles(styles)(ShopLicenseApplicationForm);