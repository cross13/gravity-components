# Publishing to npm

This library ships to the public npm registry as **`@crosscode/gravity-components`** under the npm user [**crosscode**](https://www.npmjs.com/~crosscode). Releases use [Changesets](https://github.com/changesets/changesets) and GitHub Actions: version bumps and changelog updates are automated; publishing runs in CI after those changes land on `main`.

Scoped packages default to restricted visibility on npm; this repo sets `"publishConfig": { "access": "public" }` in `package.json` so installs stay `npm install @crosscode/gravity-components` without auth.

## Prerequisites

1. **npm account `crosscode`** (or a token tied to that account) with permission to publish **`@crosscode/gravity-components`**. The scope `@crosscode` must match the npm username that owns the scope.
2. **GitHub repository** settings aligned with the workflows:
   - Default branch is `main` (see `.changeset/config.json` and workflow `on.push.branches`).
3. **Secret: `NPM_TOKEN`** (see below)—create the token while logged in as the user that can publish this scope.

## One-time: npm automation token

1. Sign in at [https://www.npmjs.com/](https://www.npmjs.com/) as **`crosscode`** (or the maintainer account for `@crosscode`).
2. Open **Access Tokens** (profile menu → **Access Tokens**).
3. Create a token that can **publish** from CI:
   - **Granular Access Token** (recommended): under **Permissions**, set **Packages and scopes** to **Read and write**. For a **first publish**, use **All packages** or explicitly allow **`@crosscode/gravity-components`** (and creating new packages under `@crosscode` if npm offers that). Do **not** use read-only.
   - **Classic**: type **Automation** (not “Publish” with interactive 2FA, not read-only). [Automation tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens) are intended for `npm publish` in CI.
4. Copy the token once; npm will not show it again.
5. In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.
6. Name: **`NPM_TOKEN`** (exactly), value: the token string. If you rotated the token, update this secret; old values always fail with 403.

The [Release](../.github/workflows/release.yml) workflow uses `NPM_TOKEN` and `NODE_AUTH_TOKEN` so `npm` and Changesets authenticate to `https://registry.npmjs.org/`.

### Confirm the token before relying on CI

Same auth as GitHub Actions (`setup-node` + `NODE_AUTH_TOKEN`):

```bash
NODE_AUTH_TOKEN="npm_xxxxx" npm whoami --registry https://registry.npmjs.org/
```

You should see **`crosscode`** (or whichever npm user owns the `@crosscode` scope). If this fails or prints the wrong user, fix the token or the secret value. That user must be allowed to publish **`@crosscode/gravity-components`** (see **E403** below).

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
- Publishes **`@crosscode/gravity-components`** to npm as **public** (`publishConfig.access`)

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

- Ensure the **`@crosscode`** scope exists on npm for your user (publishing the first package under `@crosscode/...` typically creates it for that account).
- `repository` in `package.json` should match this GitHub repo for discoverability and tooling.
- Add at least one changeset on `main` (or on a branch you merge), merge, then merge the generated **version packages** PR so the workflow can publish.
- Avoid republishing the same version; if a version is already on the registry, bump again via Changesets.

## Troubleshooting

### `E403` / `You may not perform that action with these credentials`

This comes from npm when the registry rejects the publish. Common causes:

1. **Token cannot write**  
   Read-only granular tokens, expired tokens, or wrong secret name in GitHub (must be `NPM_TOKEN`) all produce 403. Recreate a token with **read and write** (or Automation classic) and paste the full value into the repo secret again.

2. **Granular token does not include this package**  
   If the token is limited to specific packages, add **`@crosscode/gravity-components`** **or** use **All packages** for the first successful publish.

3. **Wrong npm user**  
   `npm whoami` for that token must be **`crosscode`** (the account that owns the `@crosscode` scope). A token for a different user cannot publish under `@crosscode/*` unless that user is added as a maintainer on the package.

4. **Scope mismatch**  
   The package `name` in `package.json` must stay `@crosscode/gravity-components` to match the npm scope owned by **crosscode**. Changing scope or user without updating npm ownership causes 403.

5. **Publish with OTP required**  
   If your account forces 2FA for publish, use an **Automation** classic token or a granular token that is allowed to publish without interactive OTP—not a normal “Publish” token that expects a one-time password in the terminal.

### Other issues

- **Release opens no PR**: There may be no changeset files under `.changeset/` (except `config.json`). Run `npm run changeset` and merge.
- **“Package already exists”** (version clash): The version in `package.json` is already on npm; merge a new **version packages** PR with a higher version.
