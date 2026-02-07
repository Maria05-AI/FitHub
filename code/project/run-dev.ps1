# run-dev.ps1 — Start backend and frontend in separate PowerShell windows
# Usage: Right-click -> Run with PowerShell or run from PowerShell: .\run-dev.ps1

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend in new window
$backendCmd = "Set-Location -Path '$repoRoot\backend' ; waitress-serve --listen=127.0.0.1:5000 app:app"
Start-Process powershell -ArgumentList "-NoExit","-Command","$backendCmd" -WindowStyle Normal

# Start frontend in new window
$frontendCmd = "Set-Location -Path '$repoRoot\frontend' ; npm run dev"
Start-Process powershell -ArgumentList "-NoExit","-Command","$frontendCmd" -WindowStyle Normal

Write-Host 'Started backend and frontend in new PowerShell windows.' -ForegroundColor Green
