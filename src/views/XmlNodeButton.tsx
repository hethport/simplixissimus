import React, {useState} from 'react';
import {
  isElementNode,
  isPcData,
  maxAttrLength,
  MyXmlAttribute,
  MyXmlElementNode,
  MyXmlPCData
} from "../model/xmlDocument";
import classnames from "classnames";

function renderAttributes(attributes: MyXmlAttribute[]): string | null {
  const attributesToRender = attributes
    .filter((attr) => attr.name.trim().length !== 0);

  if (attributesToRender.length === 0) {
    return null;
  } else {
    const renderedAttributes = attributesToRender
      .map(({name, value}) => ` ${name}="${value}"`)
      .join('');

    return renderedAttributes.length > maxAttrLength
      ? `${renderedAttributes.substr(0, maxAttrLength)}...`
      : renderedAttributes;
  }
}


function renderPcDataNode(node: MyXmlPCData): JSX.Element {
  return <input className="input" defaultValue={node.content}/>
}


interface IProps {
  node: MyXmlElementNode;
  toggleNode: (n: MyXmlElementNode) => void;
  currentNode?: MyXmlElementNode;
  displayChildNodes?: boolean;
}

interface IState {
  hideChildNodes: boolean;
}

export function XmlNodeButton({node, toggleNode, currentNode}: IProps): JSX.Element {

  const [state, setState] = useState<IState>({hideChildNodes: false});

  const isActiveNode = currentNode && node === currentNode;

  const buttonClasses = classnames("button", isActiveNode ? ['is-link'] : ['is-outlined', 'is-dark']);

  if (node.isEmpty) {
    return <div className={buttonClasses} onClick={() => toggleNode(node)}>
      &lt;{node.tagName}{renderAttributes(node.attributes)}/&gt;
    </div>
  } else {
    const startButton = <div className={buttonClasses} onClick={() => toggleNode(node)}>
      &lt;{node.tagName}{renderAttributes(node.attributes)}&gt;
    </div>;

    const endButton = <div className={buttonClasses} onClick={() => toggleNode(node)}>
      &lt;/{node.tagName}&gt;
    </div>;

    if (node.childNodes.length === 1 && isPcData(node.childNodes[0])) {
      // Single PCData child
      return (
        <div className="field has-addons">
          <div className="control">{startButton}</div>
          <div className="control">{renderPcDataNode(node.childNodes[0])}</div>
          <div className="control">{endButton}</div>
        </div>
      );
    } else {

      if (state.hideChildNodes) {
        return <div className="field has-addons">
          <div className="control">{startButton}</div>
          <div className="control">
            <button className="button is-warning" onClick={() => setState({hideChildNodes: false})}>
              <span className="is-italic">...</span>
            </button>
          </div>
          <div className="control">{endButton}</div>
        </div>
      } else {
        return <div>
          <div>
            {startButton}
            <button type="button" className="button"
                    onClick={() => setState({hideChildNodes: true})}>Hide...
            </button>
          </div>

          <div className="xmlChildren">
            {node.childNodes.map((childNode, index) =>
              <div key={index}>
                {isElementNode(childNode)
                  ? <XmlNodeButton node={childNode} toggleNode={toggleNode} currentNode={currentNode}/>
                  : <span key={index}> {renderPcDataNode(childNode)}</span>
                }
              </div>
            )}
          </div>

          {endButton}
        </div>
      }
    }
  }
}
