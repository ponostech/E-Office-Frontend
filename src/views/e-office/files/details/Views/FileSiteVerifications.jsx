import React from 'react';
import DetailViewRow from "../../../common/DetailViewRow";

const fileSiteVerifications = (props) => {
  var fake = [];
  for (let i = 1; i <= 10; i++) {
    fake.push(<DetailViewRow primary={"Site Verification " + i} secondary={"Click Here. " + i}/>);
  }
  return (
      <>
        <p>This is file site verifications</p>
        {fake}
      </>
  )
};

export default fileSiteVerifications;