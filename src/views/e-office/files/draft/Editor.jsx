import React from "react";
import ReactQuill from "react-quill";
import {withStyles} from "@material-ui/core";

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    editor: {
        minHeight: 200,
    }
};

const modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

const editor = (props) => {
    const {classes} = props;
    return (
        <ReactQuill className={classes.editor} value={props.data} theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder=""/>
    )
};

export default withStyles(styles)(editor);