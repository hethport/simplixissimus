import {object as yupObject, ObjectSchema, string as yupString} from 'yup';

interface ReplaceElementConfig {
    keyTag: string;
    replaceWith: string;
}

export interface Config {
    name: string;
    inlineElements: string[];
    replaceElements: ReplaceElementConfig[];
}

// Creation

export interface ConfigFormValues {
    name: string;
    inlineElements: string;
}

function getInlineElements(valueString: string): string[] {
    return valueString.split(',').map((s) => s.trim());
}

export const configSchema: ObjectSchema<ConfigFormValues> = yupObject<ConfigFormValues>()
    .shape({
        name: yupString()
            .min(4)
            .required(),
        inlineElements: yupString()
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

export function convertToConfig(configFormValue: ConfigFormValues): Config {
    return {
        name: configFormValue.name,
        inlineElements: getInlineElements(configFormValue.inlineElements),
        replaceElements: []
    }
}
