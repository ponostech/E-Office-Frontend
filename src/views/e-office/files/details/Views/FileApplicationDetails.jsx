import React from "react";
import { FileService } from "../../../../../services/FileService";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Table, TableBody, TableCell,
  TableHead,
  TableRow,
  Tooltip
} from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import PrintIcon from "@material-ui/icons/Print";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import OfficeSnackbar from "../../../../../components/OfficeSnackbar";
import ReactToPrint from "react-to-print";
import moment from "moment";
import LoadingView from "../../../../common/LoadingView";

export const FILEABLE_TYPE = {
  KIOSK: "App\\KioskApplication",
  HOARDING: "App\\HoardingApplication",
  BANNER: "App\\Banner",
  SHOP: "App\\Shop",
  HOTEL: "App\\Hotel"
};

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
    rows: [],
    tableData: [],

    errorMessage: "",
    loading: true

  };
  fileService = new FileService();
  applicationRef = null;

  setRef = ref => this.applicationRef = ref;

  componentDidMount() {
    const { file } = this.props;
    this.fileService.getApplication(file.fileable_id, file.fileable_type,
      errorMessage => this.setState({ errorMessage }),
      application => this.renderView(application))
      .finally(() => this.setState({ loading: false }));
  }

  renderView = (application) => {
    const { fileable_type } = this.props.file;
    let rows = [];
    switch (fileable_type) {
      case FILEABLE_TYPE.KIOSK:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Address", value: application.length },
          { name: "Local Council", value: application.local_council.name },
          { name: "Length", value: application.length + " ft" },
          { name: "Height", value: application.height + " ft" },
          { name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "NA" },
          { name: "Road Detail", value: application.road_detail ? application.road_detail : "NA" },
          { name: "Both Sided", value: application.both_side ? "Yes" : "No" },
          { name: "Collapsible", value: application.collapsible ? "Yes" : "No" },
          { name: "Display Type", value: application.display_type },
          { name: "Name of Landowner", value: application.land_owner_name },
          { name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private" }
        );
        break;
      case FILEABLE_TYPE.HOARDING:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Address", value: application.length },
          { name: "Local Council", value: application.local_council.name },
          { name: "Length", value: application.length + " ft" },
          { name: "Height", value: application.height + " ft" },
          { name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "NA" },
          { name: "Road Detail", value: application.road_detail ? application.road_detail : "NA" },
          { name: "Both Sided", value: application.both_side ? "Yes" : "No" },
          { name: "Display Type", value: application.display_type },
          { name: "Name of Landowner", value: application.land_owner_name },
          { name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private" }
        );
        break;
      case FILEABLE_TYPE.BANNER:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Name", value: application.name },
          { name: "Phone", value: application.phone },
          { name: "Type of Applicant", value: application.applicant_type },
          { name: "Address", value: application.address },
          { name: "Type of Advertisement", value: application.advertisement_type },
          { name: "Content/Wording", value: application.content?application.content:"NA" },
          { name: "Detail",value: application.detail?application.detail:"NA" }
        );
        let tableData = [];
        application.advertisements.map(item=>tableData.push(
          [item.length,item.height,item.locations,moment(item.from).format("Do MMM YYYY"),moment(item.to).format("Do MMM YYYY")]
        ));
        this.setState({tableData});
        break;
      case FILEABLE_TYPE.SHOP:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Name of Owner", value: application.owner },
          { name: "Phone", value: application.phone },
          { name: "Email", value: application.email},
          { name: "Address of Applicant", value: application.owner_address },
          { name: "Type of Applicant", value:application.type},
          { name: "Name of the Shop", value:application.name},
          // { name: "Name of Trade", value:application.trade.name},
          { name: "Purposed Location", value:application.address},
          { name: "Local Council", value:application.local_council.name},
          { name: "Details of Business", value:application.details?application.details:"NA"},
          { name: "ESTD", value:moment(application.estd).format("Do MMM YYYY")},
          { name: "TIN", value:application.tin_no?application.tin_no:"NA"},
          { name: "CST", value:application.cst_no?application.cst_no:"NA"},
          { name: "GST", value:application.gst_no?application.gst_no:"NA"},
          { name: "PAN", value:application.pan_no?application.pan_no:"NA"},
          { name: "Type of Premised", value:application.premise_type },
        );
        break;
      case FILEABLE_TYPE.HOTEL:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Name of Owner", value: application.owner },
          { name: "Phone", value: application.phone },
          { name: "Email", value: application.email},
          { name: "Address of Applicant", value: application.owner_address },
          { name: "Type of Applicant", value:application.type},
          { name: "Name of the Shop", value:application.name},
          // { name: "Name of Trade", value:application.trade.name},
          { name: "Purposed Location", value:application.address},
          { name: "Local Council", value:application.local_council.name},
          { name: "Details of Business", value:application.details?application.details:"NA"},
          { name: "ESTD", value:moment(application.estd).format("Do MMM YYYY")},
          { name: "TIN", value:application.tin_no?application.tin_no:"NA"},
          { name: "CST", value:application.cst_no?application.cst_no:"NA"},
          { name: "GST", value:application.gst_no?application.gst_no:"NA"},
          { name: "PAN", value:application.pan_no?application.pan_no:"NA"},
          { name: "No of AC Room", value:application.ac_rooms },
          { name: "No of Non AC Room", value:application.non_ac_rooms },
          { name: "No of Conference Hall", value:application.conference_halls },
          { name: "No of Banquet", value:application.banquet_halls },
          { name: "Facilities", value:application.facilities?application.facilities:"NA" },
          { name: "Type of Premised", value:application.premise_type },

        );
        break;

    }
    this.setState({ rows });
  };

  render() {
    const { file } = this.props;
    return (
      <>
        {
          this.state.loading ? <LoadingView/> :
            <Card>
              <CardHeader title={file ? "FILE NUMBER:" + file.number : ""} subheader={"Subject: " + file.subject}
                          action={
                            <>
                              <Tooltip title={"Download"}>
                                <IconButton>
                                  <DownloadIcon/>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={"Print"}>
                                <ReactToPrint trigger={() => <IconButton><PrintIcon/></IconButton>}
                                              content={() => this.applicationRef}/>
                              </Tooltip>
                            </>
                          }/>
              <Divider/>
              <CardContent>
                {
                  this.state.rows.map((item,index)=> <DetailViewRow key={index} primary={item.name} secondary={item.value}/>)
                }
                {
                  this.state.tableData.length!==0 ?
                    <>
                    <DetailViewRow primary={"Details of Advertisement"}/>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Length</TableCell>
                          <TableCell>Height</TableCell>
                          <TableCell>Locations</TableCell>
                          <TableCell>From</TableCell>
                          <TableCell>To</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          this.state.tableData.map((item,i)=>
                          <TableRow key={i}>
                            <TableCell>{item[0]} ft</TableCell>
                            <TableCell>{item[1]} ft</TableCell>
                            <TableCell>{item[2]}</TableCell>
                            <TableCell>{item[3]}</TableCell>
                            <TableCell>{item[4]}</TableCell>
                          </TableRow>
                          )
                        }
                      </TableBody>
                    </Table>
                    </>: ""
                }
              </CardContent>

              <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)}
                              message={this.state.errorMessage}
                              onClose={e => this.setState({ errorMessage: "" })}/>
            </Card>
        }

      </>
    );
  }

}

export default FileApplicationDetails;