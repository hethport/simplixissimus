import {MyXmlDocument} from "./xmlModel";
import {Config} from "./config";
import {StoreState} from "./store/store";

// Current file

const currentFileLocalStorageKey = 'currentFile';

export function setCurrentOpenFileInLocalStorage(fileName: string): void {
    localStorage.setItem(currentFileLocalStorageKey, fileName);
}

// Opened Documents

function openedFilesLocalStorageKey(fileName: string): string {
    return `openedFile_${fileName}`;
}

export function loadOpenedFilesFromLocalStorage(): MyXmlDocument[] {
    return Object.entries(localStorage)
        .filter(([key, _]) => key.startsWith('openedFile_'))
        .map(([_, value]) => JSON.parse(value));
}

export function saveFileToLocalStorage(file: MyXmlDocument): void {
    localStorage.setItem(openedFilesLocalStorageKey(file.name), JSON.stringify(file));
}

// Configs

function configsLocalStorageKey(configName: string): string {
    return `configs_${configName}`
}

export function loadConfigsFromLocalStorage(): Config[] {
    return Object.entries(localStorage)
        .filter(([key, _]) => key.startsWith('configs_'))
        .map(([_, value]) => JSON.parse(value));
}

export function readConfigFromLocalStorage(name: string): Config | undefined {
    const x: string | null = localStorage.getItem(configsLocalStorageKey(name));

    return x ? JSON.parse(x) : undefined;
}

export function saveConfigToLocalStorage(config: Config): void {
    localStorage.setItem(configsLocalStorageKey(config.name), JSON.stringify(config));
}

// Read store
export function readInitialStore(): StoreState {

    const currentFileName = localStorage.getItem(currentFileLocalStorageKey) || undefined;
    const openedFiles = loadOpenedFilesFromLocalStorage();
    const configs = loadConfigsFromLocalStorage();

    return {currentFileName, openedFiles, configs};
}
