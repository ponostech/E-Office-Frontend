import React, { Component } from "reactn";
import DetailViewRow from "../../../common/DetailViewRow";
import { Attachment } from "@material-ui/icons";
import { CardHeader, List } from "@material-ui/core";
import ReceiptService from "../../../../../services/ReceiptService";
import LoadingView from "../../../../common/LoadingView";
import ReceiptDetailDialog from "../../../receipt/ReceiptDetailDialog";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";

class FileEnclosures extends Component {
  receiptService = new ReceiptService();
  state = {
    receipts: [],
    receipt: null,

    view: false
  };

  componentDidMount() {
    const { file } = this.props;

    // this.setGlobal({ loading: true });

    this.receiptService.getByFileId(file.id,
      errorMsg => this.setGlobal({ errorMsg }),
      receipts => this.setState({ receipts }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  handleView = (receipt) => {
    this.setState({ receipt, view: true });
  };

  render() {
    const { receipts } = this.state;

    return (
      <>
        <CardHeader title='List of File Enclosures'/>
        <Divider component={"div"}/>
        {
          this.global.loading ? <LoadingView/> :
            <List component={"div"}>
              {
                receipts.length === 0 ?
                  <p>File enclosure not available</p> :
                  receipts.map(item =>
                    <DetailViewRow onClick={this.handleView.bind(this, item)} icon={<Attachment/>} actionIcon={true}
                                   primary={"Receipt No"} secondary={item.number}>
                      <IconButton href={"#"} onClick={this.handleView.bind(this, item)}>
                        <Icon>keyboard_arrow_right</Icon>
                      </IconButton>
                    </DetailViewRow>
                  )
              }
            </List>
        }
        <ReceiptDetailDialog open={this.state.view} receipt={this.state.receipt}
                             onClose={e => this.setState({ view: false })}/>
      </>
    );
  }
}

export default FileEnclosures;
