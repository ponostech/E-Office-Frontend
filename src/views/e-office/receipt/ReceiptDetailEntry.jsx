import React, {Component} from "react";
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@material-ui/core";
import ReceiptViewModel from "../../model/ReceiptViewModel";
import {Validators} from "../../../utils/Validators";
import axios from "axios";
import {ApiRoutes} from "../../../config/ApiRoutes";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import SubmitDialog from "../../../components/SubmitDialog";
import FileUpload from "../../../components/FileUpload";
import {DocumentService} from "../../../services/DocumentService";
import Grid from "@material-ui/core/Grid";

class ReceiptDetailEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receive_date: "",
            letter_date: "",
            subject: "",
            delivery_mode: "",
            type: "Individual",
            sender_address: "",
            signature: null,
            agree: false,
            nameError: "",
            languageError: "",
            language: "",
            passwordError: "",
            subjectError: "",
            phoneError: "",
            confirmPasswordError: "",
            addressError: "",
            types: ["Individual", "Firm", "Group(NGO)"],
            success: false,
            error: false,
            //dialog variable
            submit: false,
            errorMessage: "",

            prestine: true,
            documents: []
        };

        this.documentService = new DocumentService();
    }

    componentDidMount() {

        this.documentService.get("advertiser")
            .then(res => {
                if (res.status) {
                    const {documents} = res.data;
                    this.setState({documents});
                }
            })
            .catch(err => {
                this.setState({errorMessage: err.toString()});
            });

    }

    handleClickShowPassword = (e) => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    isInvalid = () => {
        return this.state.prestine || !!this.state.languageError || !!this.state.subjectError || !!this.state.addressError || !!this.state.emailError
            || !!this.state.emailError || !!this.state.passwordError;
    };


    handleClick = (e) => {
        const {name} = e.target;
        let data = {
            name: this.state.name,
            subject: this.state.subject,
            delivery_date: this.state.delivery_date,
            letter_date: this.state.letter_date,
            sender_address: this.state.sender_address,
            delivery_mode: this.state.delivery_mode,
            type: this.state.type,
            language: this.state.language,
            category: this.state.category,
            dealing_hand: this.state.dealing_hand,
            letter_ref_no: this.state.letter_ref_no,
            phone_no: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            registered: 0,
            signature: [],
            documents: []
        };
        //check validity of data
        if (this.isInvalid()) {
            this.setState({errorMessage: "There is an error"});
            return;
        }
        //show submit dialog
        this.setState({submit: true});
        switch (name) {
            case "submit":
                axios.post(ApiRoutes.CREATE_ADVERTISER, data)
                    .then(res => {
                        console.log(res);
                        if (res.data.status) {
                            this.setState({
                                success: true
                            });
                        } else {
                            console.log(res.data.messages);
                            this.setState({errorMessage: res.data.messages.toString()});
                        }

                    })
                    .catch(err => {
                        this.setState({errorMessage: err.toString()});
                    })
                    .then(() => {
                        this.setState({submit: false});
                    });
                break;
            case "cancel":
                this.setState({
                    name: "",
                    type: "Individual",
                    receive_date: "",
                    letter_date: "",
                    subject: "",
                    delivery_mode: "",
                    sender_address: "",
                    language: "",
                    category: "",
                    dealing_hand: "",
                    agree: false,
                    showPassword: false
                });
                break;
            default:
                break;
        }
    };

    handleRequired = (e) => {
        const {name, value} = e.target;
        switch (name) {
            case "name":
                value.length === 0 ? this.setState({nameError: ReceiptViewModel.REQUIRED_NAME}) : this.setState({nameError: ""});
                break;
            case "subject":
                value.length === 0 ? this.setState({subjectError: ReceiptViewModel.REQUIRED_SUBJECT}) : this.setState({subjectError: ""});
                break;
            case "language":
                if (value.length === 0) {
                    this.setState({emailError: ReceiptViewModel.REQUIRED_EMAIL});
                }
                break;
            case "password":
                if (value.length === 0) {
                    this.setState({passwordError: ReceiptViewModel.REQUIRED_PASSWORD});
                }
                break;
            case "confirmPassword":
                if (value.length === 0) {
                    this.setState({confirmPasswordError: ReceiptViewModel.REQUIRED_CONFIRM_PASSWORD});
                }
                break;
            case "phone":
                if (value.length === 0) {
                    this.setState({phoneError: ReceiptViewModel.REQUIRED_PHONE});
                }
                break;
            case "address":
                value.length === 0 ? this.setState({addressError: ReceiptViewModel.REQUIRED_ADDRESS}) : this.setState({addressError: ""});
                break;
            default:
                break;
        }
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({
            [e.target.name]: e.target.value
        });

        switch (name) {
            case "email":
                !Validators.EMAIL_REGEX.test(value) ? this.setState({emailError: ReceiptViewModel.INVALID_EMAIL}) :
                    this.setState({emailError: ""});
                break;
            case "password":
                value.length < 7 ? this.setState({passwordError: ReceiptViewModel.MIN_PASSWORD}) : this.setState({passwordError: ""});
                break;
            case "confirmPassword":
                value !== this.state.password ? this.setState({confirmPasswordError: ReceiptViewModel.MATCH_PASSWORD}) : this.setState({confirmPasswordError: ""});
                break;
            case "phone":
                !Validators.PHONE_REGEX.test(this.state.phone) ? this.setState({phoneError: ReceiptViewModel.PHONE_ERROR}) : this.setState({phoneError: ""});
                break;
            default:
                break;
        }

        this.setState({prestine: false});

    };
    openDialog = () => {
        this.setState({openDialog: true});
    };

    render() {
        return (
            <Grid container direction="row-reverse" justify="center" alignItems="flex-start">
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Receipt Details" subheader="* are mandatory">

                        </CardHeader>
                        <CardContent>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Divider style={{marginBottom: 10}}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        value={this.state.subject}
                                        error={Boolean(this.state.subjectError)}
                                        helperText={this.state.subjectError}
                                        name={"subject"}
                                        margin={"dense"}
                                        required={true}
                                        fullWidth={true}
                                        variant={"outlined"}
                                        label={ReceiptViewModel.SUBJECT}
                                        onBlur={this.handleRequired.bind(this)}
                                        onChange={this.handleChange.bind(this)}
                                        placeholder={"Subject"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField name={"receive_date"}
                                               value={this.state.receive_date}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               required={true}
                                               onBlur={this.handleRequired.bind(this)}
                                               fullWidth={true}
                                               onChange={this.handleChange.bind(this)}
                                               type={"date"}
                                               InputLabelProps={
                                                   {shrink: true}
                                               }
                                               label={ReceiptViewModel.RECEIVE_DATE}
                                               error={Boolean(this.state.estdError)}
                                               helperText={this.state.estdError}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField name={"letter_date"}
                                               value={this.state.receive_date}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               required={true}
                                               onBlur={this.handleRequired.bind(this)}
                                               fullWidth={true}
                                               onChange={this.handleChange.bind(this)}
                                               type={"date"}
                                               InputLabelProps={
                                                   {shrink: true}
                                               }
                                               label={ReceiptViewModel.LETTER_DATE}
                                               error={Boolean(this.state.estdError)}
                                               helperText={this.state.estdError}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FormControl
                                        required={true}
                                        margin={"dense"}
                                        fullWidth={true}
                                        variant={"outlined"}
                                    >
                                        <InputLabel htmlFor={"type"}>{ReceiptViewModel.DELIVERY_MODE}</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.handleChange.bind(this)}
                                            input={
                                                <OutlinedInput required={true}
                                                               labelWidth={140} name={"type"} id={"type"}/>
                                            }

                                        >
                                            {this.state.types.map((val, i) => (
                                                <MenuItem key={i} value={val}>
                                                    {val}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        value={this.state.name}
                                        error={Boolean(this.state.nameError)}
                                        helperText={this.state.nameError}
                                        name={"name"}
                                        margin={"dense"}
                                        required={true}
                                        fullWidth={true}
                                        variant={"outlined"}
                                        label={ReceiptViewModel.LANGUAGE}
                                        onBlur={this.handleRequired.bind(this)}
                                        onChange={this.handleChange.bind(this)}
                                        placeholder={"Fullname"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FormControl
                                        required={true}
                                        margin={"dense"}
                                        fullWidth={true}
                                        variant={"outlined"}
                                    >
                                        <InputLabel htmlFor={"type"}>{ReceiptViewModel.TYPE}</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.handleChange.bind(this)}
                                            input={
                                                <OutlinedInput required={true}
                                                               labelWidth={140} name={"type"} id={"type"}/>
                                            }

                                        >
                                            {this.state.types.map((val, i) => (
                                                <MenuItem key={i} value={val}>
                                                    {val}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        value={this.state.letter_ref_no}
                                        error={Boolean(this.state.nameError)}
                                        helperText={this.state.nameError}
                                        name={"letter_ref_no"}
                                        margin={"dense"}
                                        fullWidth={true}
                                        variant={"outlined"}
                                        label={ReceiptViewModel.REF_NO}
                                        onBlur={this.handleRequired.bind(this)}
                                        onChange={this.handleChange.bind(this)}
                                        placeholder={"Letter reference no"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormControl
                                        required={true}
                                        margin={"dense"}
                                        fullWidth={true}
                                        variant={"outlined"}
                                    >
                                        <InputLabel htmlFor={"type"}>{ReceiptViewModel.CATEGORY}</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.handleChange.bind(this)}
                                            input={
                                                <OutlinedInput required={true}
                                                               labelWidth={140} name={"type"} id={"type"}/>
                                            }

                                        >
                                            {this.state.types.map((val, i) => (
                                                <MenuItem key={i} value={val}>
                                                    {val}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormControl
                                        required={true}
                                        margin={"dense"}
                                        fullWidth={true}
                                        variant={"outlined"}
                                    >
                                        <InputLabel htmlFor={"type"}>{ReceiptViewModel.DEALING_HAND}</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.handleChange.bind(this)}
                                            input={
                                                <OutlinedInput required={true}
                                                               labelWidth={140} name={"type"} id={"type"}/>
                                            }

                                        >
                                            {this.state.types.map((val, i) => (
                                                <MenuItem key={i} value={val}>
                                                    {val}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        value={this.state.address}
                                        error={Boolean(this.state.addressError)}
                                        helperText={this.state.addressError}
                                        multiline={true}
                                        rows={3}
                                        name={"sender_address"}
                                        margin={"dense"}
                                        required={true}
                                        fullWidth={true}
                                        variant={"outlined"}
                                        label={ReceiptViewModel.ADDRESS}
                                        onBlur={this.handleRequired.bind(this)}
                                        onChange={this.handleChange.bind(this)}
                                        placeholder={" hno \n locality \n pincode"}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    {this.state.documents.map((doc, index) =>
                                        <FileUpload key={index} document={doc}
                                                    onUploadSuccess={(data) => {
                                                        console.log(data);
                                                    }}
                                                    onUploadFailure={(err) => console.log(err)}/>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormControlLabel control={
                                        <Checkbox color={"primary"}
                                                  onChange={(val, checked) => this.setState({agree: checked})}/>
                                    }
                                                      label={"I hereby pledge that i will abide the AMC Display of Advertisement and Hoarding Regulations 2013," +
                                                      " with specific reference of Regulation 7, Regulation 28 and Regulation 32, failing which i would be liable to get my registration / License cancelled"}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Divider style={{marginTop: 10}}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container justify={"flex-end"}>
                                <Grid item>
                                    <Button style={{margin:6}} name="submit" disabled={!this.state.agree}
                                            onClick={this.handleClick.bind(this)}
                                            variant="contained" color="primary">Submit</Button>
                                    <Button style={{margin:6}} name="cancel" onClick={this.handleClick.bind(this)} variant="contained"
                                            color="secondary">Reset</Button>
                                    <br/>
                                    <br/>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
                <OfficeSnackbar variant={"success"} open={this.state.success}
                                onClose={(e) => this.setState({success: ""})}
                                message={"Your application is submitted"}/>
                <OfficeSnackbar variant={"error"} open={!!this.state.errorMessage}
                                onClose={(e) => this.setState({errorMessage: ""})}
                                message={this.state.errorMessage}/>
                <SubmitDialog open={this.state.submit} text={"Your application is submitting ... "}/>
            </Grid>
        );
    }
}

export default ReceiptDetailEntry;