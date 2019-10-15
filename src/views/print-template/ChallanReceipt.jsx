import React from "react";
import moment from "moment";

const style = {
  wrapper: {
    padding: 30,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "100px 2fr 1fr"
  },
  title: {
    textAlign: "center",
    gridColumnStart: 1,
    gridColumnEnd: 3
  },
  description: {
    fontSize: "14px"
  },
  footer: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    display: "flex",
    justifyContent: "bottom",
    alignItems: "center",
    fontSize: "!4px"
  },
  grow: {
    flexGrow: "1"
  }
};
export const ChallanReceipt = ({ challan }) => {
  console.log(challan);
  return (
    <div style={style.wrapper}>
      <div style={style.title}>
        <h3>RECEIPT</h3>
        <h6>Challan No:{challan ? challan.number : ""}</h6>
      </div>
      <div style={style.description}>
        {challan?<p>I received {challan.details} of Amount:
          <span>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumSignificantDigits: 2
          }).format(challan.amount)}
        </span>
        </p>:""}
      </div>
      <div style={style.description}>
        {/*{challan?JSON.stringify(challan):""}*/}
      </div>

      <div style={style.footer}>
        <p>Date: {challan ? moment(challan.created_at).format("DD/MM/YY") : ""}</p>
        <div style={style.grow}/>
        <h6>Authorized Signature</h6>
      </div>

    </div>
  );
};