import Dropzone from "react-dropzone";
import React from "react";
import moment from "moment";
import S3FileUpload from "react-s3";
import {
  BUCKET_NAME,
  REGION,
  S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY
} from "../Configuration";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
var uniqid = require("uniqid");
const config = {
  bucketName: BUCKET_NAME,
  dirName: "notesheet-attachments",
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  image: {
    margin: 10,
    width: 100,
    height: 100
  }
});
export const AvatarView = ({ url, onChange }) => {
  const classes = useStyles();

  const onDrop = (acceptedFiles, rejectedFiles) => {
    let file = acceptedFiles[0];
    if (file) {
      let blob = file.slice(0, file.size, file.type);
      let newName =
        Date.now() +
        "-" +
        uniqid() +
        file.name.substr(file.name.lastIndexOf("."), file.name.length);
      let newFile = new File([blob], newName, { type: file.type });

      let loc = moment().format("YYYY-MM");
      config.dirName = `notesheet-attachments/${loc}`;

      S3FileUpload.uploadFile(newFile, config)
        .then(data => {
          onChange(data.location);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <Dropzone multiple={false} accept={"image/*"} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div {...getRootProps()}>
            <Avatar alt={"profile image"} className={classes.image} src={url} />
            <input {...getInputProps()} />
          </div>
        );
      }}
    </Dropzone>
  );
};
