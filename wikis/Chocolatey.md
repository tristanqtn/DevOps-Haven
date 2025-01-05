# Chocolatey Wiki

## Introduction to Chocolatey

Chocolatey is a package manager for Windows that allows users to quickly install, update, and manage software from the command line. It simplifies the process of software installation and maintenance, providing a convenient way to manage packages on Windows systems.

## Installing Chocolatey

To install Chocolatey, open a Command Prompt or PowerShell as Administrator and run the following command:

```powershell
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

## Basic Chocolatey Commands

Here are some essential commands for using Chocolatey to manage packages:

### Search for Packages

To search for a package in the Chocolatey repository, use the following command:

```powershell
choco search <package-name>
```

For example, to search for Google Chrome:

```powershell
choco search googlechrome
```

### Install a Package

To install a package using Chocolatey, run:

```powershell
choco install <package-name> -y
```

For example, to install Google Chrome:

```powershell
choco install googlechrome -y
```

### Upgrade a Package

To upgrade an installed package to the latest version, use:

```powershell
choco upgrade <package-name> -y
```

For example, to upgrade Google Chrome:

```powershell
choco upgrade googlechrome -y
```

### Upgrade All Packages

To upgrade all installed Chocolatey packages on your system, run:

```powershell
choco upgrade all -y
```

### List Installed Packages

To view a list of all installed packages managed by Chocolatey:

```powershell
choco list
```

### Uninstall a Package

To uninstall a package:

```powershell
choco uninstall <package-name> -y
```

For example, to uninstall Google Chrome:

```powershell
choco uninstall googlechrome -y
```

### Check for Package Updates

To check if there are updates available for installed packages:

```powershell
choco outdated
```

## Conclusion

Chocolatey is a powerful tool for managing software on Windows, offering a convenient way to automate installations, updates, and uninstalls from the command line. With these basic commands, you can efficiently manage software packages on your Windows system.
