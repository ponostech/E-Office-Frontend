import React, {Component} from 'react';
// import Editor from "nib-core";
import {Editor} from '@tinymce/tinymce-react';
import LoadingView from "../../common/LoadingView";

class TextEditor extends Component {
  state = {
    loading: true,
  };

  onLoaded = () => this.setState({loading: false});

  render() {
    const {loading} = this.state;
    let height = this.props.height ? this.props.height : 500;

    return (
        <>
          {loading && <LoadingView/>}
          <Editor apiKey='qulfync0z1y6prrv19isratnaskphp6bdrnacv8yb33g9ntf'
                  init={{
                    plugins: 'print preview searchreplace autolink directionality visualblocks visualchars ' +
                        'fullscreen image link media template codesample table charmap hr pagebreak nonbreaking ' +
                        'anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu' +
                        ' colorpicker textpattern help image code',
                    toolbar: 'fontsizeselect | fontselect | formatselect | bold italic strikethrough forecolor backcolor | link | ' +
                        'alignleft aligncenter alignright alignjustify | numlist bullist outdent indent ' +
                        '| removeformat | code | table',
                    fontsize_formats: "8pt 9pt 10pt 11px 12pt 13pt 14pt 15pt 18pt 24pt 36pt 48px",
                    height: height,
                  }}
                  onInit={this.onLoaded}
                  onChange={this.props.onChange}
                  value={this.props.default}/>
        </>
    )
  }
}

export default TextEditor;