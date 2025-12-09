$ErrorActionPreference = "Stop"

Write-Host "1. Building Frontend..."
npm run build
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed" }

Write-Host "1b. Prerendering Static Pages..."
node scripts/prerender.js
if ($LASTEXITCODE -ne 0) { throw "Prerendering failed" }

Write-Host "2. Preparing Server Directory..."
$serverDist = "server/dist"
if (Test-Path $serverDist) {
    Remove-Item -Path $serverDist -Recurse -Force
}
Copy-Item -Path "dist" -Destination "server" -Recurse

Write-Host "3. Cleaning up old zip..."
if (Test-Path "backend.zip") {
    Remove-Item "backend.zip" -Force
}

Write-Host "4. Creating backend.zip..."
Get-ChildItem -Path "server" -Exclude "node_modules", "db" | Compress-Archive -DestinationPath "backend.zip" -Force

Write-Host "Success! backend.zip is ready for upload."
