import {MyXmlAttribute, MyXmlDocument, MyXmlElementNode, MyXmlNode, MyXmlPCData, readFileContent} from "./xmlDocument";

function readAttribute(attr: Attr): MyXmlAttribute {
    return {key: attr.name, value: attr.value};
}

function convertNodeToMyXmlNode(node: Node): MyXmlNode | undefined {
    if (node instanceof Element) {
        return {
            type: 'Node',
            tagName: node.tagName,
            childNodes: Array.from(node.childNodes).flatMap((c) => {
                const converted = convertNodeToMyXmlNode(c);
                return converted ? [converted] : [];
            }),
            attributes: Array.from(node.attributes).map(readAttribute),
            isEmpty: node.childNodes.length === 0
        };
    } else if (node instanceof CharacterData) {
        const pcData: MyXmlPCData = {type: '#PCDATA', content: node.data};
        return node.data.trim().length === 0 ? undefined : pcData;
    } else {
        console.error(JSON.stringify(node, null, 2));
        throw new Error('TODO!');
    }
}

export function readXmlString(xmlContent: string): MyXmlNode {
    const xmlDocument: XMLDocument = new DOMParser()
        .parseFromString(xmlContent, 'application/xml');

    return convertNodeToMyXmlNode(xmlDocument.documentElement)!;
}

export async function readXmlFile(file: File): Promise<MyXmlDocument> {
    const fileContent = await readFileContent(file);

    return new MyXmlDocument(file.name, readXmlString(fileContent) as MyXmlElementNode);
}
