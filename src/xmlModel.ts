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
    key: string;
    value: string;
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


// Document

export class MyXmlDocument {
    constructor(
        public name: string,
        public rootNode: MyXmlElementNode,
        public profileName?: string
    ) {}
}

