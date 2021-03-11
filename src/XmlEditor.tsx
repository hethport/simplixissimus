import React, {useState} from 'react';
import {MyXmlDocument} from "./model/xmlDocument";
import './XmlEditor.sass';
import {XmlEditorPane} from './XmlEditorPane';
import {useSelector} from "react-redux";
import {activeDocumentSelector} from "./store/store";
import {FilesMenu} from './FilesMenu';
import {useTranslation} from "react-i18next";
import {ViewType} from "./model/views";

interface IState {
  leftViewType: ViewType;
  rightViewType: ViewType;
}

export interface IStateUpdate {
  leftViewType?: ViewType;
  rightViewType?: ViewType;
}

function createIState(leftViewType: ViewType = ViewType.XmlRendered, rightViewType: ViewType = ViewType.Editor): IState {
  return {leftViewType, rightViewType};
}

export function XmlEditor(): JSX.Element {

  const {t} = useTranslation('');
  const maybeDocument: MyXmlDocument | undefined = useSelector(activeDocumentSelector);
  const [state, setState] = useState<IState>(createIState());

  function setViews({leftViewType: newLeftViewType, rightViewType: newRightViewType}: IStateUpdate): void {
    setState(({leftViewType, rightViewType}) => createIState(newLeftViewType || leftViewType, newRightViewType || rightViewType));
  }

  return (
    <div className="columns">
      <div className="column is-2">
        <FilesMenu currentLeftView={state.leftViewType} currentRightView={state.rightViewType} updateViews={setViews}/>
      </div>
      <div className="column">
        {maybeDocument
          ? <XmlEditorPane document={maybeDocument} leftViewType={state.leftViewType} rightViewType={state.rightViewType}/>
          : <div className="notification is-warning has-text-centered">{t('no_document_open')}</div>
        }
      </div>
    </div>
  );
}
