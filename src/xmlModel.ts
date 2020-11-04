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

export class MyXmlPCData {
    constructor(public content: string) {}
}

export class MyXmlAttribute {
    constructor(
        public key: string,
        public value: string
    ) {}

    charCount(): number {
        return this.key.length + (this.value.length > maxAttrLength ? 3 : this.value.length);
    }
}

export class MyXmlElementNode {
    constructor(
        public tagName: string,
        public childNodes: MyXmlNode[],
        public attributes: MyXmlAttribute[],
        public isEmpty: boolean = false
    ) {}
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

