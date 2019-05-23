import React, { Component } from "react";
import PropTypes from "prop-types";
import { SiteVerificationService } from "../../../../../services/SiteVerificationService";
import { Card, CardContent, CardHeader, Divider, List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import moment from "moment";

class FileSiteVerifications extends Component {
  siteVerificationService=new SiteVerificationService();
  state={
    data:[],
    loading:true,
    errorMessage:""
  }

  componentDidMount() {
    const { type, file } = this.props;
    let url=`/site-verifications/kiosk/${file.fileable_id}`;
    this.siteVerificationService.all(url,
      errorMessage=>this.setState({errorMessage}),
      data=>this.setState({data}))
      .finally(()=>this.setState({loading:false}))

  }

  render() {
    const { loading } = this.state;
    const { file } = this.props;
    return (
      <Card>
        <CardHeader title={file?file.number:""} subheader={file? "Site verification of "+file.subject:""}/>
        <Divider/>
        <CardContent>
          {
           this.state.data.map(function(item,index) {
             return(
               <DetailViewRow primary={`Created on:${moment(item.created_at).format("Do-MMMM-YYYY")}`}  secondary={"Created by :"}/>
             )
           })
          }
        </CardContent>
        </Card>
    );
  }
}
FileSiteVerifications.defaultProps={
  type:"kiosk"
}
FileSiteVerifications.propTypes={
  type:PropTypes.string.isRequired,
  file:PropTypes.object.isRequired,
}

export default FileSiteVerifications;