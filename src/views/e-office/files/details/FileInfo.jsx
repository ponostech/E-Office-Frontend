import React, {Component} from "react";
import {Card, CardContent, CardActions, Button, Tab, Tabs, TextField, Typography} from "@material-ui/core";
import FormControlUtils from "../../../../utils/FormControlUtils";
import GridItem from "../../../../components/Grid/GridItem";
import DraftList from "../draft/DraftList";
import NotesheetList from "../notesheet/NotesheetList";
import FileMovement from "../movements/FileMovement";

class FileInfo extends Component {
    state = {
        tabValue: 'draft'
    };

    handleTabchange = (event, value) => {
        this.setState({tabValue: value})
    };

    render() {
        const {tabValue} = this.state;
        const {classes} = this.props;

        return (
            <>
                <Card>
                    <CardContent>
                        Content
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>

                <Card>
                    <CardContent>
                        <Typography title={"File Details"} variant={"headline"}>File Details</Typography>
                        <div>
                            Test
                        </div>
                        <div>
                            <Tabs
                                value={this.state.tabValue}
                                fullWidth={true}
                                style={{background: "white", paddingTop: 20}}
                                indicatorColor={"primary"}
                                textColor={"primary"}
                                onChange={this.handleTabchange.bind(this)}>
                                <Tab value={"draft"} label={"Draft"}/>
                                <Tab value={"notesheet"} label={"NoteSheet"}/>
                                <Tab value={"movement"} label={"Movement"}/>
                            </Tabs>
                            <div style={{marginTop: 20}}>
                                {tabValue === "draft" && <DraftList/>}
                                {tabValue === "notesheet" && <NotesheetList/>}
                                {tabValue === "movement" && <FileMovement/>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </>
        );
    }
}

export default FileInfo;