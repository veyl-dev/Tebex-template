# ECLIPSE QA Report

## Automated checks

GitHub Actions run: https://github.com/veyl-dev/Tebex-template/actions/runs/41370346488

Result: **Success**

- Schema JSON parses and all configured option types are allowlisted.
- Required template, asset and preview files are present.
- CSS brace balance and page inheritance checks pass.
- Category and package templates use the documented root variables.
- Username template includes external and non-external login paths.
- Checkout template initializes Tebex.js with the hosted basket ident.
- Options and tier template files pass static content checks.
- Chromium browser smoke tests pass on desktop and 390px mobile viewport.
- Mobile navigation opens/closes.
- Copy-server-address interaction works under a clipboard test stub.
- Mobile page has no horizontal overflow.
- No uncaught page errors in the static preview.
- Release ZIP is built and uploaded as a workflow artifact.

## Not covered by these checks

The static preview uses sample data and is not connected to a Tebex store. These flows still require a real store and must be tested by the store owner:

- Tebex template editor parsing and rendering of every Twig page.
- Real username and external login providers.
- Live package option submission and game-server selection.
- Real subscription purchase, tier upgrade/downgrade and cancellation.
- Payment gateway checkout and post-payment delivery commands.

Do not describe these live flows as tested until they have been verified on an actual Tebex store.
