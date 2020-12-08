import {Action} from "redux";
import {MyXmlDocument} from "../model/xmlDocument";
import {Profile} from "../model/profile";
import {AppThunk, setCurrentOpenFileInLocalStorage} from "./store";
import {saveConfigToIndexedDB, saveOpenedFileToIndexedDB, updateProfileForDocument} from "../model/db";

// Read file

export const READ_FILE = 'READ_FILE';

interface ReadFileAction extends Action<typeof READ_FILE> {
    readFile: MyXmlDocument;
    openFile?: boolean;
}

export function readFileAction(readFile: MyXmlDocument, openFile: boolean = true): AppThunk {
    return async (dispatch) => {
        await saveOpenedFileToIndexedDB(readFile);
        dispatch({type: READ_FILE, readFile: readFile, openFile});
    }
}

// Open file

export const OPEN_FILE = 'OPEN_FILE';

interface OpenFileAction extends Action<typeof OPEN_FILE> {
    fileName: string;
}

export function openFileAction(fileName: string): AppThunk {
    return async (dispatch) => {
        await setCurrentOpenFileInLocalStorage(fileName);
        dispatch({type: OPEN_FILE, fileName})
    };
}

// Add profile

export const ADD_PROFILE = 'ADD_PROFILE';

interface AddConfigAction extends Action<typeof ADD_PROFILE> {
    profile: Profile;
}

export function addConfigAction(profile: Profile): AppThunk {
    return async (dispatch) => {
        await saveConfigToIndexedDB(profile);
        dispatch({type: ADD_PROFILE, profile});
    };
}

// Update profile

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

interface UpdateProfileAction extends Action<typeof UPDATE_PROFILE> {
    profileName: string;
}

export function updateProfileAction(profileName: string, currentFileName: string): AppThunk {
    return async (dispatch) => {
        await updateProfileForDocument(profileName, currentFileName)
        dispatch({type: UPDATE_PROFILE, profileName})
    }
}


export type StoreAction = ReadFileAction | OpenFileAction | AddConfigAction | UpdateProfileAction;
