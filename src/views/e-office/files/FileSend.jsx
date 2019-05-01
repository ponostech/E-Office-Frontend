import React, {Component} from 'react';
import axios from 'axios';
import OfficeSelect from "../../../components/OfficeSelect";
import {ApiRoutes} from "../../../config/ApiRoutes";
import {DESK} from "../../../config/routes-constant/OfficeRoutes";
import Grid from "@material-ui/core/Grid";
import {Button, Card, CardHeader, DialogActions} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

class FileSend extends Component {
    state = {
        staffs: [],
        recipient_id: null,
    };

    componentDidMount() {
        this.props.doLoad(true);
        this.getStaffs();
    }

    getStaffs = () => {
        axios.get(ApiRoutes.GET_STAFF)
            .then(res => {
                let staffs = this.formatStaff(res.data.data.staffs);
                this.setState({staffs: staffs});
                this.props.doLoad(false);
            })
            .catch(err => {
                this.props.doLoad(false);
            })
    };

    formatStaff = (staffs) => {
        return staffs.map(obj => {
            let temp = {};
            temp['value'] = obj.id;
            temp['label'] = obj.staff.name + " (" + obj.staff.designation + ")";
            return temp;
        });
    };

    handleOfficeSelect = (identifier, value) => {
        this.setState({
            [identifier]: value
        });
    };

    handleSubmit = () => {
        const {history} = this.props;
        if (this.state.recipient_id) {
            this.props.doLoad(false);
            let data = {
                recipient_id: this.state.recipient_id.value,
            };

            axios.post("/file/"+ this.props.file.id + "/send", data)
                .then(res => {
                    this.props.doLoad(false);
                    history.push(DESK);
                })
        } else {
            console.log('Error');
        }
    };

    render() {
        return (
            <>
                <CardHeader title={"File No.: " + this.props.file.number} subheader={"Subject: " + this.props.file.subject}/>
                <CardContent>
                    <Grid item xs={6}>
                        <OfficeSelect
                            value={this.state.recipient_id}
                            options={this.state.staffs}
                            name={"recipient_id"}
                            label={"Send File To"}
                            variant={"outlined"}
                            margin={"dense"}
                            required={true}
                            fullWidth={true}
                            onChange={this.handleOfficeSelect.bind(this, "recipient_id")}
                        />
                    </Grid>
                </CardContent>
                <Divider/>
                <DialogActions>
                    <Button color="primary" onClick={this.handleSubmit.bind(this)}>Send File</Button>
                </DialogActions>
            </>
        )
    }
}

export default FileSend;