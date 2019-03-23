import React, {Component} from "react";
import {Card, CardContent} from "@material-ui/core";
import ReceiptListDialog from "../receipt/ReceiptListDialog";
import MovementDialog from "./movements/MovementDialog";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
const columns = ["Name", "Title", "Location", "Age", "Salary"];

const data = [
    ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
    ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
    ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
    ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
    ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
    ["Blake Duncan", "Business Management Analyst", "San Diego", 65, "$94,000"],
    ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
    ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
    ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
    ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
    ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
    ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
    ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
    ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
    ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
    ["Addison Navarro", "Business Management Analyst", "New York", 50, "$295,000"],
    ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
    ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
    ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
    ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
    ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
    ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
    ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
    ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
    ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
    ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
    ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
    ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
    ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
];

const options = {
    filterType: "dropdown",
    responsive: "scroll",
    rowsPerPage: 8,
};

class CreatedFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAttachDialog: false,
            openSend: false,
        };
    }

    onReceiptSelect = (receipt) => {
        this.setState({openAttachDialog: false});
    };

    handleClosed = (e) => {
        this.setState({openSend: false});
    };

    render() {
        const {history} = this.props;
        return (
            <Grid container justify={"flex-start"}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card>
                        {/*<CardHeader title={"List of File"} action={
                            (
                                <div>
                                    <Tooltip title={"Create New File"}>
                                        <Button color={"primary"} variant={"contained"}>Create New File</Button>
                                    </Tooltip>
                                    <Tooltip title={"Export"}>
                                        <IconButton>
                                            <ExportIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={"Pdf"}>
                                        <IconButton>
                                            <PdfIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={"Edit"}>
                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={"Forward"}>
                                        <IconButton onClick={(e) => {
                                            this.setState({openSend: true});
                                        }}>
                                            <SentIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={"Attach receipt"}>
                                        <IconButton onClick={(e) => this.setState({openAttachDialog: true})}>
                                            <AttachIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={"Details"}>
                                        <IconButton onClick={() => history.push(OfficeRoutes.FILE_DETAIL)}>
                                            <EyeIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    {"  "}

                                </div>
                            )
                        }/>*/}
                        <CardContent>
                            <Grid container>
                                <Grid item  xs={12}>
                                    <MUIDataTable
                                        title={"List of File"}
                                        data={data}
                                        columns={columns}
                                        options={options}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <ReceiptListDialog open={this.state.openAttachDialog} onClose={this.onReceiptSelect}/>
                <MovementDialog open={this.state.openSend} onClose={this.handleClosed.bind(this)}/>
            </Grid>
        );
    }
}

export default CreatedFiles;