import React from 'react';
import DetailViewRow from "../../../common/DetailViewRow";

const fileApplicationDetails = (props) => {
  var fake = [];
  for (let i = 1; i <= 10; i++) {
    fake.push(<DetailViewRow primary={"Application " + i} secondary={"File No. " + i}/>);
  }
  return (
      <>
        <p>This is file Application Details</p>
        {fake}
      </>
  )
};

export default fileApplicationDetails;