import React, { Component } from "react";
import ReactTable from "react-table";
import { Button, Checkbox, Chip, IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "react-table/react-table.css";
import GridItem from "../../../../components/Grid/GridItem";

import AttachmentIcon from "@material-ui/icons/AttachFile";
import MoreIcon from "@material-ui/icons/MoreVert";
import GridContainer from "../../../../components/Grid/GridContainer";
import { withRouter } from "react-router-dom";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";

class NewHoardingApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { application_no: "12",date:"12/2/2019", length: 23,height:56,status:"New",attachment:"files" },
        { application_no: "22",date:"12/3/2019", length: 43,height:65,status:"New",attachment:"files" },
        { application_no: "33",date:"7/4/2019", length: 12,height:6,status:"New",attachment:"files" },
        { application_no: "123",date:"12/5/2019", length: 65,height:65,status:"New",attachment:"files" },
        { application_no: "44",date:"5/5/2019", length: 67,height:78,status:"New",attachment:"files" },
        { application_no: "45",date:"9/6/2019", length: 8,height:88,status:"New",attachment:"files" },
        { application_no: "17",date:"12/7/2019", length: 12,height:12,status:"New",attachment:"files" },
      ]

    };
  }

  render() {
    const { history } = this.props;
    const columns = [{
      Header: " ",
      accessor: "application_no",
      Cell: props => <Checkbox name={"check"}/>// String-based value accessors!
    }, {
      Header: "Application No",
      accessor: "application_no" // String-based value accessors!
    }, {
      Header: "Date",
      accessor: "date",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: "Length",
      accessor: "length",
    },{
      Header:'Status',
      accessor:'status',
      Cell: props=><Chip title={props.value} label={props.value} color={"primary"}/>
    },{
      Header:'Attachment',
      accessor:'attachment',
      Cell:props=>(
        <IconButton onClick={(e)=>{
          console.log(props.value)
        }}>
          <AttachmentIcon/>
        </IconButton>
      )
    },{
      Header:'Action',
      accessor:'application_no',
      Cell:props=>(
       <IconButton onClick={(e)=>{
         history.push(OfficeRoutes.HOARDING_DETAILS)
       }}>
         <MoreIcon/>
       </IconButton>
      )
    }
    ];
    return (
      <div>
        <GridContainer justify={"space-between"}>
          <GridItem>
            <TextField variant={"standard"}
                       margin={"dense"}
                       InputProps={{
                         endAdornment: (
                           <InputAdornment
                             position="end">
                             <SearchIcon color={"action"}/>
                           </InputAdornment>
                         ),
                         placeholder: "Search"
                       }}/>
          </GridItem>
          <GridItem>
            <Button color={"primary"} variant={"contained"}>Site Verification</Button>
          </GridItem>

        </GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <ReactTable
            columns={columns}
            data={this.state.data}
            showPagination={true}
            showPaginationBottom={true}
            showPageSizeOptions={true}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}/>
        </GridItem>
      </div>
    );
  }
}

export default  withRouter(NewHoardingApplications);