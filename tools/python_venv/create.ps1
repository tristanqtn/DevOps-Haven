# Get the current directory's name
$directoryName = Split-Path -Path $PSScriptRoot -Leaf

# Modify the name for the virtual environment
$venvName = ".venv_$directoryName"

# Create the virtual environment
python -m venv $venvName

# Activate the virtual environment
# .\$venvName\Scripts\Activate.ps1

# Print a message to confirm the virtual environment is active
Write-Host "The virtual environment $venvName is now created. To activate it manually, run the following command (in the current directory):"
Write-Host ".\$venvName\Scripts\Activate.ps1"

# Deploy API endpoint in separate console window
Write-Host "`nOpening .venv..."
try{
    Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "& { .\$venvName\Scripts\Activate.ps1; Write-Host 'The virtual environment is now active.'}"
    Start-Sleep -Seconds 5
}
catch {
    Write-Error "Failed to enable .venv: $_"
}