import React, {Component} from 'react';
// import Editor from "nib-core";
import {Editor} from '@tinymce/tinymce-react';

class TextEditor extends Component {
  render() {
    return <Editor apiKey='qulfync0z1y6prrv19isratnaskphp6bdrnacv8yb33g9ntf'
                   init={{
                     plugins: 'print preview searchreplace autolink directionality visualblocks visualchars ' +
                         'fullscreen image link media template codesample table charmap hr pagebreak nonbreaking ' +
                         'anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu' +
                         'colorpicker textpattern help image code',
                     toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | ' +
                         'alignleft aligncenter alignright alignjustify | numlist bullist outdent indent ' +
                         '| removeformat | code'
                   }}
                   onSelectionChange={this.props.onChange}
                   initialValue={this.props.default}/>
  }
}

export default TextEditor;