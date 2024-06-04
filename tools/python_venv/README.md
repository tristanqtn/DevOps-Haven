# Simple PowerShell Script for Creating and Activating a Python Virtual Environment

This script is designed to be used in a directory that contains a Python project. It creates a new Python virtual environment in the current directory and activates it.

## Usage

1. Save the script as a .ps1 file (for example, `create_venv.ps1`) in your project directory.
2. Open a PowerShell window and navigate to your project directory.
3. Run the script by typing `.\create_venv.ps1` and pressing Enter.

Usage is basically the same for the shell script.

The script will create a new virtual environment with a name that is based on the current directory's name. The virtual environment's name will have the prefix `.venv_`. For example, if the current directory's name is `toto`, the virtual environment's name will be `.venv_toto`.

After the virtual environment is created, the script will activate it. You'll see a confirmation message in the PowerShell window.

## Important Notes

- The script assumes that you have Python and its package manager pip installed on your system.
- The activation of the virtual environment is only for the current PowerShell session. If you close the PowerShell window or start a new session, you'll need to run the activation script again.
- The script opens a new PowerShell window to activate the virtual environment. This is to ensure that the activation is persistent even after the script has finished running.
- Always ensure to run scripts in a controlled and safe environment to prevent any unintended or harmful actions.
