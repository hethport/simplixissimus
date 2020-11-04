export const homeUrl = '/';

export const editorUrlPattern = '/editor/:documentName';

export function editorUrl(documentName: string): string {
    return `/editor/${documentName}`;
}

export interface EditorUrlParams {
    documentName: string;
}

export const configsUrl = '/configs';
export const configFormUrl = '/configForm';
