import React, {Component} from "react";
import PropTypes from "prop-types";
import {Grid, Card, CardContent} from "@material-ui/core";

class DashboardAdmin extends Component {
    state = {
        loading:true,
    };

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Card>
                    <CardContent>
                        <Grid container spacing={3} justify="center">
                            ADMIN DASHBOARD
                        </Grid>
                    </CardContent>
                </Card>
            </>
        );
    }
}


export default DashboardAdmin;
