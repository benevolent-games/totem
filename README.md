
> [!IMPORTANT]  
> *totem is a work-in-progress right now.. it's super not ready..*  

---

# 🗿 totem

— ***https://totem.benevolent.games/***  
— *3d prop editor for web games*  

### *totem* is an app for authoring `.totem` files

a `.totem` file packs `.glb` files together with a *prop manifest*.

a totem prop glues together glb art assets, physical characteristics, and other arbitrary attributes relevant to your games, eg *"this item is flammable"* or *"this item has 80 hitpoints"*, etc..

- you drag-and-drop in `.glb` files into totem as sources
- you arrange art assets from the glbs into formal `props`
- you configure each prop's `physics` and other properties
- you can write arbitrary `attributes` for each prop
- you export a packed `.totem` file

### `@benev/totem` provides tooling for babylonjs
- install the npm package `@benev/totem`
- totem provides functionality for loading `.totem` files into babylon, and instancing props into your scene

### about totem
- `.totem` format is game-engine-agnostic
- all your files stay locally on your computer
- free and open source, by https://benevolent.games/

