import React from "react";
import {getDocumentSourceLines, MyXmlDocument} from "../model/xmlDocument";

interface IProps {
  document: MyXmlDocument;
}

export function XmlRenderView({document}: IProps): JSX.Element {
  const source = getDocumentSourceLines(document);
  
  return <>
    {source.map((l, i) => <p key={i}>{l}</p>)}
  </>
}
