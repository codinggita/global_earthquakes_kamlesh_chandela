$ErrorActionPreference = 'Stop'

# Restore delete_docs_branches.js to handle it cleanly or just remove it.
# We'll just remove it via git rm in a separate branch later.

$files = git ls-files -mo --exclude-standard | Where-Object { $_ -ne 'delete_docs_branches.js' }
$readme = $files | Where-Object { $_ -match 'frontend/README.md' }
$otherFiles = $files | Where-Object { $_ -notmatch 'frontend/README.md' }

$allFiles = @()
if ($readme) { $allFiles += $readme }
$allFiles += $otherFiles

$count = 1
git checkout main

foreach ($file in $allFiles) {
    if ($file -match 'frontend/README.md') {
        $branchName = "feat/frontend-readme"
        $commitMsg = "docs: add frontend readme"
    } else {
        $branchName = "feat/frontend-part-$count"
        $fileName = Split-Path $file -Leaf
        $commitMsg = "feat: add $fileName"
        $count++
    }
    
    Write-Host "Creating branch $branchName for file $file"
    git checkout -b $branchName
    git add "$file"
    git commit -m $commitMsg
    git push -u origin $branchName
    git checkout main
}

# Handle delete_docs_branches.js
if (Test-Path "delete_docs_branches.js" -PathType Leaf -eq $false) {
    $branchName = "chore/remove-cleanup-script"
    git checkout -b $branchName
    git rm delete_docs_branches.js
    git commit -m "chore: remove delete_docs_branches.js"
    git push -u origin $branchName
    git checkout main
}

Write-Host "All branches created and pushed successfully!"
