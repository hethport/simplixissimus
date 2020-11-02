import React, {useState} from 'react';
import {MyXmlElementNode, MyXmlNode, readXmlFile, readXmlString} from "./xmlModel";
import './XmlEditor.sass';
import {XmlElementNodeEditForm} from "./XmlElementNodeEditForm";
import {kbo_11_51_xml} from "./kbo_11.51.xml";
import {XmlNodeButton} from "./XmlNodeButton";

interface IState {
    selectedFile?: File;
    readDocument?: MyXmlNode;
    editedNode?: MyXmlElementNode;
}

export function XmlEditor(): JSX.Element {

    const [state, setState] = useState<IState>({
        // TODO: remove field (only for testing purposes)!
        readDocument: readXmlString(kbo_11_51_xml)
    });

    function handleFileSelect(files: FileList | null): void {
        setState((currentState) => {
            return {...currentState, selectedFile: (files && files.length > 0) ? files[0] : undefined};
        });
    }

    async function readFile(): Promise<void> {
        if (!state.selectedFile) {
            alert('Sie haben keine Datei ausgewählt!');
            return;
        }

        const readDocument = await readXmlFile(state.selectedFile);

        setState((currentState) => {
            return {...currentState, readDocument};
        });
    }

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
        <div className="container is-fluid">
            <h1 className="title is-3 has-text-centered">XMLEditor</h1>

            <div className="field">
                <label htmlFor="xmlFile" className="label">Xml Datei:</label>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input type="file" className="input"
                               onChange={(event) => handleFileSelect(event.target.files)}/>
                    </div>
                    <div className="control">
                        <button type="button" onClick={readFile} className="button is-link">Datei einlesen</button>
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <div className="xmlEditor">
                        {state.readDocument &&
                        <XmlNodeButton node={state.readDocument as MyXmlElementNode} toggleNode={handleNodeClick}
                                       currentNode={state.editedNode}/>}
                    </div>
                </div>
                <div className="column">
                    {state.editedNode &&
                    <XmlElementNodeEditForm node={state.editedNode} updateNode={handleNodeUpdate}/>}
                </div>
            </div>

        </div>
    );
}
