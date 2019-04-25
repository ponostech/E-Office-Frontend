import React, {Component} from "react";
import {Button, Card, CardActions, CardHeader, Divider, TextField} from "@material-ui/core";
import TradeViewModel from "../../model/TradeViewModel";
import axios from "axios";
import {ApiRoutes} from "../../../config/ApiRoutes";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import SubmitDialog from "../../../components/SubmitDialog";
import {DocumentService} from "../../../services/DocumentService";
import Grid from "@material-ui/core/Grid";
import OfficeSelect from "../../../components/OfficeSelect";
import GridItem from "../../../components/Grid/GridItem";
import withStyles from "@material-ui/core/es/styles/withStyles";

class NewTrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rate: "",
            fla: "",
            flas: ["No", "Yes"],
            success: false,
            error: false,

            //dialog variable
            submit: false,
            errorMessage: "",
            prestine: true,
            flas: [
                {value: "No", label: "No"},
                {value: "Yes", label: "Yes"},
            ],
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

    isInvalid = () => {
        return this.state.prestine || !!this.state.nameError || !!this.state.rateError || !!this.state.flaError;
    };


    handleClick = (e) => {
        const {name} = e.target;
        let data = {
            name: this.state.name,
            rate: this.state.rate,
            fla: this.state.fla,
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
                    rate: "",
                    type: "",
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
                value.length === 0 ? this.setState({nameError: TradeViewModel.REQUIRED_NAME}) : this.setState({nameError: ""});
                break;
            case "rate":
                value.length === 0 ? this.setState({rateError: TradeViewModel.REQUIRED_SUBJECT}) : this.setState({tradeError: ""});
                break;
            case "fla":
                if (value.length === 0) {
                    this.setState({flaError: TradeViewModel.REQUIRED_FLA});
                }
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

            case "name":
                value.length < 0 ? this.setState({nameError: TradeViewModel.REQUIRED_NAME}) : this.setState({nameError: ""});
                break;
            case "rate":
                value.length < 0 ? this.setState({nameError: TradeViewModel.REQUIRED_NAME}) : this.setState({nameError: ""});
                break;
            case "fla":
                value.length < 0 ? this.setState({nameError: TradeViewModel.REQUIRED_NAME}) : this.setState({nameError: ""});
                break;

            default:
                break;
        }

        this.setState({prestine: false});

    };
    openDialog = () => {
        this.setState({openDialog: true});
    };
    handleSelect = (identifier, value) => {
        switch (identifier) {
            case "fla":
                this.setState({type: value});
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <Grid container direction="row-reverse" justify="center" alignItems="flex-start">
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="New Trade Entry Form" subheader="* are mandatory">

                        </CardHeader>
                    </Card>
                </Grid>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider style={{marginBottom: 10}}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            value={this.state.name}
                            error={Boolean(this.state.nameError)}
                            helperText={this.state.nameError}
                            name={"name"}
                            margin={"dense"}
                            required={true}
                            fullWidth={true}
                            variant={"outlined"}
                            label={"Name of Trade"}
                            onBlur={this.handleRequired.bind(this)}
                            onChange={this.handleChange.bind(this)}
                            placeholder={"Name of Trade"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            value={this.state.rate}
                            error={Boolean(this.state.rateError)}
                            helperText={this.state.rateError}
                            name={"rate"}
                            margin={"dense"}
                            required={true}
                            fullWidth={true}
                            variant={"outlined"}
                            label={"Rate"}
                            onBlur={this.handleRequired.bind(this)}
                            onChange={this.handleChange.bind(this)}
                            placeholder={"Rate"}
                        />
                    </Grid>
                    <GridItem xs={12} sm={12} md={12}>
                        <OfficeSelect
                            variant={"outlined"}
                            margin={"dense"}
                            value={this.state.fla}
                            required={true}
                            fullWidth={true}
                            name={"fla"}
                            error={!!this.state.typeError}
                            onBlur={this.handleSelectBlur.bind(this, "fla")}
                            onChange={this.handleSelect.bind(this, "fla")}
                            ClearAble={true}
                            label={TradeViewModel.FLA_TYPE}
                            helperText={this.state.flaError}
                            options={this.state.fla}/>
                    </GridItem>
                    <CardActions>
                        <Grid container justify={"flex-end"}>
                            <Grid item>
                                <Button style={{margin: 6}} name="submit" disabled={!this.state.agree}
                                        onClick={this.handleClick.bind(this)}
                                        variant="contained" color="primary">Submit</Button>
                                <Button style={{margin: 6}} name="cancel" onClick={this.handleClick.bind(this)}
                                        variant="contained"
                                        color="secondary">Reset</Button>
                                <br/>
                                <br/>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Grid>
                <OfficeSnackbar variant={"success"} open={this.state.success}
                                onClose={(e) => this.setState({success: ""})}
                                message={"New Trade is submitted"}/>
                <OfficeSnackbar variant={"error"} open={!!this.state.errorMessage}
                                onClose={(e) => this.setState({errorMessage: ""})}
                                message={this.state.errorMessage}/>
                <SubmitDialog open={this.state.submit} text={"New Trade is submitting ... "}/>
            </Grid>
        );
    }
}

export default withStyles(NewTrade);