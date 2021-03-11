import {applyMiddleware, createStore, Store} from "redux";
import {MyXmlDocument} from "../model/xmlDocument";
import {composeWithDevTools} from "redux-devtools-extension";
import {Profile} from "../model/profile";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ADD_PROFILE, addConfigAction, OPEN_FILE, READ_FILE, readFileAction, StoreAction, UPDATE_PROFILE} from "./actions";
import {tlh_dig_config} from "../dummyData/dummyConfigs";
import {getAllConfigsFromIndexedDB, getAllOpenedFilesFromIndexedDB} from "../model/db";
import {kbo_11_51} from "../dummyData/kbo_11.51.xml";

// Root reducer

export type AppThunkDispatch = ThunkDispatch<StoreState, unknown, StoreAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, StoreAction>;

export interface StoreState {
  currentFileName?: string;
  openedFiles: MyXmlDocument[];
  profiles: Profile[];
}

export function rootReducer(
  state: StoreState = {openedFiles: [], profiles: []},
  action: StoreAction
): StoreState {
  switch (action.type) {
    case READ_FILE:
      return {
        ...state,
        openedFiles: [...state.openedFiles, action.readFile],
        currentFileName: action.openFile ? action.readFile.name : state.currentFileName
      };
    case OPEN_FILE:
      return {
        ...state, currentFileName: action.fileName
      };
    case ADD_PROFILE:
      return {
        ...state, profiles: [...state.profiles, action.profile]
      };
    case UPDATE_PROFILE:
      return {
        ...state, openedFiles: state.openedFiles.map((openFile) => {
          return openFile.name === state.currentFileName
            ? {...openFile, profileName: action.profileName}
            : openFile;
        })
      }
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

export function activeDocumentSelector(store: StoreState): MyXmlDocument | undefined {
  return store.currentFileName
    ? store.openedFiles.find((d) => d.name === store.currentFileName)
    : undefined;
}

export function selectDocumentByName(store: StoreState, name: string): MyXmlDocument | undefined {
  return store.openedFiles.find((d) => d.name === name);
}

export function allProfilesSelector(store: StoreState): Profile[] {
  return store.profiles;
}

export function profileByName(store: StoreState, name: string): Profile | undefined {
  return store.profiles.find((p) => p.name === name);
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

  return {currentFileName, openedFiles, profiles: configs};
}


export const store: Store<StoreState, StoreAction> & { dispatch: AppThunkDispatch } = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

readInitialStore().then((initialStore) => {
  // Load initial data

  if (process.env.NODE_ENV === 'development') {
    if (initialStore.openedFiles.length === 0) {
      initialStore.openedFiles = [kbo_11_51];
    }
    if (initialStore.profiles.length === 0) {
      initialStore.profiles = [tlh_dig_config];
    }
  }

  initialStore.openedFiles.forEach((openedFile) => {
    store.dispatch(readFileAction(openedFile, openedFile.name === initialStore.currentFileName))
  });

  initialStore.profiles.forEach((config) => {
    store.dispatch(addConfigAction(config))
  });
});
