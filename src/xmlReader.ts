import {MyXmlAttribute, MyXmlDocument, MyXmlElementNode, MyXmlNode, MyXmlPCData, readFileContent} from "./xmlModel";

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

export async function readXmlFile(file: File): Promise<MyXmlDocument> {
    const fileContent = await readFileContent(file);

    return new MyXmlDocument(file.name, readXmlString(fileContent) as MyXmlElementNode);
}
