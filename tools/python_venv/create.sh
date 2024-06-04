#!/bin/bash

# Get the current directory's name
directory_name=$(basename "$PWD")

# Modify the name for the virtual environment
venv_name=".venv_$directory_name"

# Create the virtual environment
python3 -m venv "$venv_name"

# Print a message to confirm the virtual environment is created
echo "The virtual environment $venv_name is now created. To activate it manually, run the following command (in the current directory):"
echo "source $venv_name/bin/activate"

# Activate the virtual environment in a new terminal window
echo "Opening $venv_name..."
gnome-terminal --working-directory="$PWD" --command="bash -c 'source $venv_name/bin/activate; echo \"The virtual environment is now active.\"; exec bash'" &
