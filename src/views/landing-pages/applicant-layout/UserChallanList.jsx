import React, { Component } from "reactn";
import moment from "moment";
import { Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";

import ChallanService from "../../../services/ChallanService";

class UserChallanList extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedChallan:null,
      challans:[]
    }
    this.challanService = new ChallanService();
  }

  componentDidMount() {
    const { phone } = this.props;
    this.setGlobal({loading:true})
    this.challanService.getUserChallan(phone,
      errorMsg=>this.setGlobal({errorMsg}),
      challans=>this.setState({challans}))
      .finally(()=>this.setGlobal({loading:false}))
  }

  render() {
    const { challans } = this.state;

    const tableColumns = [
      {
        name: "number",
        label: "CHALLAN NO"
      }, {
        name: "type",
        label: "TYPE OF CHALLAN"
      }, {
        name: "details",
        label: "DETAIL"
      }, {
        name: "amount",
        label: "AMOUNT",
        options: {
          customBodyRender: (rate, tableMeta) => new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumSignificantDigits: 2
          }).format(rate)

        }
      },{
        name: "status",
        label: "STATUS",
        options: {
          customBodyRender: (val, tableMeta) => <Chip component={"div"} color={val==="paid"?"primary":"secondary"} label={val}/>
        }
      }, {
        name: "created_at",
        label: "CREATED AT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return moment(value).format("Do MMMM YYYY");
          }
        }
      }, {
        name: "id",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const selectedChallan = challans[rowIndex];

            let viewBtn = (
              <>
                <Tooltip title={"Pay By Online"}>
                  <IconButton href={"#"} size='small ' onClick={(e) => {
                    this.setState({ selectedChallan });
                  }}>
                    <Icon fontSize="small" color={"primary"}>credit_card</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );

            return (viewBtn);
          }
        }
      }
    ];

    const tableOptions = {
      filterType: "dropdown",
      rowsPerPage: 15,
      serverSide: false,
      responsive: "scroll"
    };
    return (
      <Card>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"LIST OF CHALLAN"}
            data={challans}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}
        </Card>
    );
  }
}
UserChallanList.propTypes={
  phone:PropTypes.string.isRequired
}

export default UserChallanList;