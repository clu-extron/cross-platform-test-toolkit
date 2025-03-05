import * as fs from 'fs';
import * as path from 'path';

/**
 * Function to get the list of DLL files in a folder
 * @param folderPath Path to the folder
 * @returns Set of DLL filename
 */
function getDllFiles(folderPath: string): Set<string> {
    if (!fs.existsSync(folderPath)) {
        console.error(`Folder does not exist: ${folderPath}`);
        return new Set();
    }

    return new Set(
        fs.readdirSync(folderPath).filter(file => file.toLowerCase().endsWith('.dll'))
    );
}

function compareDllFiles(folderA: string, folderB: string): void {
    const dllsA = getDllFiles(folderA);
    const dllsB = getDllFiles(folderB);

    const onlyInA = [...dllsA].filter(file => !dllsB.has(file));
    const onlyInB = [...dllsB].filter(file => !dllsA.has(file));

    console.log(`DLLs only in ${folderA}:`, onlyInA.length > 0 ? onlyInA : 'None');
    console.log(`DLLs only in ${folderB}:`, onlyInB.length > 0 ? onlyInB : 'None');
}

// Example usage (modify paths accordingly)
const installerFolder1 = 'C://TestEngineerProjects//Files//RoomAgent//RA2.8.0.179';
const installerFolder2 = 'C://TestEngineerProjects//Files//RoomAgent//RA2.8.0.206';

compareDllFiles(installerFolder1, installerFolder2);