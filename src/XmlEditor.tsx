import React, {useState} from 'react';
import {MyXmlElementNode} from "./xmlModel";
import './XmlEditor.sass';
import {XmlElementNodeEditForm} from "./XmlElementNodeEditForm";
import {XmlNodeButton} from "./XmlNodeButton";

interface IState {
    editedNode?: MyXmlElementNode;
}

interface IProps {
    readDocument: MyXmlElementNode;
}

export function XmlEditor({readDocument}: IProps): JSX.Element {

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
                    <XmlNodeButton node={readDocument} toggleNode={handleNodeClick} currentNode={state.editedNode}/>
                </div>
            </div>
            <div className="column">
                {state.editedNode &&
                <XmlElementNodeEditForm node={state.editedNode} updateNode={handleNodeUpdate}/>}
            </div>
        </div>
    );
}
