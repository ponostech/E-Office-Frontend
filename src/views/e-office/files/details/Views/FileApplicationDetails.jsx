import React from "react";
import { FileService } from "../../../../../services/FileService";
import { Card, CardContent, CardHeader, Divider, IconButton, Tooltip } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import PrintIcon from "@material-ui/icons/Print";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import OfficeSnackbar from "../../../../../components/OfficeSnackbar";
import ReactToPrint from "react-to-print";


function PrintApplication(props) {

  return (
    <table>
      <thead>
      <th>column 1</th>
      <th>column 2</th>
      <th>column 3</th>
      </thead>
      <tbody>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
      </tbody>
    </table>
  );
}

class FileApplicationDetails extends React.Component {
  state = {
    rows: [
      { name: "Local council", value: "Selesih" },
      { name: "Ward", value: "III" },
      { name: "Zone", value: "IV" }
    ],

    errorMessage: "",
    loading: true

  };
  fileService = new FileService();
  applicationRef = null;

  setRef = ref => this.applicationRef = ref;

  componentDidMount() {
    const { file } = this.props;
    // this.fileService.getApplication(file.id,
    //   errorMessage=>this.setState({errorMessage}),
    //   application=>this.setState({successMessage}))
  }

  render() {
    const { file } = this.props;
    return (
      <>
        {/*<Card>*/}
        {/*  <CardHeader title={file ? "FILE NUMBER:" + file.number : ""} subheader={"Subject: " + file.subject}*/}
        {/*              action={*/}
        {/*                <>*/}
        {/*                  <Tooltip title={"Download"}>*/}
        {/*                    <IconButton>*/}
        {/*                      <DownloadIcon/>*/}
        {/*                    </IconButton>*/}
        {/*                  </Tooltip>*/}
        {/*                  <Tooltip title={"Print"}>*/}
        {/*                    <ReactToPrint trigger={() => <IconButton><PrintIcon/></IconButton>}*/}
        {/*                                  content={() => this.applicationRef}/>*/}
        {/*                  </Tooltip>*/}
        {/*                </>*/}
        {/*              }/>*/}
        {/*  <Divider/>*/}
        {/*  <CardContent>*/}
        {/*    {*/}
        {/*      this.state.rows.map(item => <DetailViewRow primary={item.name} secondary={item.value}/>)*/}
        {/*    }*/}
        {/*  </CardContent>*/}
        <ReactToPrint  trigger={() => <button type="button">Print this out!</button>}
                                         content={() => this.applicationRef}/>
          <PrintApplication ref={this.setRef}/>

          <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}
                          onClose={e => this.setState({ errorMessage: "" })}/>
        {/*</Card>*/}
      </>
    );
  }

}

export default FileApplicationDetails;