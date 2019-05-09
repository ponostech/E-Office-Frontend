import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ConfirmDialog from "../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import {StaffService} from "../../../services/StaffService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingView from "../../common/LoadingView";
import StaffEditDialog from "./StaffEditDialog";

const styles = {
    button: {},
    actionIcon: {}
};

class StaffList extends React.Component {
    staffService = new StaffService();
    state = {
        staff: null,

        roles:[],
        branches:[],
        staffs: [],
        errorMessage: "",
        loading: true,
    };

    componentDidMount() {
        const {doLoad} = this.props;
        doLoad(true);
        Promise.all([this.getStaff(),this.getBranches(),this.getRoles()])
          .then(function(val) {
              console.log(val)
          })
          .finally(()=>{
              this.setState({loading:false})
              doLoad(false)
          })

    }

    getStaff=()=>{
        this.staffService.fetch(errorMessage => this.setState({errorMessage}), staffs => this.setState({staffs}))
          .finally(() => {
              console.info("Staff list request complete")
          });
    }
    getRoles=()=>{
        this.staffService.getRoles(errorMessage=>this.setState({errorMessage}),
          roles=>this.setState({roles}))
          .finally(()=>console.info("roles request completed"))
    }
    getBranches=()=>{
        this.staffService.getBranch(errorMessage=>this.setState({errorMessage}),
          branches=>this.setState({branches}))
          .finally(()=>console.info("Branches request completed"))
    }

    handleEdit=(staff)=>{
        if (staff) {
            console.log(staff);
            this.staffService.update(staff);
        }else {
            this.setState({staff:null})
        }
    }
    render() {
        const {staffs, loading} = this.state;
        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 15,
            serverSide: false,
        };

        const tableColumns = [
            {
                name: "staff",
                label: "NAME",
                options: {
                    customBodyRender: (staff, tableMeta, updateValue) => {
                        return (
                            staff.name
                        );
                    }
                }
            }, {
                name: "email",
                label: "EMAIL"
            }, {
                name: "phone_no",
                label: "PHONE"
            }, {
                name: "staff",
                label: "DESIGNATION",
                options: {
                    customBodyRender: (staff, tableMeta, updateValue) => {
                        return (
                            staff.designation
                        );
                    }
                }
            },
            {
                name: "staff",
                label: "BRANCH",
                options: {
                    customBodyRender: (staff, tableMeta, updateValue) => {
                        return (
                            staff.branch
                        );
                    }
                }
            },
            {
                name: "action",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const {rowIndex} = tableMeta;
                        const data = this.state.staffs[rowIndex];
                        return (
                            <div>
                                <Tooltip title={"Edit staff"}>
                                    <IconButton onClick={e=>this.setState({staff:data})}>
                                        <EditIcon color={"action"}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"Delete User"}>
                                    <IconButton>
                                        <DeleteIcon color={"error"}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        );
                    }
                }
            },
        ];

        return (
            <>
                {loading ? <LoadingView/> : <Grid item xs={12}>
                    <MUIDataTable
                        title={"STAFF: List of Staff"}
                        data={staffs}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                </Grid>}

                <StaffEditDialog staff={this.state.staff} open={Boolean(this.state.staff)} onClose={this.handleEdit} roles={this.state.roles} branches={this.state.branches} />
                <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                                onClose={e => this.setState({takeMessage: ""})} open={Boolean(this.state.takeMessage)}/>
                <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                                onClose={e => this.setState({errorMessage: ""})}
                                open={Boolean(this.state.errorMessage)}/>
            </>
        );
    }
}

export default withStyles(styles)(StaffList);
