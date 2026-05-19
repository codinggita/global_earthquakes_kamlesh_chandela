const { execSync } = require('child_process');

try {
    const branchesOutput = execSync('git ls-remote --heads origin', { encoding: 'utf-8' });
    const branches = branchesOutput
        .split('\n')
        .filter(line => line.includes('refs/heads/docs/backend-readme-part-'))
        .map(line => line.split('refs/heads/')[1].trim());

    console.log(`Found ${branches.length} docs branches to delete from origin.`);
    
    if (branches.length > 0) {
        const chunkSize = 20;
        for (let i = 0; i < branches.length; i += chunkSize) {
            const chunk = branches.slice(i, i + chunkSize);
            console.log(`Deleting chunk: ${chunk.join(' ')}`);
            execSync(`git push origin --delete ${chunk.join(' ')}`, { stdio: 'inherit' });
        }
        console.log("All docs branches successfully deleted from repo.");
    }
} catch (error) {
    console.error("Error:", error.message);
}
