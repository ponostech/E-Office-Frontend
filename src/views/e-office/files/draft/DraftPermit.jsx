import React from 'react';
import 'react-quill/dist/quill.snow.css';
import Editor from "./Editor";
import {Button, CardHeader} from "@material-ui/core";

const data = `
<p><b>This text is bold</b></p>
<p><i>This text is italic</i></p>
<p>This is<sub> subscript</sub> and <sup>superscript</sup></p>
<p style="font-size:18pt">Text size using points.</p>
<p style="font-size:18px">Text size using pixels.</p>
<p style="font-size:larger">Text size using relative sizes.</p>
<p style="font-family:Georgia, Garamond, Serif;">Preferred serif font.</p>
<pre>Preformatted text 
displays just 
  as you 
type it...
  ...line breaks,
   spaces... 
  ...and all!\t
</pre>
<p>Here's a blockquote:</p>
<blockquote>Contents should not be swallowed. This is due to the enormous amount of harmful chemicals that has gone into this burger.</blockquote>
<p>That was a blockquote.</p>
`;

const draftPermit = (props) => {
  return (
      <>
        <CardHeader title={"File No.: " + props.file.number} subheader={"Subject: " + props.file.subject}/>
        <Editor data={data}/>
        <Button variant="outlined" color="primary">Save</Button>
        <Button variant="outlined" color="secondary">Cancel</Button>
      </>
  );
};
export default draftPermit;
