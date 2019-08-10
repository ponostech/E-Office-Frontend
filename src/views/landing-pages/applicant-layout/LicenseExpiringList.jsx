import React, {Component} from "reactn";
import {LicenseService} from "../../../services/LicenseService";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import Chip from "@material-ui/core/Chip"

class LicenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permits: []
    };
    this.licenseService = new LicenseService();
  }

  componentDidMount() {
    const {phone} = this.props
    this.licenseService.getRenewablePermitList(phone, errorMsg => this.setGlobal({errorMsg}),
        (permits) => {
          this.setState({permits})
        });
  }

  render() {
    const {permits} = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 10,
      serverSide: false
    };
    const tableColumns = [
      {
        name: 'number',
        label: 'PERMIT NO.'
      }, {
        name: 'approved_at',
        label: 'Date of Approval',
        options: {
          customBodyRender: (val) => {
            return moment(val).format('Do MMMM YYYY (\dddd\)')
          }
        }
      }, {
        name: 'valid_upto',
        label: 'Valid upto',
        options: {
          customBodyRender: (val) => {
            return moment(val).format('Do MMMM YYYY (\dddd\)')
          }
        }
      }, {
        name: 'valid_upto',
        label: 'Permit Status',
        options: {
          customBodyRender: (val) => {
            const valid_upto = moment(val).valueOf()
            const current_time = moment().valueOf()
            return valid_upto < current_time ? <Chip size="small" color='secondary' label="Expired"/> :
                <Chip size="small" color='primary' label="Expiring"/>
          }
        }
      }, {
        name: 'id',
        label: 'Action',
        options: {
          customBodyRender: (val, meta) => {
            const {rowIndex} = meta
            const row = permits[rowIndex]

            return row.permitable_id
          }
        }
      }
    ]

    let found = <MUIDataTable
        title={"PERMIT: List of Expiring/Expired Permit"}
        data={permits}
        columns={tableColumns}
        options={tableOptions}/>;

    return (
        <div>{found}</div>
    );
  }
}

LicenseList.propTypes = {
  // phone: PropTypes.string.isRequired
};

export default LicenseList;