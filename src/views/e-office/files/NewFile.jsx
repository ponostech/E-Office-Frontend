import React, {Component} from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";
import {NewFileViewModel} from "../../model/NewFileViewModel";
import OfficeSelect from "../../../components/OfficeSelect";
import {OfficeRoutes} from "../../../config/routes-constant/OfficeRoutes";
import Grid from "@material-ui/core/Grid";

class NewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNo: "",
            subject: "",
            dealingId: null,
            category: null,
            classification: null,
            remark: "",
            prevRef: null,
            nextRef: null,

            fileNoError: "",
            subjectError: "",

            classifications: [
                {value: "one", label: "One"},
                {value: "two", label: "Two"},
                {value: "three", label: "Three"}
            ],
            categories: [
                {value: "one", label: "One"},
                {value: "two", label: "Two"},
                {value: "three", label: "Three"}
            ], dealers: [
                {value: "one", label: "One"},
                {value: "two", label: "Two"},
                {value: "three", label: "Three"}
            ],

            submit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSelect = (value, identifier) => {
        switch (identifier.name) {
            case "category":
                this.setState({category: value});
                break;
            case "classification":
                this.setState({classification: value});
                break;
            case "dealingId":
                this.setState({dealingId: value});
                break;
            default:
                break;

        }
    };

    validateBlur = (e) => {
        const {value, name} = e.target;
        switch (name) {
            case "fileNo":
                value.length === 0 ? this.setState({fileNoError: NewFileViewModel.REQUIRED_FILENO}) : this.setState({fileNoError: ""});
                break;
            case "subject":
                value.length === 0 ? this.setState({subjectError: NewFileViewModel.REQUIRED_SUBJECT}) : this.setState({subjectError: ""});
                break;
        }
    };

    submit = (e) => {
        const {history} = this.props;
        history.push(OfficeRoutes.FILE_DETAIL);
    };

    render() {
        return (
            <GridContainer justify={"flex-start"}>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader title={NewFileViewModel.TITLE} subheader={NewFileViewModel.SUBTITLE}/>
                        <CardContent>
                            <Grid container xs={12} spacing={16}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={Boolean(this.state.fileNoError)}
                                        helperText={this.state.fileNoError}
                                        onBlur={this.validateBlur.bind(this)}
                                        required={true}
                                        margin={"dense"}
                                        label={NewFileViewModel.FILE_NO_LABEL}
                                        variant={"outlined"}
                                        onChange={this.handleChange}
                                        name={"fileNo"} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required={true}
                                        error={Boolean(this.state.subjectError)}
                                        helperText={this.state.subjectError}
                                        onBlur={this.validateBlur.bind(this)}
                                        margin={"dense"}
                                        label={NewFileViewModel.SUBJECT_LABEL}
                                        variant={"outlined"}
                                        onChange={this.handleChange}
                                        name={"subject"}
                                        fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <OfficeSelect
                                        margin={"dense"}
                                        variant={"outlined"}
                                        value={this.state.dealingId}
                                        fullWidth={true}
                                        required={true}
                                        label={NewFileViewModel.DEALER_LABEL}
                                        name={"dealingId"}
                                        isClearable={true}
                                        options={this.state.dealers}
                                        onChange={this.handleSelect}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <OfficeSelect
                                        required={true}
                                        variant={"outlined"}
                                        margin={"dense"}
                                        fullWidth={true}
                                        value={this.state.category}
                                        label={NewFileViewModel.CATEGORY_LABEL}
                                        isClearable={true}
                                        name={"category"}
                                        options={this.state.categories}
                                        onChange={this.handleSelect}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <OfficeSelect
                                        variant={"outlined"}
                                        margin={"dense"}
                                        value={this.state.classification}
                                        fullWidth={true}
                                        label={NewFileViewModel.CLASSIFICATION_LABEL}
                                        name={"classification"}
                                        isClearable={true}
                                        options={this.state.classifications}
                                        onChange={this.handleSelect}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin={"dense"}
                                        label={NewFileViewModel.REMARK_LABEL}
                                        name={"remark"}
                                        variant={"outlined"}
                                        onChange={this.handleChange}
                                        fullWidth={true}
                                        rows={3}
                                        multiline={true}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin={"dense"}
                                        label={NewFileViewModel.PREVIOUS_LABEL}
                                        name={"prevRef"}
                                        variant={"outlined"}
                                        onChange={this.handleChange}
                                        fullWidth={true}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin={"dense"}
                                        label={NewFileViewModel.NEXT_LABEL}
                                        name={"nextRef"}
                                        variant={"outlined"}
                                        onChange={this.handleChange}
                                        fullWidth={true}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container justify={"center"}>
                                <Grid item>
                                    <Button style={{margin:10}} disabled={this.state.submit} variant="contained"
                                            color="primary"
                                            onClick={this.submit.bind(this)}
                                    >
                                        {NewFileViewModel.PRIMARY_BTN_TEXT}
                                    </Button>
                                    <Button style={{margin:10}} variant="contained"
                                            color="secondary"
                                    >
                                        {NewFileViewModel.SECONDARY_BTN_TEXT}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default NewFile;