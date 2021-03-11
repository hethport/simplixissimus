import React, {useState} from "react";
import './EditorView.sass';
import {getXmlDocumentSource, MyXmlDocument} from "../model/xmlDocument";
import {Controlled as CodeMirror} from "react-codemirror2";
import {EditorConfiguration} from "codemirror";

import 'codemirror/theme/neo.css';
import 'codemirror/mode/xml/xml';

interface IProps {
  document: MyXmlDocument;
}

export function EditorView({document}: IProps): JSX.Element {

  const [state, setState] = useState<string>(getXmlDocumentSource(document));

  const options: EditorConfiguration = {
    mode: 'xml',
    theme: 'neo',
    lineNumbers: true,
    lineWrapping: true
  };

  return <CodeMirror value={state} options={options} onBeforeChange={(_e, _d, v) => setState(v)} onChange={() => {}}/>;
}
