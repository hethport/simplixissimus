import React from "react";
import classNames from "classnames";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {allDocumentsSelector, currentDocumentNameSelector, openFileAction, StoreAction} from "./store";
import {MyXmlDocument} from "./xmlModel";
import {Dispatch} from "redux";

export function FilesMenu(): JSX.Element {

    const {t} = useTranslation();

    const dispatch = useDispatch<Dispatch<StoreAction>>();

    const activeDocumentName: string | undefined = useSelector(currentDocumentNameSelector);
    const openedFiles: MyXmlDocument[] = useSelector(allDocumentsSelector);

    function openFile(fileName: string): void {
        dispatch(openFileAction(fileName));
    }

    function isActive(fileName: string): boolean {
        return !!activeDocumentName && fileName === activeDocumentName;
    }

    return (
        <div className="panel">
            <p className="panel-heading">{t('Geöffnete Dateien')}</p>
            {openedFiles.map((of) =>
                <div key={of.name} onClick={() => openFile(of.name)} className="panel-block">
                    <button className={classNames('button', 'is-fullwidth', {'is-link': isActive(of.name)})}
                            type="button">{of.name}</button>
                </div>
            )}
            <div className="panel-block">
                <button className="button is-info is-fullwidth" type="button" disabled={true}>+</button>
            </div>
        </div>
    );
}
