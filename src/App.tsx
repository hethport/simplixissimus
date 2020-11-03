import React, {ChangeEvent, useState} from 'react';
import {XmlEditor} from "./XmlEditor";
import {MyXmlElementNode, MyXmlNode, readXmlFile, readXmlString} from "./xmlModel";
import {kbo_11_51_xml} from "./kbo_11.51.xml";
import {useTranslation} from "react-i18next";
import {homeUrl} from './urls';
import {Link} from 'react-router-dom';

interface IState {
    selectedFile?: File;
    readDocument?: MyXmlNode;
}

export function App(): JSX.Element {

    const {t} = useTranslation();

    const [state, setState] = useState<IState>({
        // TODO: remove field (only for testing purposes)!
        readDocument: readXmlString(kbo_11_51_xml)
    });

    function handleFileSelect(event: ChangeEvent<HTMLInputElement>): void {
        const fileList = event.target.files;

        if (fileList && fileList.length > 0) {
            setState((currentState) => {
                return {...currentState, selectedFile: fileList[0]};
            });
        }
    }

    async function readTheFile(): Promise<void> {
        if (!state.selectedFile) {
            alert(t('Sie haben keine Datei ausgewählt!'));
            return;
        }

        const readDocument = await readXmlFile(state.selectedFile);

        setState((currentState) => {
            return {...currentState, readDocument};
        });
    }

    return <>
        <nav className="navbar is-light">
            <div className="navbar-brand">
                <Link to={homeUrl} className="navbar-item">SimpliXissimus</Link>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input type="file" className="input" onChange={handleFileSelect}/>
                        </div>
                        <div className="control">
                            <button type="button" onClick={readTheFile} className="button is-link">Datei einlesen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div className="container is-fluid">
            {state.readDocument && <XmlEditor readDocument={state.readDocument as MyXmlElementNode}/>}
        </div>
    </>
}

