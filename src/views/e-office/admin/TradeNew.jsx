import React, { Component } from "react";
import { Button, CardHeader, Divider, TextField, Typography } from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import OfficeSelect from "../../../components/OfficeSelect";
import SubmitDialog from "../../../components/SubmitDialog";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { TradeService } from "../../../services/TradeService";
import { TradeViewModel } from "../../model/TradeViewModel";

const style = {
    item: {
        padding: "10px 15px !important"
    }
};

class TradeNew extends Component {
    tradeService = new TradeService();
    state = {
        name: "",
        rate: "",
        fla: "",
        nameError: "",
        rateError: "",
        flaError: "",
        errorMessage: "",
        successMessage: "",
        prestine: true,
        submit: false,
        flas: [
            { value: 0, label: "No" },
            { value: 1, label: "Yes" },

        ],
    };

    componentDidMount() {


    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        switch (name) {
            case "name":
                value !== this.state.name ? this.setState({ nameError: TradeViewModel.REQUIRED_NAME }) : this.setState({ nameError: "" });
                break;
            case "rate":
                value !== this.state.rate ? this.setState({ rateError: TradeViewModel.REQUIRED_RATE }) : this.setState({ rateError: "" });
                break;
            case "fla":
                this.state.fla ? this.setState({ flaError: "" }) : this.setState({ flaError: TradeViewModel.REQUIRED_FLA });
                break;

        }
        this.setState({ prestine: false });
    };

    handleSelect = (identifier, value) => {
        switch (identifier) {
            case "fla":
                this.setState({ fla: value });
                break;
            default:
                break;
        }
    };

    handleClear = () => {
        window.location.reload();
    };

    handleSave = (e) => {
        const invalid = Boolean(this.state.nameError) || Boolean(this.state.rateError) || Boolean(this.state.flaError)
          || this.state.prestine;

        if (invalid) {
            this.setState({ errorMessage: "Please fill all the required field" });
            return;
        }
        this.setState({ submit: true });
        this.tradeService.create(this.state, (errorMessage) => this.setState({ errorMessage }), (successMessage) => this.setState({ successMessage }))
          .finally(() => this.setState({ submit: false }));
    };

    handleBlur = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                value.length === 0 ? this.setState({ nameError: TradeViewModel.REQUIRED_NAME }) : this.setState({ nameError: "" });
                break;
            case "rate":
                value.length === 0 ? this.setState({ rateError: TradeViewModel.REQUIRED_RATE }) : this.setState({ rateError: "" });
                break;
            case "fla":
                value.length === 0 ? this.setState({ rateError: TradeViewModel.REQUIRED_FLA }) : this.setState({ flaError: "" });
                break;
            default:
                break;
        }
    };

    handleSelectBlur = (identifier, e) => {
        switch (identifier) {
            case "fla":
                this.state.fla === undefined ? this.setState({ flaError: "Please Select Whether FLA is Required or Not" }) : this.setState({ flaError: "" });
                break;
            default:
                break;
        }
    };

    render() {
        const { classes } = this.props;

        return (
          <GridContainer justify="flex-start">
              <GridItem xs={12} sm={12} md={10}>
                  <GridContainer>
                      <CardHeader title={"New Trade Entry"} subheader={"Star marks are mandatory"}/>
                      <GridItem className={classes.item} xs={12} sm={12} md={12}>
                          <Divider/>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={7}>
                          <TextField
                            name={"name"}
                            value={this.state.name}
                            ref={"nameRef"}
                            onBlur={this.handleBlur.bind(this)}
                            required={true}
                            variant={"outlined"}
                            margin={"dense"}
                            fullWidth={true}
                            onChange={this.handleChange.bind(this)}
                            label={TradeViewModel.NAME}
                            error={Boolean(this.state.nameError)}
                            helperText={this.state.nameError}
                          />
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={7}>
                          <TextField
                            name={"rate"}
                            value={this.state.rate}
                            ref={"nameRef"}
                            onBlur={this.handleBlur.bind(this)}
                            required={true}
                            variant={"outlined"}
                            margin={"dense"}
                            fullWidth={true}
                            onChange={this.handleChange.bind(this)}
                            label={TradeViewModel.RATE}
                            error={Boolean(this.state.rateError)}
                            helperText={this.state.rateError}
                          />
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={7}>
                          <OfficeSelect value={this.state.fla}
                                        label={"Whether Food Licensing Authority permit is required?"}
                                        name={"fla"}
                                        required={true}
                                        variant={"outlined"}
                                        margin={"dense"}
                                        fullWidth={true}
                                        helperText={this.state.flaError}
                                        error={Boolean(this.state.flaError)}
                                        onBlur={this.handleSelectBlur.bind(this, "fla")}
                                        onChange={this.handleSelect.bind(this, "fla")}
                                        options={this.state.flas}/>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={12}>
                          <GridContainer alignItems={"flex-end"}>
                              <div>
                                  <Button name={"primary"} disabled={this.state.submit}
                                          color={"primary"} variant={"outlined"}
                                          onClick={this.handleSave}>
                                      {TradeViewModel.PRIMARY_TEXT}
                                  </Button>
                                  {"\u00A0 "}
                                  {"\u00A0 "}
                                  {"\u00A0 "}
                                  <Button name={"secondary"}
                                          color={"secondary"}
                                          variant={"outlined"}
                                          onClick={this.handleClear.bind(this)}>
                                      {TradeViewModel.SECONDARY_TEXT}
                                  </Button>
                              </div>
                          </GridContainer>
                      </GridItem>

                  </GridContainer>
              </GridItem>
              <SubmitDialog open={this.state.submit} title={TradeViewModel.SUBMIT_TITLE} text={TradeViewModel.PLEASE_WAIT}/>
              <OfficeSnackbar onClose={() => this.setState({ errorMessage: "" })} variant={"error"}
                              open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}/>
              <OfficeSnackbar onClose={() => this.setState({ successMessage: "" })} variant={"success"}
                              open={Boolean(this.state.successMessage)} message={this.state.successMessage}/>
          </GridContainer>
        );
    }
}

export default withStyles(style)(TradeNew);