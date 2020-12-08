import React from 'react';
import {Profile} from './model/profile';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {configFormUrl} from './urls';
import {useSelector} from "react-redux";
import {allProfilesSelector} from "./store/store";

export function Configs(): JSX.Element {

    const {t} = useTranslation('');

    const configs: Profile[] = useSelector(allProfilesSelector);

    function renderConfigs(configs: Profile[]): JSX.Element {
        return <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th>{t('Name')}</th>
                    <th>{t('Inline Elemente')}</th>
                    <th>{t('Replacer')}</th>
                </tr>
            </thead>
            <tbody>
                {configs.map((config) =>
                    <tr key={config.name}>
                        <td>{config.name}</td>
                        <td>{config.inlineElements.join(', ')}</td>
                        <td>{config.replaceElements}</td>
                    </tr>
                )}
            </tbody>
        </table>
    }

    return (
        <div className="container">
            {configs.length > 0
                ? renderConfigs(configs)
                : <div className="notification is-warning">{t('Keine Konfigurationen gefunden')}!</div>
            }

            <div className="my-3">
                <Link to={configFormUrl}
                      className="button is-link is-fullwidth">{t('Neue Konfiguration erstellen')}</Link>
            </div>
        </div>
    );
}
