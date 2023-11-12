# Lab

This lab work covers the basics of Git.

## Objectives

This lab work can be done in a group of **2 students**.

- [x] Perform the GitHub Desktop Tutorial
- [x] Create a repository and clone it on your computer
- [x] Create a branch and navigate between branches
- [x] Modify a file in the repository and push the modifications
- [x] Manage conflicts
- [x] Redo the lab using command line interface (CLI)

## Before starting

- [x] Create a GitHub account: https://github.com/
- [x] Install GitHub Desktop from this url: https://desktop.github.com/
- [x] Install an IDE or a text editor (ex: https://code.visualstudio.com/ or https://atom.io/)

## 1. Perform the GitHub Desktop Tutorial

- [x] Launch GitHub Desktop
- [x] Start the GitHub Desktop Tutorial by clicking "Create a Tutorial Repository ..." and follow the instructions

![GitHub Desktop Tutorial](image/github-tutorial.png)

## 2. Create a repository and clone it on your computer

**A single member** of the group creates a repository:

- [x] Login to [Github.com](https://github.com/)
- [x] Navigate to the **"Your repositories"** page
- [x] Click on **"New"**
- [x] Choose a name
- [x] Chose the **"Public"** option
- [x] Check the box **"Add a README file"**
- [x] Check the box **"Add .gitignore"** with the **"Node"** template
- [x] Navigate to the created repository, then to the **Settings → Manage Access** page
- [x] Click on **"Invite a collaborator"** and add the other members of your group

**All group members** clone the repository:

- [x] Open GitHub Desktop
- [x] Click on **"Clone a repository from the Internet"**
- [x] **GitHub.com** → Filter your repositories
- [x] Click on “Clone”

You now have a copy of the local repository

## 3. Create a branch and navigate between branches

**A single member** of the group creates the `develop` branch:

- [x] In GitHub Desktop: **Current branch → New branch**

- [x] Choose the name of the branch (`develop`) and **"Create branch"**

You can now navigate (= checkout) between the master and develop branches.

## 4. Modify a file in the repository and push the modifications

**A single member** of the group modifies the **"README.md"** file and pushes to the `develop` branch:

- [x] Modify the **"README.md"** file entirely:
- [x] Open the repository in your IDE
- [x] Replace the entire contents of the **"README.md"** file
- [x] In GitHub Desktop:
- [x] Choose a commit message ("Summary")
- [x] Click on **"Commit to develop"**
- [x] Use **"Publish branch"** to push your changes to the remote repository

**The other members** of the group get the changes:

- [x] Use **"Fetch origin"** to synchronize your local repository with remote changes
- [x] Navigate to the develop branch and watch your files change in your IDE

## 5. Manage conflicts

A conflict occurs when a part of a file has been modified on 2 branches which must be merged (**merge**). We will create a conflict to see how to resolve it.

Both **2 members** of the group create a branch from `develop` and modify the same part (same lines) of the **README.md** file:

- [x] Create a branch `dev-firstname` **"based on ... develop"**
- [x] Edit the **README.md** file
- [x] Commit changes
- [x] Push your changes

Alternately, each member merges the new branches into `develop`:

- [x] Checkout the `develop` branch
- [x] Click on **"Merge into current branch ..."**
- [x] Select branch
- [x] Push your changes

**The 2nd member** of the group will encounter a conflict:

- [x] Open your IDE as suggested by GitHub Desktop
- [x] The conflict materialize as follows:

- [x] To resolve the conflict, keep either the `HEAD` part, or the `dev-firstname` part and delete the other lines (including the `====` and `>>>>` lines)
- [x] Once the lines are deleted you can commit the merge from GitHub Desktop:

## 6. Redo the lab using command line interface (CLI)

The goal is to redo the same actions as before with the command line.
For this you must have a terminal and GIT installed by default on Linux or MacOS.

For the installation:

- Windows: https://gitforwindows.org/
- Linux: https://git-scm.com/download/linux
- MacOS: https://git-scm.com/download/mac

You can now open Terminal (on Linux or MacOS) or Git Bash (on Windows).

You can find a detailed list of the different Git CLI commands:

- https://gist.github.com/aquelito/8596717
- https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf

## Bonus tasks

1. [Learn `.gitignore`](https://git-scm.com/docs/gitignore)
2. [Learn tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
3. [Learn "rebase" vs "merge"](https://medium.datadriveninvestor.com/git-rebase-vs-merge-cc5199edd77c)
4. [Learn Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
5. [Learn squashing commits](https://medium.com/the-mighty-programmer/squashing-git-commits-4b53fe1c138e)
