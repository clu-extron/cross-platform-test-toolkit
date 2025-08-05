import * as fs from 'fs';
import * as path from 'path';
import versionInfo from 'win-version-info';

/**
 * Get all files in a folder
 */
function getAllFiles(folderPath: string): Set<string> {
    if (!fs.existsSync(folderPath)) {
        console.error(`Folder does not exist: ${folderPath}`);
        return new Set();
    }

    return new Set(fs.readdirSync(folderPath));
}

/**
 * Get file version (if available)
 */
function getFileVersion(filePath: string): string | null {
    try {
        const info = versionInfo(filePath);
        return info?.FileVersion || null;
    } catch {
        return null;
    }
}

/**
 * Compare files and their versions
 */
function compareFilesWithVersions(folderA: string, folderB: string): void {
    const filesA = getAllFiles(folderA);
    const filesB = getAllFiles(folderB);

    const onlyInA = [...filesA].filter(file => !filesB.has(file));
    const onlyInB = [...filesB].filter(file => !filesA.has(file));
    const inBoth = [...filesA].filter(file => filesB.has(file));

    console.log(`Files only in ${folderA}:`, onlyInA.length > 0 ? onlyInA : 'None');
    console.log(`Files only in ${folderB}:`, onlyInB.length > 0 ? onlyInB : 'None');

    console.log(`\nComparing versions of files in both folders:`);

    inBoth.forEach(file => {
        const filePathA = path.join(folderA, file);
        const filePathB = path.join(folderB, file);

        const versionA = getFileVersion(filePathA);
        const versionB = getFileVersion(filePathB);

        if (versionA && versionB && versionA !== versionB) {
            console.log(`Version mismatch for ${file}:`);
            console.log(`  ${folderA}: ${versionA}`);
            console.log(`  ${folderB}: ${versionB}`);
        }
    });
}

// Example usage
const installerFolder1 = 'C://TestEngineerProjects//Files//RoomAgent//2.8.0.295';
const installerFolder2 = 'C://TestEngineerProjects//Files//RoomAgent//2.8.0.293';

compareFilesWithVersions(installerFolder1, installerFolder2);
