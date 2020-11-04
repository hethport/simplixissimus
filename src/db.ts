import Dexie, {Table} from 'dexie';
import {Config} from "./config";
import {MyXmlDocument} from "./xmlModel";

class MyDb extends Dexie {
    public configsTable: Table<Config, string>;
    public openedFilesTable: Table<MyXmlDocument, string>;

    constructor() {
        super('SimpliXissimus');

        this
            .version(1)
            .stores({
                configs: 'name',
                openedFiles: 'name'
            });

        this.configsTable = this.table('configs');
        this.openedFilesTable = this.table('openedFiles');
    }
}

const myDb: MyDb = new MyDb();

// Configs

export function getConfigByNameFromIndexedDB(name: string): Promise<Config | undefined> {
    return myDb.configsTable
        .filter((c) => c.name === name)
        .first();
}

export function getAllConfigsFromIndexedDB(): Promise<Config[]> {
    return myDb.configsTable.toArray();
}

export function saveConfigToIndexedDB(config: Config): Promise<string> {
    return myDb.configsTable.put(config);
}

// Opened files

export function getOpenedFileByNameFromIndexedDB(name: string): Promise<MyXmlDocument | undefined> {
    return myDb.openedFilesTable
        .filter((d) => d.name === name)
        .first();
}

export function getAllOpenedFilesFromIndexedDB(): Promise<MyXmlDocument[]> {
    return myDb.openedFilesTable.toArray();
}

export function saveOpenedFileToIndexedDB(file: MyXmlDocument): Promise<string> {
    return myDb.openedFilesTable.put(file);
}
