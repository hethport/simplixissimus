import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik';
import {useTranslation} from "react-i18next";
import {ConfigFormValues, configSchema, convertToConfig} from "./config";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {addConfigAction, StoreAction} from "./store/actions";

export function ConfigForm(): JSX.Element {

    const {t} = useTranslation();

    const [configSaved, setConfigSaved] = useState<boolean>(false);

    const dispatch = useDispatch<Dispatch<StoreAction>>();

    const initialValue: ConfigFormValues = {name: '', inlineElements: ''};

    function onSubmit(values: ConfigFormValues, {setSubmitting}: FormikHelpers<ConfigFormValues>): void {
        const config = convertToConfig(values);

        dispatch(addConfigAction(config));

        setConfigSaved(true);

        setSubmitting(false);
    }

    return (
        <div className="container">
            <h1 className="title is-3 has-text-centered">{t('Neue Konfiguration erstellen')}</h1>

            <Formik initialValues={initialValue} validationSchema={configSchema} onSubmit={onSubmit}>
                {({isSubmitting, touched, errors}) =>

                    <Form>
                        <div className="field">
                            <label htmlFor="name" className="label">{t('Name')}:</label>
                            <div className="control">
                                <Field type="text" name="name" placeholder={t('Name')}
                                       className={classNames("input", {
                                           'is-danger': touched.name && errors.name,
                                           'is-success': touched.name && !errors.name
                                       })}/>
                                <ErrorMessage name="name">
                                    {msg => <p className="help is-danger">{msg}</p>}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="inlineElements" className="label">{t('Inline Elemente')}:</label>
                            <div className="control">
                                <Field type="text" name="inlineElements"
                                       placeholder={t('Inline Elemente, getrennt durch Komma')}
                                       className={classNames("input", {
                                           'is-danger': touched.inlineElements && errors.inlineElements,
                                           'is-success': touched.inlineElements && errors.inlineElements
                                       })}/>
                                <ErrorMessage name="inlineElements">
                                    {msg => <p className="help is-danger">{msg}</p>}
                                </ErrorMessage>
                            </div>
                        </div>

                        {configSaved && <div
                            className="notification is-success">{t('Konfiguration wurde erfolgreich gespeichert')}.</div>}

                        <div className="field">
                            <button type="submit" className="button is-link is-fullwidth"
                                    disabled={isSubmitting || configSaved}>
                                {t('Neue Konfiguration erstellen')}
                            </button>
                        </div>
                    </Form>
                }
            </Formik>

        </div>
    );
}
