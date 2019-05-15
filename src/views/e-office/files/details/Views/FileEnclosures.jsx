import React from 'react';
import DetailViewRow from "../../../common/DetailViewRow";

const fileEnclosures = (props) => {
  var fake = [];
  for (let i = 1; i <= 10; i++) {
    fake.push(<DetailViewRow primary={"Enclosure " + i} secondary="File No."/>);
  }
  return (
      <>
        <p>This is file Enclosures</p>
        {fake}
      </>
  )
};

export default fileEnclosures;