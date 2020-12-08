import React from 'react';
import {XmlEditor} from "./XmlEditor";
import {configFormUrl, configsUrl, homeUrl} from './urls';
import {Link, Route, Switch} from 'react-router-dom';
import {Configs} from './Configs';
import {ConfigForm} from './ConfigForm';
import {useTranslation} from "react-i18next";


export function App(): JSX.Element {

    const {t} = useTranslation('');

    return <>
        <nav className="navbar is-light">
            <div className="navbar-brand">
                <Link to={homeUrl} className="navbar-item">SimpliXissimus</Link>
            </div>

            <div className="navbar-start">

                <Link to={configsUrl} className="navbar-item">{t('Konfigurationen')}</Link>
            </div>
        </nav>

        <div className="container is-fluid">
            <Switch>
                <Route path={configsUrl} component={Configs}/>
                <Route path={configFormUrl} component={ConfigForm}/>
                <Route path={homeUrl} component={XmlEditor}/>
            </Switch>
        </div>
    </>

}

