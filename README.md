# Universe404 ECLIPSE — Tebex Store Template

A responsive dark storefront for Minecraft and gaming communities, built for Tebex's Twig-based custom template system.

## Included

- Core pages: layout, homepage, category, package, checkout, username and package options.
- Optional tiered membership assets for subscription categories and tier changes.
- Responsive emerald-accented CSS and lightweight JavaScript.
- Tebex Config Schema for editable brand, colours, server address, Discord and homepage content.
- Static preview with sample content.
- Commercial single-store license.

## Requirements

A Tebex store with custom-template access (Tebex Plus or an eligible Tebex Developer Plan). The buyer must have permission to create/edit a custom template in Webstore → Appearance.

## Installation

1. In Tebex, create a custom template based on Exo.
2. Replace the matching page files in the template editor with the files in `Webstore/`. Keep any other required default Exo pages/modules not included in this package.
3. Upload `Assets/eclipse.css` and `Assets/eclipse.js` as assets with those exact names.
4. Upload `Assets/category/tiered.html` and `Assets/quote.html` as assets if the store uses tiered memberships.
5. Open Change Schema and paste `schema.json`.
6. Save as draft. Test homepage, categories, package pages, package options, username login, basket, checkout and tier changes.
7. Publish only after testing against the buyer's actual Tebex store.

## Important

The preview is static and does not process purchases. Live checkout, store login providers, server delivery, payment gateways and tier transitions must be verified in the buyer's own Tebex store. Never include Tebex private tokens or API keys in a theme.

This is an independent third-party template and is not affiliated with Tebex, Mojang or Microsoft.

## License

Commercial single-store license. Each separately operated Tebex store requires its own license. See [LICENSE](LICENSE).
