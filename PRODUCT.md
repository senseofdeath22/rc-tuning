# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Three.js. A future Tauri desktop wrapper is allowed, but the first version runs as a web application.

## Users

The primary user is an RC-model owner working on a real vehicle in a home workshop. The first supported vehicle is the user's modified MN 128. Future users should be able to work with any RC model whose construction, dimensions, or CAD data can be sourced openly and normalized.

## Product Purpose

The product is a visual engineering workspace for inspecting, disassembling, modifying, and planning an RC build. It combines an interactive 3D digital twin, a complete assembly tree, compatibility checks, before/after performance estimates, and purchase links for suitable components.

Success means a user can select any replaceable part in the model, understand how it is connected, preview a replacement, see compatibility consequences across neighboring systems, compare estimated vehicle characteristics, and find a place to buy the required part or adapter.

## Positioning

Unlike a generic RC catalog or 3D viewer, the product connects every modeled component to a real assembly slot, mechanical and electrical interfaces, compatibility rules, calculated vehicle effects, and current purchase offers.

## Operating Context

- The user works beside a physical RC model and may compare the digital assembly with the real vehicle.
- The main screen is an engineering workspace: interactive 3D vehicle in the center, assembly navigation, contextual part properties, compatible alternatives, and build metrics.
- Users create and compare multiple builds such as current, stock, planned, and specialized variants.
- The application must support assemblies at several depths: complete systems, subassemblies, individual components, and fasteners.

## Capabilities and Constraints

- The first vehicle is MN 128, including non-stock installed components.
- Any modeled component can be replaceable: body, frame, axles, suspension, transmission, steering, electronics, wheels, internal gears, bearings, links, adapters, and fasteners.
- Parts and assemblies use universal category schemas instead of hard-coded forms.
- Compatibility includes category, dimensions, mount geometry, neighboring interfaces, electrical limits, required adapters, load limits, and 3D collisions.
- Replacement may create a dependency chain and require additional components.
- Calculated outputs are engineering estimates and must be labeled as such until calibrated with real measurements.
- Purchase offers are separate from canonical part records and include source, URL, price, availability, region, and freshness.
- New vehicle packages require normalized geometry, assembly metadata, slots, joints, stock configuration, and compatibility rules; open source material is not assumed to be automatically usable.
- The first prototype may use authored demonstration geometry and synthetic catalog data until measured MN 128 assets are supplied.

## Evidence on Hand

No CAD files, measurements, photographs, manufacturer datasets, part catalog, or verified commercial integrations have been supplied yet. The first prototype must not imply that demonstration geometry, compatibility values, prices, or offers are verified real-world data.

## Product Principles

1. The vehicle is an assembly graph, not a single 3D mesh.
2. Every compatibility decision must be explainable.
3. Replacements are evaluated as system changes, not isolated catalog choices.
4. The 3D model is the primary working surface; commerce supports the engineering decision.
5. The data model must support additional RC vehicles without rewriting the application.

## Accessibility & Inclusion

The web interface must remain keyboard navigable, maintain readable contrast, expose text alternatives for visual state, and support reduced motion.
