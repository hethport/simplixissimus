import React, {useState} from 'react';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import {useTranslation} from "react-i18next";
import {configSchema, convertToConfig, ProfileFormValues} from "./model/profile";
import {useDispatch} from "react-redux";
import {addConfigAction} from "./store/actions";
import {AppThunkDispatch} from "./store/store";
import {BulmaField} from "./BulmaField";

export function ConfigForm(): JSX.Element {

  const {t} = useTranslation('');
  const [configSaved, setConfigSaved] = useState<boolean>(false);
  const dispatch = useDispatch<AppThunkDispatch>();

  const initialValue: ProfileFormValues = {name: '', inlineElements: ''};

  function onSubmit(values: ProfileFormValues, {setSubmitting}: FormikHelpers<ProfileFormValues>): void {
    dispatch(addConfigAction(convertToConfig(values)));

    setConfigSaved(true);

    setSubmitting(false);
  }

  return (
    <div className="container">
      <h1 className="title is-3 has-text-centered">{t('Neue Konfiguration erstellen')}</h1>

      <Formik initialValues={initialValue} validationSchema={configSchema} onSubmit={onSubmit}>
        {({isSubmitting}) =>

          <Form>
            <Field name="name" id="name" label={t('Name')} component={BulmaField}/>

            <Field name="inlineElements" id="inlineElements" label={t('Inline Elemente, getrennt durch Komma')} component={BulmaField}/>

            {configSaved && <div
              className="notification is-success">{t('Konfiguration wurde erfolgreich gespeichert')}.</div>}

            <button type="submit" className="button is-link is-fullwidth" disabled={isSubmitting || configSaved}>
              {t('Neue Konfiguration erstellen')}
            </button>

          </Form>
        }
      </Formik>

    </div>
  );
}
