import React, {ChangeEvent, useState} from "react";
import {XmlNodeButton} from "./views/XmlNodeButton";
import {MyXmlDocument, MyXmlElementNode} from "./model/xmlDocument";
import {useSelector} from "react-redux";
import {allProfilesSelector, profileByName, StoreState} from "./store/store";
import {Profile} from "./model/profile";
import {ViewType} from "./model/views";
import {EditorView} from "./views/EditorView";
import {TextView} from "./views/TextView";
import {XmlRenderView} from "./views/XmlRenderView";

interface IState {
  editedNode?: MyXmlElementNode;
}

interface IProps {
  document: MyXmlDocument;
  leftViewType: ViewType;
  rightViewType: ViewType;
}

export function XmlEditorPane({document, leftViewType, rightViewType}: IProps): JSX.Element {

  const [state, setState] = useState<IState>({});

  const allProfiles = useSelector(allProfilesSelector);
  const profile: Profile | undefined = useSelector((store: StoreState) => document.profileName ? profileByName(store, document.profileName) : undefined);

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

  function updateProfile(event: ChangeEvent<HTMLSelectElement>): void {
    console.info(event.target.value);
  }

  function renderView(viewType: ViewType): JSX.Element {
    switch (viewType) {
      case ViewType.Editor:
        return <EditorView document={document}/>;
      case ViewType.SimpliXissimus:
        return <XmlNodeButton node={document.rootNode} toggleNode={handleNodeUpdate}/>;
      case ViewType.Text:
        return <TextView document={document}/>;
      case ViewType.XmlRendered:
        return <XmlRenderView document={document}/>;
    }
  }

  return (
    <div>

      <div className="box">
        <div className="columns">
          <div className="column">
            <button className="button is-static is-fullwidth">
              {document.name}
            </button>
          </div>
          <div className="column">
            <div className="select is-fullwidth">
              <select name="profileName" onChange={updateProfile} defaultValue={profile?.name}>
                <option value='--'>--</option>
                {allProfiles.map((profile) =>
                  <option key={profile.name} value={profile.name}>{profile.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column">{renderView(leftViewType)}</div>
        <div className="column">{renderView(rightViewType)}</div>
      </div>
    </div>
  );
}
