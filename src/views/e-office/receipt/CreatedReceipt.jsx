import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Card, CardContent, CardHeader, IconButton, InputAdornment, Tooltip } from "@material-ui/core";
import ReactTable from "react-table";
import TextField from "@material-ui/core/es/TextField/TextField";

import SearchIcon from '@material-ui/icons/Search'
import ExportIcon from '@material-ui/icons/ImportExport'
import PdfIcon from '@material-ui/icons/PictureAsPdf'
const columns = [
  {
    Header: "Receipt No",
    accessor: "id"
  }, {
    Header: "Description",
    accessor: "date"
  }, {
    Header: "Created By",
    accessor: "user"
  }, {
    Header: "Dealing hand",
    accessor: "date"
  }, {
    Header: "Action",
    accessor: "action"
  }, {
    Header: "Priority",
    accessor: "priority"
  }
];

class CreatedReceipt extends Component {
  render() {
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader title={"Created receipts"} action={
              (
                <div>
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
                </div>
              )
            }/>
            <CardContent>
              <GridContainer  justify={"space-between"}>
                <div style={{margin:5}}>
                  <TextField placeholder={"Type here"}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start">
                        <SearchIcon/>
                      </InputAdornment>
                    ),
                    placeholder: "Email"
                  }}/>
                </div>
                <div style={{margin:5}}>
                  <Button color={"primary"} variant={"contained"}>New Button</Button>
                </div>
              </GridContainer>
              <ReactTable
                data={[]}
                columns={columns}
                defaultPageSize={5}
                pageSizeOptions={[5, 10, 20, 50, 100, 500]}
              />
            </CardContent>

          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default CreatedReceipt;