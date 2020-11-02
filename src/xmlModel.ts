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

function readAttribute(attr: Attr): MyXmlAttribute {
    return new MyXmlAttribute(attr.name, attr.value);
}

function convertNodeToMyXmlNode(node: Node): MyXmlNode | undefined {
    if (node instanceof Element) {
        return new MyXmlElementNode(
            node.tagName,
            Array.from(node.childNodes).flatMap((c) => {
                const converted = convertNodeToMyXmlNode(c);
                return converted ? [converted] : [];
            }),
            Array.from(node.attributes).map(readAttribute),
            node.childNodes.length === 0
        )
    } else if (node instanceof CharacterData) {
        return node.data.trim().length === 0 ? undefined : new MyXmlPCData(node.data);
    } else {
        console.error(JSON.stringify(node, null, 2));
        throw new Error('TODO!');
    }
}

export function readXmlString(xmlContent: string): MyXmlNode {
    const xmlDocument: XMLDocument = new DOMParser().parseFromString(xmlContent, 'application/xml');

    return convertNodeToMyXmlNode(xmlDocument.documentElement)!;
}

export async function readXmlFile(file: File): Promise<MyXmlNode> {
    const fileContent = await readFileContent(file);

    return readXmlString(fileContent);
}
