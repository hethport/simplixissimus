import {createStore} from "redux";
import {MyXmlDocument} from "../xmlModel";
import {kbo_11_51} from "../dummyData/kbo_11.51.xml";
import {composeWithDevTools} from "redux-devtools-extension";
import {Config} from "../config";
import {
    readInitialStore,
    saveConfigToLocalStorage,
    saveFileToLocalStorage,
    setCurrentOpenFileInLocalStorage
} from '../localStorageHelpers';
import {ADD_CONFIG, addConfigAction, OPEN_FILE, READ_FILE, readFileAction, StoreAction} from "./actions";
import {tlh_dig_config} from "../dummyData/dummyConfigs";

// Root reducer

export interface StoreState {
    currentFileName?: string;
    openedFiles: MyXmlDocument[];
    configs: Config[];
}

export function rootReducer(
    state: StoreState = {openedFiles: [], configs: []},
    action: StoreAction
): StoreState {
    switch (action.type) {
        case READ_FILE:
            saveFileToLocalStorage(action.readFile);
            return {
                ...state, openedFiles: [...state.openedFiles, action.readFile], currentFileName: action.readFile.name
            };
        case OPEN_FILE:
            setCurrentOpenFileInLocalStorage(action.fileName);
            return {
                ...state, currentFileName: action.fileName
            };
        case ADD_CONFIG:
            saveConfigToLocalStorage(action.config);
            return {
                ...state, configs: [...state.configs, action.config]
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

export function allConfigs(store: StoreState): Config[] {
    return store.configs;
}

// Store

const initialStore = readInitialStore();

export const store = createStore(rootReducer, initialStore, composeWithDevTools());

if (process.env.NODE_ENV === 'development') {
    if (initialStore.openedFiles.length === 0) {
        store.dispatch(readFileAction(kbo_11_51));
    }
    if (initialStore.configs.length === 0) {
        store.dispatch(addConfigAction(tlh_dig_config));
    }
}
