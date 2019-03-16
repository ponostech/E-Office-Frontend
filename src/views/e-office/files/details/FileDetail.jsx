import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import ApplicationReport from "./ApplicationReport";

const styles = theme => ({
    container: {
        display: "flex"
    },
    root: {
        flexGrow: 1,
    }
});

class FileDetail extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <ApplicationReport/>
            </div>
        );
    }
}

export default withStyles(styles)(FileDetail);