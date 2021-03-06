import {
  infoColor,
  primaryColor,
  successColor,
  dangerColor,
  warningColor,
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb
} from "../../../../assets/jss/material-dashboard-pro-react.jsx";

const timelineStyle = theme => ({
  timeline: {
    [theme.breakpoints.down("sm")]: {
      "&:before": {
        left: "5% !important"
      }
    },
    listStyle: "none",
    padding: "0 0 10px",
    position: "relative",
    marginTop: "0px",
    "&:before": {
      top: "50px",
      bottom: "0",
      position: "absolute",
      content: '" "',
      width: "3px",
      backgroundColor: grayColor[11],
      left: "50%",
      marginLeft: "-1px"
    }
  },
  timelineSimple: {
    "&:before": {
      left: "5%"
    }
  },
  item: {
    marginBottom: "10px",
    position: "relative",
    "&:before,&:after": {
      content: '" "',
      display: "table"
    },
    "&:after": {
      clear: "both"
    }
  },
  timelineBadge: {
    [theme.breakpoints.down("sm")]: {
      left: "5% !important"
    },
    color: whiteColor,
    width: "50px",
    height: "50px",
    lineHeight: "51px",
    fontSize: "1.6em",
    textAlign: "center",
    position: "absolute",
    top: "16px",
    left: "50%",
    marginLeft: "-24px",
    zIndex: "100",
    borderTopRightRadius: "50%",
    borderTopLeftRadius: "50%",
    borderBottomRightRadius: "50%",
    borderBottomLeftRadius: "50%"
  },
  timelineSimpleBadge: {
    left: "5%"
  },
  info: {
    backgroundColor: infoColor[0],
    boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.4)"
  },
  success: {
    backgroundColor: successColor[0],
    boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.4)"
  },
  danger: {
    backgroundColor: dangerColor[0],
    boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.4)"
  },
  warning: {
    backgroundColor: warningColor[0],
    boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.4)"
  },
  primary: {
    backgroundColor: primaryColor[0],
    boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.4)"
  },
  badgeIcon: {
    width: "24px",
    height: "51px"
  },
  timelinePanel: {
    [theme.breakpoints.down("sm")]: {
      float: "right !important",
      width: "86% !important",
      "&:before": {
        borderLeftWidth: "0 !important",
        borderRightWidth: "15px !important",
        left: "-15px !important",
        right: "auto !important"
      },
      "&:after": {
        borderLeftWidth: "0 !important",
        borderRightWidth: "14px !important",
        left: "-14px !important",
        right: "auto !important"
      }
    },
    width: "45%",
    float: "left",
    padding: "20px",
    marginBottom: "10px",
    position: "relative",
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    borderRadius: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: whiteColor,
    "&:before": {
      position: "absolute",
      top: "26px",
      right: "-15px",
      display: "inline-block",
      borderTop: "15px solid transparent",
      borderLeft: "15px solid " + grayColor[10],
      borderRight: "0 solid " + grayColor[10],
      borderBottom: "15px solid transparent",
      content: '" "'
    },
    "&:after": {
      position: "absolute",
      top: "27px",
      right: "-14px",
      display: "inline-block",
      borderTop: "14px solid transparent",
      borderLeft: "14px solid " + whiteColor,
      borderRight: "0 solid " + whiteColor,
      borderBottom: "14px solid transparent",
      content: '" "'
    }
  },
  timelineSimplePanel: {
    width: "86%",
  },
  draft: {
    backgroundColor: "#ffffd4 !important",
  },
  timelinePanelInverted: {
    [theme.breakpoints.up("sm")]: {
      float: "right",
      backgroundColor: "#eafeea",
      "&:before": {
        borderLeftWidth: "0",
        borderRightWidth: "15px",
        left: "-15px",
        right: "auto"
      },
      "&:after": {
        borderLeftWidth: "0",
        borderRightWidth: "14px",
        left: "-14px",
        right: "auto",
        borderRightColor: "#eafeea"
      }
    }
  },
  eventTimelinePanelInverted: {
    padding: "10px 20px 20px",
    [theme.breakpoints.up("sm")]: {
      float: "right",
      backgroundColor: warningColor[6],
      "&:before": {
        borderLeftWidth: "0",
        borderRightWidth: "15px",
        left: "-15px",
        right: "auto"
      },
      "&:after": {
        borderLeftWidth: "0",
        borderRightWidth: "14px",
        left: "-14px",
        right: "auto",
        borderRightColor: warningColor[6]
      }
    }
  },
  timelineHeading: {
    marginBottom: "15px",
  },
  timelineTitle: {
    fontSize: "12px"
  },
  timelineBody: {
    // fontSize: "15px",
    lineHeight: "28px",
    color: "#666666",
    paddingBottom: "4px",
  },
  eventTimelineBody: {
    paddingBottom: 0,
    lineHeight: "28px",
    color: "#333",
  },
  timelineFooter: {
    zIndex: "1000",
    position: "relative",
    float: "left",
  },
  footerTitle: {
    color: blackColor,
    fontWeight: "200",
    margin: "4px 0px 0px",
    fontSize: "0.8em"
  },
  eventFooterTitle: {
    color: blackColor,
    fontWeight: "200",
    margin: "0",
    fontSize: "0.8em"
  },
  footerLine: {
    marginTop: "10px",
    marginBottom: "5px"
  },
  testimonialIcon: {
    marginTop: "0",
    "& svg": {
      width: "40px",
      height: "40px"
    },
    color: grayColor[0]
  },
  avatar: {
    clear: "block",
    marginTop: "4px"
  },
  timelineFooterText: {
    lineHeight: 1,
    margin: "10px 0 0"
  },
  "@media print": {
    timelineBadge: {
      display: 'none',
    },
    timelineSimple: {
      "&:before": {
        left: "0",
      }
    },
    timelineSimpleBadge: {
      left: 0,
      display:"none",
    },
    timelineSimplePanel: {
      width: '100%',
    },
    timeline: {
      left: 0,
      padding: 0,
      margin: 0,
    },
    timelineHeading: {
      padding: 0,
      margin: 0,
    },
    timelinePanel: {
      width: "100%",
      padding: 10,
      margin: 0,
    },
    timelineBody: {
      padding: 10,
      margin: 0,
      width: "100%",
    },
    eventTimelineBody: {
      padding: 10,
      margin: 0,
      width: "100%",
    },
  }
});

export default timelineStyle;
