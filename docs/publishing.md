# Publishing to npm

This library ships to the public npm registry using [Changesets](https://github.com/changesets/changesets) and GitHub Actions. Version bumps and changelog updates are automated; publishing runs in CI after those changes land on `main`.

## Prerequisites

1. **npm account** with permission to publish the package name declared in `package.json` (`gravity-components`). If the name is taken, choose another and update `name` before the first release.
2. **GitHub repository** settings aligned with the workflows:
   - Default branch is `main` (see `.changeset/config.json` and workflow `on.push.branches`).
3. **Secret: `NPM_TOKEN`** (see below).

## One-time: npm automation token

1. Sign in at [https://www.npmjs.com/](https://www.npmjs.com/).
2. Open **Access Tokens** (profile menu → **Access Tokens**).
3. Create a **Granular Access Token** (recommended) or **Automation** classic token with permission to **read and write** for the package (or for all packages if you use a single org account).
4. In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.
5. Name: `NPM_TOKEN`, value: the token string.

The [Release](../.github/workflows/release.yml) workflow uses `NPM_TOKEN` and `NODE_AUTH_TOKEN` so `npm` and Changesets can authenticate to `https://registry.npmjs.org/`.

## Day-to-day release flow

### 1. Record what changed

After merging work that should affect the version (features, fixes, breaking changes):

```bash
npm run changeset
```

Follow the prompts: choose bump type (major / minor / patch), write a summary, and commit the new file under `.changeset/` with your PR.

### 2. Merge to `main`

When the PR (with the changeset file) merges, **Release** runs. If there are pending changesets, the [changesets/action](https://github.com/changesets/action) opens a PR titled **chore: version packages** that:

- Bumps `version` in `package.json`
- Updates the changelog (from Changesets config)
- Removes the consumed changeset files

Review and merge that PR.

### 3. Publish

Merging the **version packages** PR triggers **Release** again. With no remaining changesets and a new version to publish, the workflow runs `npm run release` (`changeset publish`), which:

- Runs `prepublishOnly` → `npm run build` (tsup → `dist/`)
- Publishes the package to npm

## Workflows (summary)

| Workflow | Trigger | Role |
|----------|---------|------|
| [CI](../.github/workflows/ci.yml) | PRs and pushes to `main` | `npm ci`, lint, test, build |
| [Release](../.github/workflows/release.yml) | Push to `main` | Version PR or `npm publish` via Changesets |

## npm scripts

| Script | Purpose |
|--------|---------|
| `npm run changeset` | Interactive: add a changeset file |
| `npm run version-packages` | Apply changesets (bump version + changelog); used by the Release workflow |
| `npm run release` | Build (via `prepublishOnly`) and publish; used by the Release workflow |

## First publish

- Ensure the package name is available on npm and `repository` in `package.json` matches this GitHub repo (for discoverability and tooling).
- Add at least one changeset on `main` (or on a branch you merge), merge, then merge the generated **version packages** PR so the workflow can publish.
- If you already published `0.1.0` manually, the next automated publish should be a higher version; avoid republishing the same version.

## Troubleshooting

- **Publish fails with 403 / OTP**: Use an **automation** or **granular** token with publish rights; classic tokens that require 2FA for publish are not suitable for CI.
- **Release opens no PR**: There may be no changeset files under `.changeset/` (except `config.json`). Run `npm run changeset` and merge.
- **“Package already exists”**: The version in `package.json` is already on npm; merge a new **version packages** PR with a higher version.
