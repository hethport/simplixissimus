import {Action} from "redux";
import {MyXmlDocument} from "../xmlModel";
import {Config} from "../config";
import {AppThunk, setCurrentOpenFileInLocalStorage} from "./store";
import {saveConfigToIndexedDB, saveOpenedFileToIndexedDB} from "../db";

export const READ_FILE = 'READ_FILE';
export const OPEN_FILE = 'OPEN_FILE';
export const ADD_CONFIG = 'ADD_CONFIG';


interface ReadFileAction extends Action<typeof READ_FILE> {
    readFile: MyXmlDocument;
}

export function readFileAction(readFile: MyXmlDocument): AppThunk {
    return async (dispatch) => {
        await saveOpenedFileToIndexedDB(readFile);
        dispatch({type: READ_FILE, readFile: readFile});
    }
}


interface OpenFileAction extends Action<typeof OPEN_FILE> {
    fileName: string;
}

export function openFileAction(fileName: string): AppThunk {
    return async (dispatch) => {
        await setCurrentOpenFileInLocalStorage(fileName);
        dispatch({type: OPEN_FILE, fileName})
    };
}


interface AddConfigAction extends Action<typeof ADD_CONFIG> {
    config: Config;
}

export function addConfigAction(config: Config): AppThunk {
    return async (dispatch) => {
        await saveConfigToIndexedDB(config);
        dispatch({type: ADD_CONFIG, config});
    };
}


export type StoreAction = ReadFileAction | OpenFileAction | AddConfigAction;
