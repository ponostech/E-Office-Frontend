import React, {Component} from "react";
import {Button, Card, CardActions, CardHeader, TextField} from "@material-ui/core";

import CardBody from "../../components/Card/CardBody.jsx";

import {StaffViewModel} from "../model/StaffViewModel";
import GridItem from "../../components/Grid/GridItem";
import moment from "moment";
import OfficeSelect from "../../components/OfficeSelect";
import axios from "axios";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";

class StaffRegistrationForm extends Component {
    state = {
        name: "",
        designation: "",
        address: "",
        branch: "",
        dob: null,
        blood: "",

        nameError: "",
        addressError: "",
        dobError: "",
        designations: [
            {value: "ldc", label: "LDC"},
            {value: "udc", label: "UDC"},
            {value: "Assistant", label: "Assistant"}
        ],
        branches: [
            {value: "one", label: "one"},
            {value: "two", label: "two"},
            {value: "three", label: "three"}
        ],
        submit: false
    };

    componentDidMount() {
        document.title = "e-AMC | Staff Registration Form";
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    };

    handleSelect = (identifier, selectedValue) => {
        this.setState({
            [identifier]: selectedValue.value
        });
    };

    validate = () => {
        if (this.state.name === "") {
            this.setState({nameError: StaffViewModel.NAME_REQUIRED});
            return false;
        }
        if (this.state.addressError === "") {
            this.setState({addressError: StaffViewModel.ADDRESS_REQUIRED});
            return false;
        }
        if (this.state.dobError === "") {
            this.setState({dobError: StaffViewModel.DOB_REQUIRED});
            return false;
        }

        let dob = moment(this.state.do);
        let today = moment.now();
        if (dob > today) {
            this.setState({dobError: StaffViewModel.DOB_FUTURE_ERROR});
            return;
        }

        this.setState({
            nameError: "",
            addressError: "",
            dobError: ""
        });

        return true;
    };

    onSubmit = (e) => {
        const data = {
            name: 'name',
            address: 'test'
        };
        axios.post('https://jsonplaceholder.typicode.com/users', data)
            .then(response => {
                console.log(response);
            })
    };

    handleClick = (e) => {
        this.setState({open: true});
        const name = e.target.name;
        switch (name) {
            case "primary":
                this.onSubmit();
                //TODO: submit data
                break;
            case "secondary":
                //TODO: clear data
                break;
            default:
                break;
        }
    };

    render() {
        const {designation} = this.props;
        const {branch} = this.props;
        const {classes} = this.props;

        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={8} md={6}>
                        <form>
                            <Card>
                                <CardHeader title={StaffViewModel.TILE} subheader={StaffViewModel.SUBHEADER}/>
                                <CardBody>
                                    <TextField name={"name"}
                                               required={true}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               fullWidth={true}
                                               onChange={this.handleChange.bind(this)}
                                               label={StaffViewModel.NAME}
                                               error={Boolean(this.state.nameError)}
                                               helperText={this.state.nameError}
                                    />

                                    <OfficeSelect value={designation}
                                                  defaultValue={this.state.designations[0]}
                                                  name={"designation"}
                                                  placeholder={StaffViewModel.DESIGNATION}
                                                  onChange={this.handleSelect.bind(this, 'designation')}
                                                  searchAble={true}
                                                  ClearAble={true}
                                                  label={StaffViewModel.DESIGNATION}
                                                  options={this.state.designations}/>

                                    <TextField name={"address"}
                                               required={true}
                                               multiline={true}
                                               rows={3}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               fullWidth={true}
                                               error={Boolean(this.state.addressError)}
                                               helperText={this.state.addressError}
                                               onChange={this.handleChange.bind(this)}
                                               label={StaffViewModel.ADDRESS}/>

                                    <OfficeSelect value={branch}
                                                  label={StaffViewModel.BRANCH}
                                                  name={"branch"}
                                                  variant={"outlined"}
                                                  margin={"dense"}
                                                  fullWidth={true}
                                                  onChange={this.handleSelect.bind(this, 'branch')}
                                                  options={this.state.branches}/>

                                    <TextField name={"dob"}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               required={true}
                                               fullWidth={true}
                                               onChange={this.handleChange.bind(this)}
                                               type={"date"}
                                               label={StaffViewModel.DOB}
                                               error={Boolean(this.state.dobError)}
                                               helperText={this.state.dobError}
                                    />

                                    <TextField name={"blood"}
                                               variant={"outlined"}
                                               margin={"dense"}
                                               fullWidth={true}
                                               onChange={this.handleChange.bind(this)}
                                               label={StaffViewModel.BLOOD}/>

                                </CardBody>
                                <CardActions>
                                    <Button name={"primary"} disabled={this.state.submit}
                                            color={"primary"} variant={"outlined"}
                                            onClick={this.handleClick.bind(this)}>
                                        {StaffViewModel.PRIMARY_TEXT}
                                    </Button>
                                    <Button name={"secondary"}
                                            color={"secondary"}
                                            variant={"outlined"}
                                            onClick={this.handleClick.bind(this)}>
                                        {StaffViewModel.SECONDARY_TEXT}
                                    </Button>
                                </CardActions>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(loginPageStyle)(StaffRegistrationForm);