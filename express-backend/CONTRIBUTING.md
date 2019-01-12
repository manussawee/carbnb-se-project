# Contribution Guidelines

## When Making Changes
- Create a new branch based on `master`.
- Commit your changes to the new branch.
- Create a merge request.

## Branch Naming
Currently we divide a change into the following categories:
- `feat`: a change which introduces a new feature.
- `fix`: a change which patches a bug.
- `test`: a change which introduces new tests.
- `docs`: a change made to the documentation which does not affect the codebase.
- `imp`: a change which improves the codebase without adding a new feature or fixing a bug (e.g. a refactor).

Name a branch with `category/descriptive-name-for-your-branch`, for example, `feat/payment`, `fix/infinite-redirects`, `test/broken-internet`.

If you think that the name of your branch is not descriptive enough, feel free to rename it at any time.

## Merge Requests
- The name of your merge request should be the same as, or at least similar to, your branch name.
- In your merge requests, specify:
  - The purpose of the merge.
  - What changes are being made.
  - **List of all breaking changes.**
- It is recommended to request for at least 1-2 approvals from other people, preferably those who will be affected by the changes, to make sure that the change is known and thoroughly reviewed.
- Removing the source branch after a merge is optional, but recommended to make the project clean.
- **Squashing commits is highly recommended.** This makes the commit history a lot easier to go through in `master` which will help in tracking down bugs.
- The project is set to only allow fast-forward merges. Rebasing your branch might be required before merging. This creates a clean commit history and provides a streamlined way of resolving merge conflicts.
