import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const createNoteButton = (props) => {
    const {classes} = props;
    return (
        <Button variant="contained" size="small" color="primary" className={classes.button} onClick={props.click}>
            Create Note <Icon className={classes.rightIcon}>add</Icon>
        </Button>
    );
};

export default withStyles(styles)(createNoteButton);