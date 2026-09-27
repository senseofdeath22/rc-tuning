# RC Workshop main workspace

## Scope and mode

- Target: `src/App.tsx`
- Mode: Operate
- Approved comp: `.impeccable/mocks/rc-workshop-approved.png`
- User job: inspect the MN 128, expose internal systems, select any subsystem, remove or preview a part, and understand compatibility and vehicle impact.

## Chosen direction

An aviation-maintenance workbench translated into a live RC digital twin. The selected composition keeps the vehicle dominant, moves subsystems into a top strip, and combines inspection, compatibility and catalog results in one contextual right panel. The memorable moment is switching to “Внутренности”: the body disappears entirely while the rolling chassis remains in place.

## Visual record

- Ground sampled from comp: `#181c1e`
- Top bar sampled from comp: `#151b1d`
- Panel sampled from comp: `#191f21`
- Accent sampled from comp: `#fb8436`
- Cool text sample: `#a8b5c3`
- Corners: 3–5px on controls and bounded panels; no soft consumer cards.
- Lines: 1px cool steel-gray separators.
- Elevation: broad, low-opacity black shadows only for floating viewport controls and transient status.
- Type: narrow technical sans; tabular figures; compact uppercase subsystem labels.

## Implementation inventory

| Ingredient | Medium | Commitment |
|---|---|---|
| Tool rail and header | Semantic HTML + Phosphor icons | Fixed, compact, graphite surfaces |
| Subsystem strip | Tablist + icon library | Six categories, orange active underline |
| RC digital twin | Three.js/WebGL | Separate frame, body, axles, shocks, drivetrain, electronics and wheels |
| Internal view | React state + WebGL visibility | Body is absent, never transparent |
| Selected-part callout | Semantic HTML overlay | Orange rule and live Russian label |
| View controls | Semantic buttons | Body toggle plus orbit/zoom guidance |
| Part inspector | HTML `dl`, table and actions | Current part and real UI text, no baked pixels |
| Compatibility feed | Search, filters and compact rows | Preview and purchase-discovery actions |
| Dependency chain | Semantic ordered list | Three linked consequences per subsystem |
| Approved comp | Non-shipping raster reference | QA reference only; never shown in the application |

## Constraints and unresolved decisions

- All catalog values, prices and compatibility outcomes are explicitly demonstration data.
- No verified MN 128 CAD asset, measurements or store integration is currently available.
- A measured GLB model and marketplace adapters will replace prototype geometry and synthetic offers later.
