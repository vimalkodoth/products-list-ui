# Product Hierarchy App

## Quick start

Requirements:

This project was build with v16.13.2

Run following commands in the root directory of the project:

docker-compose up

## Notes on Improvements to be made:

- Render children in DOM only when the item is checked. Current solution uses CSS to handle expand/collapse. This was we can further reduce the initial DOM render tree for large lists.
