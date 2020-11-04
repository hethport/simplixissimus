import React, {ChangeEvent, useState} from 'react';
import {MyXmlDocument} from "./xmlModel";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {readFileAction, StoreAction} from "./store";
import {Dispatch} from "redux";
import {readXmlFile} from "./xmlReader";

interface IState {
    selectedFile?: File;
}


export function Home(): JSX.Element {

    const {t} = useTranslation();

    const [state, setState] = useState<IState>({});

    const dispatch: Dispatch<StoreAction> = useDispatch<Dispatch<StoreAction>>();

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

        const readDocument: MyXmlDocument = await readXmlFile(state.selectedFile);

        dispatch(readFileAction(readDocument));
    }

    return (
        <div className="container">


            <h2 className="subtitle is-4">{t('Datei öffnen')}</h2>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input type="file" className="input" onChange={handleFileSelect}/>
                </div>
                <div className="control">
                    <button type="button" onClick={readTheFile} className="button is-link">{t('Datei öffnen')}
                    </button>
                </div>
            </div>

        </div>
    );
}
