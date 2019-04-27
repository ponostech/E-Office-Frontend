import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {SettingViewModel} from "../../model/SettingViewModel";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    tabsRoot: {
        borderBottom: "1px solid #black"
    },
    tabsIndicator: {
        backgroundColor: "#1890ff"
    },
    tabRoot: {
        textTransform: "initial",
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            "\"Segoe UI\"",
            "Roboto",
            "\"Helvetica Neue\"",
            "Arial",
            "sans-serif",
            "\"Apple Color Emoji\"",
            "\"Segoe UI Emoji\"",
            "\"Segoe UI Symbol\""
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1
        },
        "&$tabSelected": {
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#40a9ff"
        }
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3
    }
});

class Settings extends React.Component {
    state = {
        value: "address_book"
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <GridContainer justify={"center"}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{padding: 20}}>
                        <CardHeader title={SettingViewModel.TITLE}/>
                        <CardContent>
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
                            >
                                <Tab disableRipple value={"address_book"}
                                     classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                     label={SettingViewModel.ADDRESS_BOOK}/>
                                <Tab value={"preferences"}
                                     disableRipple
                                     classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                     label={SettingViewModel.PREFERENCE}/>

                            </Tabs>
                        </CardContent>
                        <div style={{marginTop: 20}}>
                            {value === "address_book" && <p> Setting</p>}
                            {value === "preferences" && <p>Others</p>}
                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
