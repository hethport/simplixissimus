import {Action, createStore} from "redux";
import {MyXmlDocument, MyXmlElementNode} from "./xmlModel";
import {readXmlString} from "./xmlReader";
import {kbo_11_51_xml} from "./dummyData/kbo_11.51.xml";
import {composeWithDevTools} from "redux-devtools-extension";


const defaultFile = new MyXmlDocument("kbo 11.51.xml", readXmlString(kbo_11_51_xml) as MyXmlElementNode);

// Action types

const READ_FILE = 'READ_FILE';
const OPEN_FILE = 'OPEN_FILE';

interface ReadFileAction extends Action<typeof READ_FILE> {
    payload: MyXmlDocument;
}

export function readFileAction(readFile: MyXmlDocument): ReadFileAction {
    return {type: READ_FILE, payload: readFile};
}

interface OpenFileAction extends Action<typeof OPEN_FILE> {
    fileName: string;
}

export function openFileAction(fileName: string): OpenFileAction {
    return {type: OPEN_FILE, fileName};
}

export type StoreAction = ReadFileAction | OpenFileAction;

// Root reducer

export interface StoreState {
    currentFileName?: string;
    openedFiles: MyXmlDocument[];
}

export function rootReducer(
    state: StoreState = {openedFiles: []},
    action: StoreAction
): StoreState {
    switch (action.type) {
        case READ_FILE:
            return {
                ...state, openedFiles: [...state.openedFiles, action.payload],
            };
        case OPEN_FILE:
            return {
                ...state, currentFileName: action.fileName
            };
        default:
            return state;
    }
}

// Selectors

export function allDocumentsSelector(store: StoreState): MyXmlDocument[] {
    return store.openedFiles;
}

export function currentDocumentNameSelector(store: StoreState): string | undefined {
    return store.currentFileName;
}

export function selectActiveDocument(store: StoreState): MyXmlDocument | undefined {
    return store.currentFileName
        ? store.openedFiles.find((d) => d.name === store.currentFileName)
        : undefined;
}

export function selectDocumentByName(store: StoreState, name: string): MyXmlDocument | undefined {
    return store.openedFiles.find((d) => d.name === name);
}

// Store

export const store = createStore(rootReducer, {
    currentFileName: defaultFile.name,
    openedFiles: [defaultFile]
}, composeWithDevTools());
