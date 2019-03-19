import React, {Component} from "react";
import {List, ListItem, ListItemText} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class DraftList extends Component {
    render() {
        return (
            <Grid item xs={12}>
                <List>
                    <ListItem>
                        <ListItemText primary={"Subject One"} secondary={"Created by kimi on 12/12/2018"}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={"Subject Two"} secondary={"Created by Rini on 12/12/2018"}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={"Subject three"} secondary={"Created by kimi on 12/12/2017"}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={"Subject four"} secondary={"Created by kimi on 12/12/2016"}/>
                    </ListItem>
                </List>
            </Grid>
        );
    }
}

export default DraftList;