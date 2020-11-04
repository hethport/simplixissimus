import React, {ChangeEvent, useState} from 'react';
import {MyXmlNode, readXmlFile} from "./xmlModel";
import {useTranslation} from "react-i18next";

interface IState {
    selectedFile?: File;
}

interface IProps {
    onFileRead: (readDocument: MyXmlNode) => void;
}

export function Home({onFileRead}: IProps): JSX.Element {

    const {t} = useTranslation();

    const [state, setState] = useState<IState>({});

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

        onFileRead(readDocument);
    }


    return <div className="container">

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
}
