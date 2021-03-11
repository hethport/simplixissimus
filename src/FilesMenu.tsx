import React, {ChangeEvent, createRef} from "react";
import classNames from "classnames";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {activeDocumentSelector, allDocumentsSelector, AppThunkDispatch} from "./store/store";
import {MyXmlDocument} from "./model/xmlDocument";
import {readXmlFile} from "./model/xmlReader";
import {openFileAction, readFileAction} from "./store/actions";
import {ViewType} from "./model/views";
import {IStateUpdate} from "./XmlEditor";
import {BulmaObjectSelect} from "./BulmaField";

interface IProps {
  currentLeftView: ViewType;
  currentRightView: ViewType;
  updateViews: (s: IStateUpdate) => void;
}

const viewOptions: { value: ViewType, label: string }[] = [
  {value: ViewType.Editor, label: 'Editor'},
  {value: ViewType.XmlRendered, label: 'XmlRendered'},
  {value: ViewType.SimpliXissimus, label: 'SimpliXissimus'},
  {value: ViewType.Text, label: 'Text'}
];

export function FilesMenu({currentLeftView, currentRightView, updateViews}: IProps): JSX.Element {

  const {t} = useTranslation('');
  const dispatch = useDispatch<AppThunkDispatch>();
  const activeDocument: MyXmlDocument | undefined = useSelector(activeDocumentSelector);
  const openedFiles: MyXmlDocument[] = useSelector(allDocumentsSelector);

  /**
   * @deprecated
   */
  const fileInputRef = createRef<HTMLInputElement>();

  function openFile(fileName: string): void {
    dispatch(openFileAction(fileName));
  }

  function isActive(fileName: string): boolean {
    return !!activeDocument && fileName === activeDocument.name;
  }

  function handlePlusButtonClick(): void {
    fileInputRef.current!.click();
  }

  async function handleFileInputChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0) {
      const readDocument: MyXmlDocument = await readXmlFile(fileList[0]);

      dispatch(readFileAction(readDocument));
    }
  }

  return (
    <>
      <div className="block">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{t('Geöffnete Dateien')}</p>
          </header>
          <div className="card-content">
            {openedFiles.map((of) =>
              <p key={of.name}>
                <a onClick={() => openFile(of.name)} className={classNames({'is-active': isActive(of.name)})}>
                  {of.name}
                </a>
              </p>
            )}

            <div className="my-3">
              <input hidden={true} type="file" ref={fileInputRef} onChange={handleFileInputChange}/>
              <button className="button is-info is-fullwidth" type="button" onClick={handlePlusButtonClick}>+</button>
            </div>
          </div>
        </div>
      </div>

      {activeDocument && <div className="block">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{t('currentFile')}:&nbsp;<code>{activeDocument?.name}</code></p>
          </header>


          <div className="card-content">
            <BulmaObjectSelect label={t('leftView')} id="leftView" currentValue={currentLeftView} options={viewOptions}
                               onUpdate={(value) => updateViews({leftViewType: value})}/>

            <BulmaObjectSelect label={t('rightView')} id="rightView" currentValue={currentRightView} options={viewOptions}
                               onUpdate={(value) => updateViews({rightViewType: value})}/>
          </div>
        </div>
      </div>}
    </>
  );
}
