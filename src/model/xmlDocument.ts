// Helper function

export const maxAttrLength = 80;

export function readFileContent(file: File): Promise<string> {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = (event) => resolve(event.target!.result as string);

    fileReader.onerror = (event) => {
      fileReader.abort();
      reject(event.target!.error);
    };

    fileReader.readAsText(file);
  });
}

// Model

export interface MyXmlAttribute {
  name: string;
  value: string;
}

function renderAttribute({name, value}: MyXmlAttribute): string {
  return `${name}="${value}"`
}


export interface MyXmlPCData {
  type: '#PCDATA';
  content: string;
}

export function isPcData(node: MyXmlNode): node is MyXmlPCData {
  return node.type === '#PCDATA';
}


export interface MyXmlElementNode {
  type: 'Node';
  tagName: string;
  childNodes: MyXmlNode[];
  attributes: MyXmlAttribute[];
  isEmpty?: boolean;
}

export function isElementNode(node: MyXmlNode): node is MyXmlElementNode {
  return node.type === 'Node';
}


export type MyXmlNode = MyXmlElementNode | MyXmlPCData;

function getNodeText(node: MyXmlNode): string[] {
  if (isElementNode(node)) {
    return node.childNodes.flatMap(getNodeText);
  } else {
    return [node.content];
  }
}

function getNodeSource(node: MyXmlNode, indentLevel: number = 0): string {
  const indent = ' '.repeat(indentLevel * 2);

  if (isPcData(node)) {
    return indent + node.content;
  }

  const {tagName, childNodes, attributes, isEmpty} = node;

  const renderedAttrs = attributes.length === 0 ? '' : ' ' + attributes.map(renderAttribute).join(' ');

  if (isEmpty) {
    return `${indent}<${tagName}${renderedAttrs}/>`;
  }

  if (childNodes.length === 1 && isPcData(childNodes[0])) {
    return `${indent}<${tagName}${renderedAttrs}>${childNodes[0].content}</${tagName}>`;
  }

  return `${indent}<${tagName}${renderedAttrs}>
${childNodes.map((n) => getNodeSource(n, indentLevel + 1)).join('\n')}
${indent}</${tagName}>`;
}


// Document

export interface MyXmlDocument {
  name: string;
  rootNode: MyXmlElementNode;
  profileName?: string;
}

export function getDocumentText({rootNode}: MyXmlDocument): string[] {
  return getNodeText(rootNode)
    .filter((t) => t.trim().length !== 0);
}

export function getXmlDocumentSource({rootNode}: MyXmlDocument): string {
  return getNodeSource(rootNode);
}

