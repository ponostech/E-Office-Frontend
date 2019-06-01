import React from 'react';
import DetailViewRow from "../../../common/DetailViewRow";
import {CardHeader, List} from "@material-ui/core";
import {Attachment} from "@material-ui/icons";

const fileEnclosures = (props) => {
  var fake = [];
  for (let i = 1; i <= 10; i++) {
    fake.push(<DetailViewRow icon={<Attachment/>} actionIcon={true} primary={"Enclosure " + i} secondary="File No."/>);
  }
  return (
      <>
        <CardHeader title='List of File Enclosures'/>
        <List>{fake}</List>
      </>
  )
};

export default fileEnclosures;