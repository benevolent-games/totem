
# totem systems design

## glossary
- **cellar:** OPFS storage of GLB files, content-addressable by hash, deduplicated
- **pod:** a container that points at a GLB (includes label and metadata)
- **assetref:** reference inside a prop, points at a pod and identifies an art asset (e.g. mesh or node)
- **phys:** physical characteristics, hitboxes, rigidbody metadata
- **attrs:** arbitrary JSON metadata (e.g. gameplay tags)
- **prop:** an amalgamation of assetrefs, phys, and attrs; defines a composite object made of assets

## system model

### glb import flow
- dragging a `.glb` into the ui immediately adds it to the cellar
- cellar deduplicates via content hashing; filenames are stored as editable labels

### totem file import flow
- when you drag a `.totem` file onto the app:
  - glbs packed file are added to the cellar
  - the 

### assetref model
- all visible 3d scenegraph elements (nodes, meshes, lights, empties) are eligible as "art assets"
- assetrefs are **created only when a user attaches an asset to a prop**
- assetrefs are **not global**—they live inside props
- each assetref points at a pod (which wraps a glb) and a specific node name within it

### prop internals
- each prop contains:
  - a list of assetrefs (with transform data)
  - physical metadata (e.g. collider shapes, rigidbody params)
  - attrs: arbitrary metadata
- exporting a `.totem` file bundles:
  - a manifest of props with assetref relationships
  - references to relevant glbs (may be included or linked)

## user interface

### primary top-level tabs
- **about**
  - greeting/info page about totem
- **cellar**
  - shows all glbs stored in opfs cellar
  - shared across projects
- **projects**
  - switch between multiple open projects

### within each project
- **3d viewport**
  - visualizer for selected content
  - orbit camera, zoom, drag
- **workbench tabs**
  - project-specific functionality (see below)

### project workbench tabs
- 🗿 **view mode**
  - hides side panel for clean viewport view
- 🫛 **pods**
  - manage glb references (pods)
  - alerts for broken links, missing files, etc
- 🎨 **assets**
  - hierarchical catalog of glb nodes (grouped by pod)
  - can select an art asset (node) to preview
- 🗃️ **props**
  - list of all defined props
  - select to preview in 3d
- 🛠️ **edit**
  - this is for editing the currently-selected prop
  - assetrefs: arrange multiple assets together in 3d space
  - phys: edit physics, collider shapes, rigidbody data
  - attrs: gameplay metadata json
- 🎒 **pack**
  - decide what props or glbs you want to include in the .totem file
  - big 'ol export button for generating and downloading the .totem file

### project selected items
- **selected asset** and **selected prop** are global per-project selections.. interaction model:
  - from **assets tab**: "add to selected prop"
  - from **props tab**: "add selected asset"
  - from **edit tab**: manage current prop, add selected asset
- benefits: very minimal ui
- limitation: no drag-and-drop between tabs (single-panel workflow)

