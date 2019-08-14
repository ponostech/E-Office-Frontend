const FIELD_TYPE={
  TEXT:"text",
  PHOTOGRAPH:"photo",
  COORDINATE:"coordinate",
  SELECT:"coordinate",
}
const FillableFieldGenerator=(type)=>{
  let fields;
  switch (type) {
    case "shop":
      fields=[
        {key:"owner",name:"applicantName",label:"Name of Applicant",value:null,type:FIELD_TYPE.TEXT,fillable:true},
        {key:"phone_no",name:"mobile",label:"Phone No",value:null,type:FIELD_TYPE.TEXT,fillable:true},
        {key:"email",name:"email",label:"Email",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"applicant_type",name:"applicantType",label:"Type of Applicant",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"tin_no",name:"tinNo",label:"TIN No",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"cst_no",name:"cstNo",label:"CST No",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"pan_no",name:"panNo",label:"PAN No",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"gst_no",name:"gstNO",label:"GST No",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"photo",name:"photo",label:"Photograph of Applicant",value:"",type:FIELD_TYPE.PHOTOGRAPH,fillable:true},

        {key:"shop_name",name:"shopName",label:"Name of Shop",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"trade_name",name:"tradeName",label:"Name of Trade ",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"address",name:"shopAddress",label:"Address of Proposed Shop",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"local_council",name:"shopLocalCouncil",label:"Local Council of Proposed Shop ",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"location",name:"shopLocation",label:"Location of Proposed Shop",value:"",type:FIELD_TYPE.COORDINATE,fillable:true},
        {key:"estd",name:"estd",label:"Date of Establishment ",value:"",type:FIELD_TYPE.TEXT,fillable:true},
        {key:"details",name:"businessDetail",label:"Detail of Business",value:"",type:FIELD_TYPE.TEXT,fillable:true},
      ]
      break;
    case "hotel":
      fields=[
        {name:"applicantName",label:"Name of Applicant",value:null,type:FIELD_TYPE.TEXT},
        {name:"mobile",label:"Phone No",value:null,type:FIELD_TYPE.TEXT},
        {name:"email",label:"Email",value:"",type:FIELD_TYPE.TEXT},
        {name:"appicantType",label:"Type of Applicant",value:"",type:FIELD_TYPE.TEXT},
        {name:"tinNo",label:"TIN No",value:"",type:FIELD_TYPE.TEXT},
        {name:"cstNo",label:"CST No",value:"",type:FIELD_TYPE.TEXT},
        {name:"panNo",label:"PAN No",value:"",type:FIELD_TYPE.TEXT},
        {name:"gstNO",label:"GST No",value:"",type:FIELD_TYPE.TEXT},
        {name:"photo",label:"Photograph of Applicant",value:"",type:FIELD_TYPE.PHOTOGRAPH},

        {name:"shopName",label:"Name of Shop",value:"",type:FIELD_TYPE.TEXT},
        {name:"tradeName",label:"Name of Trade ",value:"",type:FIELD_TYPE.TEXT},
        {name:"shopAddress",label:"Address of Proposed Shop",value:"",type:FIELD_TYPE.TEXT},
        {name:"shopLocalCouncil",label:"Local Council of Proposed Shop ",value:"",type:FIELD_TYPE.TEXT},
        {name:"shopLocation",label:"Location of Proposed Shop",value:"",type:FIELD_TYPE.COORDINATE},
        {name:"estd",label:"Date of Establishment ",value:"",type:FIELD_TYPE.TEXT},
        {name:"businessDetail",label:"Detail of Business",value:"",type:FIELD_TYPE.TEXT},
      ]
      break;
    case "banner":
      fields=[]
      break;
    case "hoarding":
      fields=[]
      break;
    case "kiosk":
      fields=[]
      break;
    default:
      fields=[]
      break;

  }
  return fields
}

export default FillableFieldGenerator;