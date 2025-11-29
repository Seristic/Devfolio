# Build and deploy script for Seristic.github.io
Write-Host "Building React app..." -ForegroundColor Green
npm run build

Write-Host "Copying build files to root..." -ForegroundColor Green
Copy-Item -Path "build\*" -Destination "." -Recurse -Force
Copy-Item "public\.nojekyll" "." -Force

Write-Host "Committing and pushing changes..." -ForegroundColor Green
git add .
git commit -m "Update site - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main

Write-Host "Deployment complete! Site will be updated at https://Seristic.github.io" -ForegroundColor Green