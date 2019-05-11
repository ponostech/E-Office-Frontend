import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import FormatQuote from "@material-ui/icons/FormatQuote";

import timelineStyle from "../../assets/jss/material-dashboard-pro-react/components/timelineStyle.jsx";
import Avatar from "@material-ui/core/Avatar";
import Badge from "../Badge/Badge";
import {convertToHTML} from "nib-converter";

function Timeline({ ...props }) {
  const { classes, stories, simple } = props;
  const timelineClass =
    classes.timeline +
    " " +
    cx({
      [classes.timelineSimple]: simple
    });
  return (
    <ul style={{marginBottom: 30}} className={timelineClass}>
      {stories.map((prop, key) => {
        const panelClasses =
          classes.timelinePanel +
          " " +
          cx({
            [classes.timelinePanelInverted]: prop.inverted || simple,
            [classes.timelineSimplePanel]: simple
          });
        const timelineBadgeClasses =
          classes.timelineBadge +
          " " +
          classes[prop.badgeColor] +
          " " +
          cx({
            [classes.timelineSimpleBadge]: simple
          });
        return (
          <li className={classes.item} key={key}>
            {prop.badgeIcon ? (
              <div className={timelineBadgeClasses}>
                <prop.badgeIcon className={classes.badgeIcon} />
              </div>
            ) : null}
            <div className={panelClasses}>
              {prop.title ? (
                <div className={classes.timelineHeading}>
                  <Badge color={prop.titleColor} classes={{ badge: classes.timelineTitle }}>{prop.title}</Badge>
                </div>
              ) : null}
              <div className={classes.testimonialIcon}>
                <FormatQuote />
              </div>
                <div className={classes.timelineBody} dangerouslySetInnerHTML={{__html: prop.body}} />
              {prop.footer ? <hr className={classes.footerLine} /> : null}
              {prop.avatar ? (
                    <Avatar alt="" src={prop.avatar} className={classes.avatar} />
              ) : null}
              {prop.footerName ? (
                <h6 className={classes.timelineFooterText}>{prop.footerName}</h6>
              ) : null}
              {prop.footerDesignation ? (
                <h6 className={classes.timelineFooterText}>{prop.footerDesignation}</h6>
              ) : null}
              {prop.footer ? (
                <div className={classes.timelineFooter}>{prop.footer}</div>
              ) : null}
              {prop.footerTitle ? (
                  <h6 className={classes.footerTitle}>{prop.footerTitle}</h6>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool
};

export default withStyles(timelineStyle)(Timeline);
