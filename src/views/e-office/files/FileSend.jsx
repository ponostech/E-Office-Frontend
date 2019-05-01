import React, {Component} from 'react';
import axios from 'axios';
import OfficeSelect from "../../../components/OfficeSelect";
import {ApiRoutes} from "../../../config/ApiRoutes";
import Grid from "@material-ui/core/Grid";
import {Button, Card, CardHeader, DialogActions} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

class FileSend extends Component {
    state = {
        staffs: [],
        recipientId: null,
    };

    componentDidMount() {
        console.log(this.props.doLoad);
        this.props.doLoad(true);
        this.getStaffs();
    }

    getStaffs() {
        axios.get(ApiRoutes.GET_STAFF)
            .then(res => {
                let staffs = FileSend.formatStaff(res.data.data.staffs);
                this.setState({staffs: staffs});
                this.props.doLoad(false);
            })
            .catch(err => {
                this.props.doLoad(false);
            })
    }

    static formatStaff(staffs) {
        return staffs.map(obj => {
            let temp = {};
            temp['value'] = obj.id;
            temp['label'] = obj.staff.name + " (" + obj.staff.designation + ")";
            return temp;
        });
    }

    handleOfficeSelect = (identifier, value) => {
        this.setState({
            [identifier]: value
        });
    };

    render() {
        return (
            <>
                <CardHeader title={"File No.: " + this.props.file.number} subheader={"Subject: " + this.props.file.subject}/>
                <CardContent>
                    <Grid item xs={6}>
                        <OfficeSelect
                            value={this.state.recipientId}
                            options={this.state.staffs}
                            name={"to"}
                            label={"Send File To"}
                            variant={"outlined"}
                            margin={"dense"}
                            required={true}
                            fullWidth={true}
                            onChange={this.handleOfficeSelect.bind(this, "recipientId")}
                        />
                    </Grid>
                </CardContent>
                <Divider/>
                <DialogActions>
                    <Button color="primary">Send File</Button>
                    <Button color="secondary">Cancel</Button>
                </DialogActions>
            </>
        )
    }
}

export default FileSend;