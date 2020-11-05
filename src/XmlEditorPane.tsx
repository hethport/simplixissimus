import React, {useState} from "react";
import {XmlNodeButton} from "./XmlNodeButton";
import {XmlElementNodeEditForm} from "./XmlElementNodeEditForm";
import {MyXmlDocument, MyXmlElementNode} from "./model/xmlDocument";

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
        <div className="card">
            <div className="card-header">
                <p className="card-header-title">{document.name}</p>
            </div>
            <div className="card-content">
                <div className="columns">
                    <div className="column">
                        <XmlNodeButton node={document.rootNode} toggleNode={handleNodeClick}
                                       currentNode={state.editedNode}/>
                    </div>
                    <div className="column">
                        {state.editedNode &&
                        <XmlElementNodeEditForm node={state.editedNode} updateNode={handleNodeUpdate}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}
