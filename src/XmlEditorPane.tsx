import React, {useState} from "react";
import {XmlNodeButton} from "./XmlNodeButton";
import {XmlElementNodeEditForm} from "./XmlElementNodeEditForm";
import {MyXmlDocument, MyXmlElementNode} from "./xmlModel";

interface IState {
    editedNode?: MyXmlElementNode;
}

interface IProps {
    document: MyXmlDocument;
}

export function XmlEditorPane({document}: IProps): JSX.Element {

    const [state, setState] = useState<IState>({});

    function handleNodeClick(node: MyXmlElementNode): void {
        setState((currentState) => {
            const editedNode = currentState.editedNode && currentState.editedNode === node ? undefined : node;
            return {...currentState, editedNode};
        });
    }

    function handleNodeUpdate(node: MyXmlElementNode): void {
        setState((currentState) => {
            return {...currentState, editedNode: node};
        });
    }

    return (
        <div className="columns">
            <div className="column">
                <div className="xmlEditor">
                    <XmlNodeButton node={document.rootNode} toggleNode={handleNodeClick}
                                   currentNode={state.editedNode}/>
                </div>
            </div>
            <div className="column">
                {state.editedNode &&
                <XmlElementNodeEditForm node={state.editedNode} updateNode={handleNodeUpdate}/>}
            </div>
        </div>
    )
}
