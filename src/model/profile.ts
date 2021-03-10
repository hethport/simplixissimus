import * as yup from 'yup';

interface ReplaceElementConfig {
  keyTag: string;
  replaceWith: string;
}

export interface Profile {
  name: string;
  inlineElements: string[];
  replaceElements: ReplaceElementConfig[];
}

// Creation

export interface ProfileFormValues {
  name: string;
  inlineElements: string;
}

function getInlineElements(valueString: string): string[] {
  return valueString.split(',').map((s) => s.trim());
}

export const configSchema: yup.SchemaOf<ProfileFormValues> = yup.object()
  .shape({
    name: yup.string().min(4).required(),
    inlineElements: yup.string()
      .test('commaSeparated', 'is not comma separated', (value) => {
        if (typeof value === 'string') {
          return getInlineElements(value)
            // TODO: test if element is valid?
            .filter((element) => false)
            .length === 0;
        } else {
          return false;
        }
      })
      .required()
  })
  .required();

export function convertToConfig(configFormValue: ProfileFormValues): Profile {
  return {
    name: configFormValue.name,
    inlineElements: getInlineElements(configFormValue.inlineElements),
    replaceElements: []
  }
}
