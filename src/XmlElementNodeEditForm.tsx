import React from 'react';
import {isElementNode, MyXmlAttribute, MyXmlElementNode, MyXmlNode} from "./model/xmlDocument";
import {useTranslation} from "react-i18next";
import classnames from 'classnames';

interface IProps {
    node: MyXmlElementNode;
    updateNode: (node: MyXmlElementNode) => void;
}


export function XmlElementNodeEditForm({node, updateNode}: IProps) {

  /*
        <div className="columns">
        <div className="column">
          <div className="box">
            {renderView(leftViewType)}
            <XmlNodeButton node={document.rootNode} toggleNode={handleNodeClick}
                           currentNode={state.editedNode}/>
          </div>
        </div>
        <div className="column">
          {state.editedNode &&
          <XmlElementNodeEditForm node={state.editedNode} updateNode={handleNodeUpdate}/>}
        </div>
      </div>
   */

    const {t} = useTranslation('common');

    function addAttribute() {
        node.attributes.push({name: '', value: ''});
        updateNode(node);
    }

    function removeAttribute(index: number): void {
        node.attributes.splice(index);
        updateNode(node);
    }

    /*
    function addChildNode(): void {
        node.childNodes.push({tagName: 'todo', childNodes: [], attributes: []})
        updateNode(node);
    }
     */

    function removeChildNode(index: number): void {
        node.childNodes.splice(index, 1);
        updateNode(node);
    }

    function renderAttributeFields(attr: MyXmlAttribute, index: number): JSX.Element {
        const key = attr.name.trim().length === 0 ? `___${index}` : attr.name;

        return (
            <div key={key} className="field is-grouped">
                <div className="control is-expanded">
                    <input className="input" defaultValue={attr.name} placeholder={t('Schlüssel')}/>
                </div>
                <div className="control">
                    <button className="button is-static" tabIndex={-1}>=</button>
                </div>
                <div className="control is-expanded">
                    <input className="input" defaultValue={attr.value} placeholder={t('Wert')}/>
                </div>
                <div className="control">
                    <button type="button" className="button is-danger" onClick={() => removeAttribute(index)}>X</button>
                </div>
            </div>
        );
    }

    function renderChildNodeField(node: MyXmlNode, index: number): JSX.Element {
        return (
            <div key={index} className={classnames('field is-grouped')}>
                <div className="control is-expanded">
                    <button type="button" className="button is-static is-fullwidth">
                        {isElementNode(node)
                            ? <span>&lt;{node.tagName}&gt;...&lt;{node.tagName}&gt;</span>
                            : node.content}
                    </button>
                </div>
                <div className="control">
                    <button type="button" className="button is-danger" onClick={() => removeChildNode(index)}>X</button>
                </div>
            </div>
        );
    }

    return (
        <div>

            <div className="field">
                <label className="label" htmlFor="tag">{t('Tag')}:</label>
                <div className="control">
                    <input className="input" id="tag" defaultValue={node.tagName}/>
                </div>
            </div>

            <fieldset className="my-3">
                <legend className="label">{t('Attribute')}:</legend>

                {node.attributes.map(renderAttributeFields)}

                <div className="field">
                    <button className="button is-link is-fullwidth"
                            onClick={addAttribute}>{t('Attribut hinzufügen')}</button>
                </div>
            </fieldset>

            <fieldset className="my-3">
                <legend className="label">{t('Kindelemente')}:</legend>

                {node.childNodes.map(renderChildNodeField)}
            </fieldset>

        </div>
    );
}
