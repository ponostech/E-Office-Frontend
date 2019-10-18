import React, { Component } from "reactn";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import PropTypes from "prop-types";
import LoadingView from "../../../../common/LoadingView";
import MUIDataTable from "mui-datatables";
import MessageService from "../../../../../services/MessageService";

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state={
      messages:[]
    }
    this.messageService=new MessageService()
  }

  componentDidMount() {
    this.setGlobal({loading:true})

  }

  render() {
    const { messages } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false
    };
    return (
      <Card>
        <CardHeader title={"Inbox"}/>
        <CardContent>
          {this.global.loading ? <LoadingView/> :
              <MUIDataTable
                title={"SHOP: List of New Application"}
                data={messages}
                columns={tableColumns}
                options={tableOptions}
              />}
        </>

      </Card>
    );
  }
}
Inbox.propTypes={
  file: PropTypes.object.isRequired
}
export default Inbox;