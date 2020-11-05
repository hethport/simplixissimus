import React from 'react';
import {MyXmlDocument} from "./model/xmlDocument";
import './XmlEditor.sass';
import {XmlEditorPane} from './XmlEditorPane';
import {useDispatch, useSelector} from "react-redux";
import {AppThunkDispatch, selectActiveDocument} from "./store/store";
import {FilesMenu} from './FilesMenu';
import {useTranslation} from "react-i18next";
import {openFileAction} from "./store/actions";

export function XmlEditor(): JSX.Element {

    const {t} = useTranslation();

    const maybeDocument: MyXmlDocument | undefined = useSelector(selectActiveDocument);

    const dispatch = useDispatch<AppThunkDispatch>();

    if (maybeDocument) {
        dispatch(openFileAction(maybeDocument.name));
    }

    return (
        <div className="columns">
            <div className="column is-1">
                <FilesMenu/>
            </div>
            <div className="column">
                {maybeDocument
                    ? <XmlEditorPane document={maybeDocument}/>
                    : <div className="notification is-warning has-text-centered">{t('no_document_open')}</div>
                }
            </div>
        </div>
    );
}
