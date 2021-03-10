import React, {ChangeEvent, createRef} from "react";
import classNames from "classnames";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {allDocumentsSelector, AppThunkDispatch, currentDocumentNameSelector} from "./store/store";
import {MyXmlDocument} from "./model/xmlDocument";
import {readXmlFile} from "./model/xmlReader";
import {openFileAction, readFileAction} from "./store/actions";

export function FilesMenu(): JSX.Element {

  const {t} = useTranslation('');

  const fileInputRef = createRef<HTMLInputElement>();

  const dispatch = useDispatch<AppThunkDispatch>();

  const activeDocumentName: string | undefined = useSelector(currentDocumentNameSelector);
  const openedFiles: MyXmlDocument[] = useSelector(allDocumentsSelector);

  function openFile(fileName: string): void {
    dispatch(openFileAction(fileName));
  }

  function isActive(fileName: string): boolean {
    return !!activeDocumentName && fileName === activeDocumentName;
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
    <div className="panel">
      <p className="panel-heading">{t('Geöffnete Dateien')}</p>
      {openedFiles.map((of) => {
          const classes = classNames('button', 'is-fullwidth', {'is-link': isActive(of.name)});

          return <div key={of.name} onClick={() => openFile(of.name)} className="panel-block">
            <button className={classes} type="button">{of.name}</button>
          </div>
        }
      )}
      <div className="panel-block">
        <input hidden={true} type="file" ref={fileInputRef} onChange={handleFileInputChange}/>
        <button className="button is-info is-fullwidth" type="button" onClick={handlePlusButtonClick}>+</button>
      </div>
    </div>
  );
}
