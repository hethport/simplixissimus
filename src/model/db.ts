import Dexie, {Table} from 'dexie';
import {Profile} from "./profile";
import {MyXmlDocument} from "./xmlDocument";

class MyDb extends Dexie {
    public profilesTable: Table<Profile, string>;
    public openedFilesTable: Table<MyXmlDocument, string>;

    constructor() {
        super('SimpliXissimus');

        this
            .version(1)
            .stores({
                profiles: 'name',
                openedFiles: 'name'
            });

        this.profilesTable = this.table('profiles');
        this.openedFilesTable = this.table('openedFiles');
    }
}

const myDb: MyDb = new MyDb();

// Configs

export function getConfigByNameFromIndexedDB(name: string): Promise<Profile | undefined> {
    return myDb.profilesTable
        .filter((c) => c.name === name)
        .first();
}

export function getAllConfigsFromIndexedDB(): Promise<Profile[]> {
    return myDb.profilesTable.toArray();
}

export function saveConfigToIndexedDB(config: Profile): Promise<string> {
    return myDb.profilesTable.put(config);
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

export function updateProfileForDocument(profileName: string, fileName: string) {
    return myDb.openedFilesTable.update(fileName, {profileName})
}
