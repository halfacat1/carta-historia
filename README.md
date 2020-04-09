# Carta Historia
## Description
- This project queries all of the battles that are present in [Wikidata](https://www.wikidata.org/) and visualizes them on the world map.
- The user can use the sliding timeline on the bottom to filter by a year range
- Hovering/clicking on events on the map displays a battle's name and year

## Supported Platforms
- Desktop browser support is top priority
- Chrome provides the best performance, followed by Firefox & Edge
- Mobile/touch support exists but the experience is limited by display size

## Development
### Requirements
- Docker
- make
- The `Dockerfile` is designed to using the project's root dir as a mounted volume

### Workflows
- `make setup`
    - **First-time setup!**
    - Installs necessary packages
- `make start`
    - Runs the react dev server

## Deployment
- Uses GitHub Actions
- Triggers on pushes to `master`
- Publishes to GitHub Pages
