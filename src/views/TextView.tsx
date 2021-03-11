import React from "react";
import {getDocumentText, MyXmlDocument} from "../model/xmlDocument";

interface IProps {
  document: MyXmlDocument;
}

export function TextView({document}: IProps): JSX.Element {
  const textLines = getDocumentText(document)

  return <>{textLines.map((l, index) => <p key={index}>{l}</p>)}</>;
}
