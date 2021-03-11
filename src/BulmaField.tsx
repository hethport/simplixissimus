import React, {ChangeEvent} from "react";
import {ErrorMessage, Field, FieldProps} from "formik";
import classNames from "classnames";

interface CustomFieldProps {
  label: string;
  id: string;
  asTextArea?: boolean;
  required?: boolean;
}

export function BulmaField({label, id, asTextArea, required, field, form, ...props}: CustomFieldProps & FieldProps): JSX.Element {
  const classes = classNames(
    asTextArea ? "textarea" : "input",
    {
      'is-danger': form.touched[field.name] && form.errors[field.name],
      'is-success': form.touched[field.name] && !form.errors[field.name]
    });

  return (
    <div className="field">
      <label htmlFor="id" className="label">{label}{required ? '*' : ''}:</label>
      <div className="control">
        {asTextArea
          ? <Field as="textarea" {...props} {...field} id={id} className={classes} placeholder={label}/>
          : <Field {...props} {...field} id={id} className={classes} placeholder={label}/>
        }
      </div>
      <ErrorMessage name={field.name}>{msg => <p className="help is-danger">{msg}</p>}</ErrorMessage>
    </div>
  );
}

export interface BulmaObjectSelectOption<T> {
  value: T;
  label: string;
}

interface CustomSelectProps<T> {
  label: string;
  id: string;
  currentValue: T;
  options: BulmaObjectSelectOption<T>[];
  onUpdate: (t: T) => void;
}

export function BulmaObjectSelect<T>({label,id, currentValue, options, onUpdate}: CustomSelectProps<T>): JSX.Element {

  function onValueChange(event: ChangeEvent<HTMLSelectElement>) {
    onUpdate(options[event.target.selectedIndex].value);
  }

  return <div className="field">
    <label htmlFor={id} className="label">{label}:</label>
    <div className="control">
      <div className="select is-fullwidth">
        <select id={id} onChange={onValueChange}>
          {options.map(({value, label}, index) =>
            <option key={index} selected={currentValue === value}>{label}</option>
          )}
        </select>
      </div>
    </div>
  </div>
}
