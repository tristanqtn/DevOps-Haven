# Function to install dependencies from requirements.txt
function Install-Dependencies {
    param (
        [string]$venvPath,
        [string]$requirementsFile = "requirements.txt"
    )
    if (Test-Path $requirementsFile) {
        & "$venvPath\Scripts\python.exe" -m pip install -r $requirementsFile
    } else {
        Write-Error "The file $requirementsFile does not exist."
    }
}

# Function to freeze the state of the venv and write it to requirements.txt
function Freeze-Dependencies {
    param (
        [string]$venvPath,
        [string]$requirementsFile = "requirements.txt"
    )
    & "$venvPath\Scripts\python.exe" -m pip freeze | Out-File -Encoding ASCII $requirementsFile
}

# Example usage:
# Install-Dependencies -venvPath "path\to\your\venv"
# Freeze-Dependencies -venvPath "path\to\your\venv"
