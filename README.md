# React Websocket All-In-One Server

## App parts
* **React App**: `/src/App.js`
* **NodeJS Express Server**: `server.js`
  * Serves both the React App and the Websocket server

## How To Run Locally
* Install Docker Desktop
* Comment in the `ws` protocol instead of the `wss` for local use in `/src/App.js` (see known issues below)
* Run `./start.sh`

### Known Issues
To use locally for now, please comment back in the `ws` and `8080` port. The `wss` protocol is used
for when the application is actually hosted.

```
// This is just a hack for when the app is actually hosted. Defaults to WSS (WebSocket Secure).
// We also don't mention a specific port. Otherwise, fallback to WS (WebSocket) on port 8080
ws.current = new WebSocket(`wss://${window.location.hostname}`);
// ws.current = new WebSocket(`ws://${window.location.hostname}:8080`);
```