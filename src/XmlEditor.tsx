import React from 'react';
import {MyXmlDocument} from "./model/xmlDocument";
import './XmlEditor.sass';
import {XmlEditorPane} from './XmlEditorPane';
import {useSelector} from "react-redux";
import {activeDocumentSelector} from "./store/store";
import {FilesMenu} from './FilesMenu';
import {useTranslation} from "react-i18next";

export function XmlEditor(): JSX.Element {

    const {t} = useTranslation('');

    const maybeDocument: MyXmlDocument | undefined = useSelector(activeDocumentSelector);

    return (
        <div className="columns">
            <div className="column is-2">
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
