import React, { Component } from "reactn";
import DetailViewRow from "../../../common/DetailViewRow";
import { Attachment } from "@material-ui/icons";
import { CardHeader, List } from "@material-ui/core";
import ReceiptService from "../../../../../services/ReceiptService";
import LoadingView from "../../../../common/LoadingView";
import ReceiptDetailDialog from "../../../receipt/ReceiptDetailDialog";
import EyeIcon from '@material-ui/icons/RemoveRedEye'
import IconButton from "@material-ui/core/IconButton";

class FileEnclosures extends Component {
  receiptService = new ReceiptService();
  state = {
    receipts: [],
    receipt:null,

    view:false,
  };

  componentDidMount() {
    const { file } = this.props;
    console.log("how many times")

    // this.setGlobal({ loading: true });

    this.receiptService.getByFileId(file.id,
      errorMsg => this.setGlobal({ errorMsg }),
      receipts => this.setState({ receipts }))
      // .finally(() => this.setGlobal({ loading: false }));
  }

  handleView=(receipt)=>{
    this.setState({receipt,view:true})
  }
  render() {
    const { receipts } = this.state;

    return (
      <>
        <CardHeader title='List of File Enclosures'/>
        {
          this.global.loading? <LoadingView/> :
            <List component={"div"}>
              {
                receipts.map(item =>
                  <DetailViewRow onClick={this.handleView.bind(this,item)} icon={<Attachment/>} actionIcon={true} primary={"Receipt No"} secondary={item.number}>
                    <IconButton href={"#"} onClick={this.handleView.bind(this,item)} >
                      <EyeIcon color={"primary"} fontSize={"small"}/>
                    </IconButton>
                  </DetailViewRow>
                )
              }
            </List>
        }
        <ReceiptDetailDialog open={this.state.view} receipt={this.state.receipt} onClose={e=>this.setState({view:false})}/>
      </>
    );
  }
}

export default FileEnclosures;
