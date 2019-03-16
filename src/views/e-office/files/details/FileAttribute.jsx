import React from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

const attributes = (props) => {
    const {classes} = props;
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Grid container xs={10} className={classes.noPadding}>
                    <Grid item xs={4}>
                        <Typography className={classes.heading}>File No.: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography className={classes.secondaryHeading}>G.12323/1/2019-AMC</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.heading}>Subject: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography className={classes.secondaryHeading}>Matter relating to</Typography>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.noTopPadding}>
                <Grid container xs={10}>
                    <Grid item xs={4}>
                        <Typography className={classes.heading}>Dealing Staff: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography className={classes.secondaryHeading}>Lala</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.heading}>Subject: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography className={classes.secondaryHeading}>Matter relating to</Typography>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
};

export default attributes;