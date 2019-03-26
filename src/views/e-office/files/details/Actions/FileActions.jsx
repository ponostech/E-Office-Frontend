import React from 'react';
import {Button, Icon} from "@material-ui/core";

const fileActions = (props) => (
    <>
        <div className="menu">
            <Button variant="contained" size="small" color="primary" onClick={() => props.drawer('left', true)}
                    style={{float: "left", margin: 8}}>
                Open File Info <Icon className={props.classes.rightIcon}>info</Icon>
            </Button>
            <Button variant="contained" size="small" color="primary"
                    style={{float: "left", margin: 8}}>
                Archive <Icon className={props.classes.rightIcon}>archive</Icon>
            </Button>
            <Button variant="contained" size="small" color="primary"
                    style={{float: "left", margin: 8}}>
                Site Verification Report<Icon className={props.classes.rightIcon}>report</Icon>
            </Button>
            <Button variant="contained" size="small" color="primary"
                    style={{float: "left", margin: 8}}>
                Create Draft Permit <Icon className={props.classes.rightIcon}>note_add</Icon>
            </Button>
            <Button variant="contained" size="small" color="primary"
                    style={{float: "left", margin: 8}}>
                Send <Icon className={props.classes.rightIcon}>send</Icon>
            </Button>
            <Button variant="contained" size="small" color="primary" onClick={() => props.drawer('right', true)}
                    style={{float: "right", margin: 8}}>
                Open File Action <Icon className={props.classes.rightIcon}>build</Icon>
            </Button>
        </div>
    </>
);

export default fileActions;