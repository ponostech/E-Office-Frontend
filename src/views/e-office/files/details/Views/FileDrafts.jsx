import React from 'react';
import DetailViewRow from "../../../common/DetailViewRow";

const fileDrafts = (props) => {
  var fake = [];
  for (let i = 1; i <= 10; i++) {
    fake.push(<DetailViewRow primary={"Draft " + i} secondary="File No."/>);
  }
  return (
      <>
        <p>This is file Drafts</p>
        {fake}
      </>
  )
};

export default fileDrafts;