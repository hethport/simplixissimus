import {applyMiddleware, createStore, Store} from "redux";
import {MyXmlDocument} from "../xmlModel";
import {composeWithDevTools} from "redux-devtools-extension";
import {Config} from "../config";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ADD_CONFIG, addConfigAction, OPEN_FILE, READ_FILE, readFileAction, StoreAction} from "./actions";
import {tlh_dig_config} from "../dummyData/dummyConfigs";
import {getAllConfigsFromIndexedDB, getAllOpenedFilesFromIndexedDB} from "../db";
import {kbo_11_51} from "../dummyData/kbo_11.51.xml";

// Root reducer

export type AppThunkDispatch = ThunkDispatch<StoreState, unknown, StoreAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, StoreAction>;

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
            return {
                ...state, openedFiles: [...state.openedFiles, action.readFile], currentFileName: action.readFile.name
            };
        case OPEN_FILE:
            return {
                ...state, currentFileName: action.fileName
            };
        case ADD_CONFIG:
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

const currentFileLocalStorageKey = 'currentFile';

export function setCurrentOpenFileInLocalStorage(fileName: string): void {
    localStorage.setItem(currentFileLocalStorageKey, fileName);
}

// Read store

export async function readInitialStore(): Promise<StoreState> {
    const currentFileName = localStorage.getItem(currentFileLocalStorageKey) || undefined;

    const openedFiles = await getAllOpenedFilesFromIndexedDB();
    const configs = await getAllConfigsFromIndexedDB();

    return {currentFileName, openedFiles, configs};
}


export const store: Store<StoreState, StoreAction> & { dispatch: AppThunkDispatch } = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

readInitialStore().then((initialStore) => {
    // Load initial data

    if (process.env.NODE_ENV === 'development') {
        if (initialStore.openedFiles.length === 0) {
            initialStore.openedFiles = [kbo_11_51];
        }
        if (initialStore.configs.length === 0) {
            initialStore.configs = [tlh_dig_config];
        }
    }

    initialStore.openedFiles.forEach((openedFile) => {
        store.dispatch(readFileAction(openedFile))
    });

    initialStore.configs.forEach((config) => {
        store.dispatch(addConfigAction(config))
    });
});
