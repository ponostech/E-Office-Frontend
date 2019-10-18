import React, { Component } from "reactn";
import { Button, Card, CardContent, CardHeader, Fab, Icon } from "@material-ui/core";
import PropTypes from "prop-types";
import LoadingView from "../../../../common/LoadingView";
import MUIDataTable from "mui-datatables";
import MessageService from "../../../../../services/MessageService";
import { tableColumn } from "./MessageUtils";
import SendMessageDialog from "../../dialog/common/SendMessageDialog";

class Sent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      openNew: false
    };
    this.messageService = new MessageService();
  }

  componentDidMount() {
    this.setGlobal({ loading: true });
    const phone = 123232;
    this.messageService.getSent(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      messages => this.setState({ messages }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  sentMessage = () => {

  };
  view = () => {

  };
  reply = () => {

  };

  render() {
    const { messages, openNew } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false
    };
    return (
      <Card>
        <CardHeader title={"Inbox"} action={(
          <Button variant={"outlined"} onClick={event => this.setState({ openNew: true })}>
            Compose
          </Button>
        )}/>
        <CardContent>
          {this.global.loading ? <LoadingView/> :
            <MUIDataTable
              title={"SHOP: List of New Application"}
              data={messages}
              columns={tableColumn(messages, this.view, this.reply)}
              options={tableOptions}
            />}
        </CardContent>
        <SendMessageDialog open={openNew} onClose={() => this.setState({ openNew: false })}
                           onMessageSend={this.sentMessage} application={null}/>

        <Fab variant={"round"} color={"primary"} style={{ position: "absolute", bottom: 150, right: 150 }}
             onClick={e => this.setState({ openNew: true })}>
          <Icon color={"inherit"}>edit</Icon>
        </Fab>
      </Card>
    );
  }
}

Sent.propTypes = {
  file: PropTypes.object.isRequired
};
export default Sent;