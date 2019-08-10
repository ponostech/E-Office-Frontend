import React, {Component} from "react";
import {Button, Card, CardActions, CardContent, IconButton, InputAdornment, TextField} from "@material-ui/core";
import VisibilityOn from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        };
    }

    handleClickShowPassword = (e) => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };
    handleSubmit = (e) => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };
    handleRequired = (e) => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };
    handleChange = (e) => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    render() {
        return (
            <div>
                <GridContainer justify={"center"}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardContent>
                                <TextField
                                    value={this.state.password}
                                    error={Boolean(this.state.passwordError)}
                                    helperText={this.state.passwordError}
                                    type={this.state.showPassword ? "text" : "password"}
                                    name={"password"}
                                    margin={"dense"}
                                    required={true}
                                    fullWidth={true}
                                    variant={"outlined"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword.bind(this)}
                                                >
                                                    {this.state.showPassword ? <VisibilityOn/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    label={"Old Password"}
                                    onBlur={this.handleRequired.bind(this)}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder={"Password"}
                                />
                                <TextField
                                    value={this.state.password}
                                    error={Boolean(this.state.passwordError)}
                                    helperText={this.state.passwordError}
                                    type={this.state.showPassword ? "text" : "password"}
                                    name={"password"}
                                    margin={"dense"}
                                    required={true}
                                    fullWidth={true}
                                    variant={"outlined"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword.bind(this)}
                                                >
                                                    {this.state.showPassword ? <VisibilityOn/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    label={"New Password"}
                                    onBlur={this.handleRequired.bind(this)}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder={"Password"}
                                />
                                <TextField
                                    value={this.state.confirmPassword}
                                    error={Boolean(this.state.confirmPasswordError)}
                                    helperText={this.state.confirmPasswordError}
                                    type={this.state.showPassword ? "text" : "password"}
                                    name={"confirmPassword"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword.bind(this)}
                                                >
                                                    {this.state.showPassword ? <VisibilityOn/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    margin={"dense"}
                                    required={true}
                                    fullWidth={true}
                                    variant={"outlined"}
                                    label={"Confirm password"}
                                    onBlur={this.handleRequired.bind(this)}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder={"Confirm password"}
                                />

                            </CardContent>
                            <CardActions>
                                <Button
                                    variant={"outlined"}
                                    color={"primary"}
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant={"outlined"}
                                    color={"secondary"}
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    Reset
                                </Button>
                            </CardActions>
                        </Card>
                    </GridItem>

                </GridContainer>
            </div>
        );
    }
}

export default ChangePassword;