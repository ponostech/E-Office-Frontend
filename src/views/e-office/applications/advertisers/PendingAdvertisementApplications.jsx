import React, { Component } from "react";
import ReactTable from "react-table";
import { Button, Checkbox, IconButton, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import 'react-table/react-table.css'
import GridItem from "../../../../components/Grid/GridItem";

import DetailIcon from '@material-ui/icons/RemoveRedEyeSharp';
import FileIcon from '@material-ui/icons/AttachFile';

import GridContainer from "../../../../components/Grid/GridContainer";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";
import FilesDialog from "../../files/FilesDialog";
import { withRouter } from "react-router-dom";

class PendingAdvertisementApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFiles:false,

      data: [
        { application_no: "12", fileno: 12,name:"kimi",address:"address",type:"private",contact:"9898989898"},
        { application_no: "12", fileno: 12,name:"kimi",address:"address",type:"private",contact:"9898989898"},
        { application_no: "12", fileno: 12,name:"kimi",address:"address",type:"private",contact:"9898989898"},
        { application_no: "12", fileno: 12,name:"kimi",address:"address",type:"private",contact:"9898989898"},
        { application_no: "12", fileno: 12,name:"kimi",address:"address",type:"private",contact:"9898989898"},
        { application_no: "12", fileno: 12,name:"kimi",address:"address",type:"private",contact:"9898989898"},
      ]

    };
  }

  render() {
    const { history } = this.props;
    const columns = [{
      Header: " ",
      accessor: "application_no",
      Cell:props=> <Checkbox name={"check"}/>// String-based value accessors!
    },{
      Header: "Application No",
      accessor: "application_no" // String-based value accessors!
    }, {
      Header: "File No",
      accessor: "fileno",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: "Name",
      accessor: "name",
    },{
      Header: "Address",
      accessor:"address"
    },{
      Header:'Type',
      accessor:"type"
    },{
      Header:'Contact',
      accessor:"contact"
    },{
      Header:"Action",
      accessor:"application_no",
      Cell:props=>{
        return <div>
          <Tooltip title={"Detail"}>
            <IconButton onClick={(e)=>history.push(OfficeRoutes.ADVERTISER_DETAIL)}>
              <DetailIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={"Put up file"}>
            <IconButton onClick={(e)=>this.setState({openFiles:true})}>
              <FileIcon/>
            </IconButton>
          </Tooltip>
        </div>
      }
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
            <Button color={"primary"} variant={"raised"}>Site Verification</Button>
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
        <FilesDialog open={this.state.openFiles} onClose={(e)=>console.log(e)}/>
      </div>
    );
  }
}

export default withRouter(PendingAdvertisementApplications);