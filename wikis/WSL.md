# Windows Subsystem for Linux (WSL) Wiki

## Introduction

Windows Subsystem for Linux (WSL) is a feature in Windows 10 and Windows 11 that enables users to run a Linux environment directly on Windows without the need for a virtual machine or dual-boot setup. It provides a compatibility layer for running Linux binary executables natively on Windows.

## Installing WSL

To set up WSL on your Windows machine, follow these steps:

### Enable WSL

Open PowerShell as Administrator and run:

```powershell
wsl --install
```

This command enables the necessary Windows features and installs the latest version of Ubuntu by default. If you need to specify a different Linux distribution, refer to the section below.

### Installing a Specific Linux Distribution

To install a specific Linux distribution, use:

```powershell
wsl --install -d <DistributionName>
```

Replace `<DistributionName>` with the desired distribution's name, such as `Debian`, `Ubuntu-22.04`, or `kali-linux`. To view the available distributions, use the command:

```powershell
wsl --list --online
```

### Upgrading to WSL 2

Ensure your system meets the requirements for WSL 2, which include running Windows 10 version 1903 or higher. To set WSL 2 as the default version, run:

```powershell
wsl --set-default-version 2
```

## Managing WSL

Here are some essential commands for managing WSL:

### List Installed Distributions

To list all installed Linux distributions, use:

```powershell
wsl --list --verbose
```

or the shorthand version:

```powershell
wsl -l -v
```

### Set Default Distribution

To set a default distribution for new shell sessions, use:

```powershell
wsl --set-default <DistributionName>
```

### Change Version of a Distribution

To change the version of a specific distribution between WSL 1 and WSL 2, run:

```powershell
wsl --set-version <DistributionName> <Version>
```

Replace `<Version>` with either `1` or `2`.

### Uninstall a Distribution

To uninstall a specific Linux distribution, use:

```powershell
wsl --unregister <DistributionName>
```

This command will remove all files associated with the distribution.

### Export and Import Distributions

You can export a distribution to a tar file for backup or migration purposes:

```powershell
wsl --export <DistributionName> <FileName>.tar
```

To import a distribution from a tar file:

```powershell
wsl --import <NewDistributionName> <InstallLocation> <FileName>.tar
```

## Using WSL

Once installed, you can start using WSL by launching your preferred Linux distribution from the Start menu or running the following command in PowerShell or Command Prompt:

```powershell
wsl
```

### Accessing the Linux File System

You can access the Linux file system from Windows Explorer by navigating to:

```
\\wsl$\<DistributionName>\
```

### Running Linux Commands from Windows

You can run Linux commands directly from PowerShell or Command Prompt by using the `wsl` command:

```powershell
wsl <command>
```

For example, to list files in the Linux home directory:

```powershell
wsl ls ~
```

## Updating WSL

To update WSL to the latest version, run:

```powershell
wsl --update
```

This command will update the WSL kernel and other components.

## Further Resources

For more detailed information and advanced usage, visit the [official WSL documentation](https://docs.microsoft.com/en-us/windows/wsl/).
