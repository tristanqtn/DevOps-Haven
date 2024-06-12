# Version Management Best Practices with Git and GitHub

This README provides guidelines on best practices for version management using Git and GitHub. Following these practices will help maintain a clean, organized, and efficient workflow.

## Table of Contents

- [Fetching Changes](#fetching-changes)
- [Using Rebase and Merge](#using-rebase-and-merge)
- [Conventional Commits](#conventional-commits)
- [Development in Branches](#development-in-branches)
- [Additional Tips](#additional-tips)

## Fetching Changes

### Always Fetch Before Committing

Before making any commits, ensure you fetch the latest changes from the remote repository to avoid conflicts and ensure your work is based on the most recent codebase.

```sh
git fetch origin
```

## Using Rebase and Merge

### Rebase for Clean History

Rebasing allows you to maintain a clean and linear commit history by applying your changes on top of the latest commits from the target branch.

```sh
git fetch origin
git rebase origin/main
```

### Merge for Preserving Context

Use merge when you need to preserve the context of feature branches, such as when completing a feature or fixing a bug.

```sh
git fetch origin
git merge origin/main
```

### Choosing Between Rebase and Merge

- **Rebase**: Use for individual commits or small branches to keep the history clean.
- **Merge**: Use for integrating feature branches or larger updates where the commit history is important.

## Conventional Commits

### Structure of Conventional Commits

Adopting a conventional commit style helps maintain a readable and manageable history. Follow this format:

```
<type>(<scope>): <description>
```

- **type**: The type of change (e.g., feat, fix, docs, style, refactor, test, chore).
- **scope**: The scope of the change (optional).
- **description**: A brief description of the change.

### Examples

- `feat(auth): add login functionality`
- `fix(api): handle null response`
- `docs(readme): update contributing guidelines`

## Development in Branches

### Create Feature Branches

Develop new features and fix bugs in separate branches. This keeps the main branch stable and production-ready.

```sh
git checkout -b feature/your-feature-name
```

### Branch Naming Conventions

Use clear and descriptive branch names to make it easy to understand the purpose of each branch.

- `feature/your-feature-name`
- `bugfix/issue-id`
- `hotfix/urgent-fix`

### Pull Requests

Create pull requests (PRs) for code reviews and discussions before merging changes into the main branch.

## Additional Tips

### Commit Often

Make frequent, small commits to keep track of your progress and make it easier to identify issues.

### Write Meaningful Commit Messages

Write clear and concise commit messages to describe the purpose of each change.

### Keep Your Branches Up-to-Date

Regularly rebase or merge the latest changes from the main branch into your feature branch to minimize conflicts.

### Use Tags for Releases

Tag commits that represent release points to easily identify versions.

```sh
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

By following these best practices, you can ensure a smooth and efficient workflow for version management with Git and GitHub. Happy coding!

[Cheat Sheet](./git.sh)

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
