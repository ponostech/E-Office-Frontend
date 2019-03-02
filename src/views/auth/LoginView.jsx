import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { Grid } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import Icon from "@material-ui/core/Icon";

import LoginViewModel from "../model/LoginViewModel";
import {OfficeRoutes} from "../../config/routes-constant/OfficeRoutes";
import {Validators} from "../../utils/Validators";

import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

// theme core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

class LoginView extends React.Component {
    state = {
        email: "",
        password: "",

        emailError: "",
        passwordError: "",

        cardAnimaton: "cardHidden",
        submit: false
    };
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(
            function() {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
    }
    componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }

    validate = (event) => {
        let emailRex = Validators.EMAIL_REGEX;
        const {type} = event;
        const {name, value} = event.target;
        switch (name) {
            case "email":
                switch (type) {
                    case "blur":
                        if (value.length === 0)
                            this.setState({emailError: LoginViewModel.REQUIRED_EMAIL});
                        break;
                    case "focus":
                        emailRex.test(value) ? this.setState({emailError: ""}) : this.setState({emailError: LoginViewModel.INVALID_EMAIL});
                        break;
                    default:
                }
                break;

            case "password":
                switch (type) {
                    case "blur":
                        value.length === 0 ? this.setState({passwordError: LoginViewModel.REQUIRED_PASSWORD}) : this.setState({passwordError: ""});
                        break;
                    case "focus":
                        break;
                    default:
                }
                break;

            default:
                break;
        }

    };

    handleChange = name => event=> {
        this.setState({
            [name]: event.target.value
        });
        //console.log(this.state)
    };

    handleLogin = (event) => {
        const {history} = this.props;
        //TODO:: Check user role and then go to that routes

        const valid = this.state.emailError && this.state.passwordError;
        if (valid) {
            this.submit();
        }
    };

    submit = () => {
        this.setState({submit: true});
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        // axios.post(ApiRoutes.LOGIN_ROUTE, data)
        //   .then(response =>{})
        //   .catch(error=>{})
        //   .then(()=>{
        //     this.setState({submit:false})
        //   })
    };

    handleForgot = (event) => {
        const {history} = this.props;
        history.push(OfficeRoutes.RESET_PASSWORD);
    };

    handleRegister = (event) => {
        const {history} = this.props;
        history.push("/register");
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={10} md={6}>
                        <form>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="success"
                                >
                                    <h4 className={classes.cardTitle}>Log in</h4>
                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                                        labelText="Email..."
                                        name="email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: this.handleChange('email'),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Password"
                                        id="password"
                                        name="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: this.handleChange('password'),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputAdornmentIcon}>
                                                        lock_outline
                                                    </Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <Grid container  direction="column"
                                          justify="center"
                                          alignItems="center">
                                        <Grid item>
                                            <Button color="primary" round>
                                                Login
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button simple onClick={this.handleForgot.bind(this)} color="primary">
                                                Forgot password?
                                            </Button>
                                            <Button simple onClick={this.handleRegister.bind(this)} color="primary" round >
                                                Create an account?
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
                {/*<GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader title={LoginViewModel.TITLE}/>
                            <CardContent>
                                <TextField
                                    error={Boolean(this.state.emailError)}
                                    onBlur={this.validate.bind(this)}
                                    onFocus={this.validate.bind(this)}
                                    helperText={this.state.emailError}
                                    label={LoginViewModel.EMAIL}
                                    name={"email"}
                                    variant={"outlined"}
                                    type={"email"}
                                    margin={"normal"}
                                    fullWidth={true}
                                    onChange={this.onChange.bind(this)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start">
                                                <Email/>
                                            </InputAdornment>
                                        ),
                                        placeholder: "Email"
                                    }}
                                />
                                <TextField
                                    error={Boolean(this.state.passwordError)}
                                    onBlur={this.validate.bind(this)}
                                    onFocus={this.validate.bind(this)}
                                    helperText={this.state.passwordError}
                                    label={LoginViewModel.PASSWORD}
                                    name={"password"}
                                    variant={"outlined"}
                                    type={"password"}
                                    margin={"normal"}
                                    fullWidth={true}
                                    onChange={this.onChange.bind(this)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start">
                                                <LockIcon/>
                                            </InputAdornment>
                                        ),
                                        placeholder: "Password"
                                    }}
                                />
                                <Button disabled={this.state.submit}
                                        variant={"outlined"}
                                        fullWidth={true} color="primary"
                                        onClick={this.handleLogin.bind(this)}>
                                    Login
                                </Button>
                                <Divider style={{marginTop: 8, marginBottom: 8}}/>
                                <Button color={"primary"} variant={"text"} fullWidth={true}
                                        onClick={this.handleForgot.bind(this)}>Forgot
                                    password?</Button>
                                <Button color={"primary"} variant={"text"} fullWidth={true}
                                        onClick={this.handleRegister.bind(this)}>Create an
                                    account?</Button>
                            </CardContent>

                        </Card>
                    </GridItem>
                </GridContainer>*/}
            </div>
        );
    }
}

LoginView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles (loginPageStyle)(LoginView);
