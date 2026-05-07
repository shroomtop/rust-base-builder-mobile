# Rust Console Edition Base Builder Mobile

A mobile-first, architecture-preserving fork of Rust Base Builder optimized as a planning companion for **Rust Console Edition** players on **Xbox Series X/S** and **PlayStation 5**.

This fork keeps the existing React/Vite/TypeScript/Three.js/R3F architecture and focuses Phase 1 on console-first product positioning, phone portrait usability, and clear uncertainty labeling.

## Product intent

This app is a next-gen Rust Console Edition base planning companion. It is designed for a player holding a phone next to a controller while playing on console.

Primary workflow:

- plan base footprints quickly from a phone
- place, rotate, select, edit, and preview structures
- preserve existing save/share/import/export behavior
- keep cost, upkeep, durability, and raid values clearly labeled as estimates
- avoid treating PC Rust as the source of truth

## Console safety disclaimer

This planner is optimized for Rust Console Edition next-gen console planning. It is not an official Rust tool and does not simulate the game engine exactly. Placement, costs, upkeep, durability, and raid estimates are approximations and should be verified in-game.

Mechanics may vary by:

- patch/version
- Official servers
- Community servers
- PTB/Staging
- Easy Mode
- Hard Mode
- server configuration

When a mechanic cannot be verified from the app data itself, treat it as one of:

- console estimate
- planning approximation
- needs in-game verification
- mode/patch dependent

## Architecture

Preserved stack:

- React
- Vite
- TypeScript
- Redux Toolkit state flow
- Three.js / React Three Fiber rendering
- existing import/export systems
- existing local storage behavior
- existing build and raid calculator systems where practical

This fork is **not** a single-file HTML conversion.

## Phase 1 changes

Phase 1 focuses on safe, non-destructive mobile/console positioning:

- replaced the old mobile blocker with a Rust Console Edition companion notes panel
- added a persistent Console Notes reopen button
- hardened mobile touch behavior to reduce browser scroll/pinch conflicts during canvas use
- relabeled transform controls away from keyboard-first PC wording
- increased mobile touch target sizing for the transform control cluster
- updated metadata for the fork deployment target
- documented console-specific acceptance testing and current limitations

## Building pieces and markers

Primary console-relevant planning pieces include:

- square foundation
- triangle foundation
- wall
- half wall
- low wall
- doorway
- window wall
- square floor
- triangle floor
- roof
- stairs
- door marker
- garage door marker
- tool cupboard marker
- sleeping bag marker
- box marker
- furnace marker
- workbench marker

Deployables are planning markers, not building material pieces. Do not treat deployables as material-tier structures.

Never imply:

- armored beds
- stone sleeping bags
- sheet-metal furnaces
- twig turrets
- armored boxes
- material-tier deployables

Building material tiers apply only to building structures:

- Twig
- Wood
- Stone
- Sheet Metal
- Armored

Note: the inherited Phase 1 model set primarily exposes Stone, Sheet Metal, and Armored structures. Twig/Wood coverage remains a planning gap unless implemented later.

## Cost, upkeep, and raid estimates

All cost, upkeep, durability, and raid values in this fork should be treated as:

- estimated
- configurable
- patch/mode dependent
- verify in-game

Raid mode should be read as an estimated planning aid only, including:

- estimated rocket path
- estimated C4 path
- estimated satchel path
- estimated explosive ammo path
- most efficient estimate

The app must not imply exact current Rust Console Edition meta accuracy without sourced and versioned console data.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

The app remains Vite-based and deploys the `dist` output.

## Mobile acceptance test

Phase 1 acceptance status:

| # | Test | Status |
|---:|---|---|
| 1 | Open the app on an Android phone in portrait. | Partial |
| 2 | Select square foundation from a mobile drawer. | Partial: existing object list remains primary selector |
| 3 | Place a square foundation. | Partial: existing placement flow preserved |
| 4 | Select triangle foundation. | Partial: existing object list remains primary selector |
| 5 | Rotate placement with thumb controls. | Partial: transform controls are touch-sized and relabeled |
| 6 | Place triangle foundation. | Partial: existing placement flow preserved |
| 7 | Select wall/doorway/window wall. | Partial: existing object list remains primary selector |
| 8 | Place on valid edge/socket. | Partial: inherited placement rules preserved |
| 9 | Select a piece by tapping it. | Partial: inherited selection behavior preserved |
| 10 | Delete from the mobile edit tray. | Not implemented in Phase 1 |
| 11 | Undo deletion. | Not implemented in Phase 1; inherited app comments list undo as future work |
| 12 | Upgrade a building piece to Stone. | Partial: inherited upgrade controls preserved |
| 13 | Downgrade it back. | Partial: inherited downgrade controls preserved |
| 14 | Place a TC marker. | Partial: inherited Tool Cupboard model preserved |
| 15 | Place a sleeping bag marker. | Partial: inherited Sleeping Bag model preserved |
| 16 | Confirm markers do not inherit building material tiers. | Partial: documented; deeper state validation remains future work |
| 17 | Toggle x-ray/visibility. | Partial: inherited visibility/x-ray controls preserved |
| 18 | Open raid estimate mode and view estimated raid cost. | Partial: inherited raid mode preserved; wording still needs deeper calculator pass |
| 19 | Open save/share drawer. | Partial: inherited import/export flow preserved |
| 20 | Copy build code. | Partial: inherited generated-code export preserved |
| 21 | Continue orbiting/pinching without page scrolling. | Partial: global touch-action/overscroll hardening added |
| 22 | Complete all actions without keyboard or desktop UI. | Not complete in Phase 1 |

## Known limitations

- This Phase 1 PR does not fully replace the desktop object list with a dedicated phone drawer.
- Delete and undo still need a deeper mobile edit tray pass.
- Existing calculators still contain inherited values and must be treated as planning approximations.
- Prebuilt bases may include inherited PC/community meta assumptions and need a later labeling pass.
- This fork does not yet provide sourced, versioned Rust Console Edition data tables.
- Mobile layout is improved but not yet a full phone-native redesign.

## Upstream credit

This project is forked from Rust Base Builder by Krystian Dzirba. This fork changes product direction toward Rust Console Edition next-gen console/mobile planning while preserving the original React/Vite/Three.js architecture.
