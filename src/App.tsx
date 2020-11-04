import React, {useState} from 'react';
import {XmlEditor} from "./XmlEditor";
import {configFormUrl, configsUrl, editorUrl, homeUrl} from './urls';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import {Configs} from './Configs';
import {ConfigForm} from './ConfigForm';
import {Home} from './Home';
import {MyXmlElementNode, MyXmlNode, readXmlString} from "./xmlModel";
import {kbo_11_51_xml} from "./dummyData/kbo_11.51.xml";
import {useTranslation} from "react-i18next";


interface IState {
    readDocument?: MyXmlNode;
}

export function App(): JSX.Element {

    const {t} = useTranslation();

    const [state, setState] = useState<IState>({
        // TODO: remove field (only for testing purposes)!
        readDocument: readXmlString(kbo_11_51_xml)
    });

    function onFileRead(readDocument: MyXmlNode): void {
        setState({readDocument});
    }

    return <>
        <nav className="navbar is-light">
            <div className="navbar-brand">
                <Link to={homeUrl} className="navbar-item">SimpliXissimus</Link>
            </div>

            <div className="navbar-start">
                {state.readDocument && <Link to={editorUrl} className="navbar-item">{t('Editor')}</Link>}
                <Link to={configsUrl} className="navbar-item">{t('Konfigurationen')}</Link>
            </div>
        </nav>

        <div className="container is-fluid">
            <Switch>
                <Route exact path={homeUrl}>
                    <Home onFileRead={onFileRead}/>
                </Route>
                <Route path={editorUrl}>
                    {state.readDocument
                        ? <XmlEditor readDocument={state.readDocument as MyXmlElementNode}/>
                        : <Redirect to={homeUrl}/>}
                </Route>
                <Route path={configsUrl} component={Configs}/>
                <Route path={configFormUrl} component={ConfigForm}/>
            </Switch>
        </div>
    </>

}

