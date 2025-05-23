import { app, BrowserWindow, screen } from "electron";
import * as path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    minimizable: false,
    maximizable: false,
    show: false,
  });

  mainWindow.showInactive();

  mainWindow.loadFile(path.join(__dirname, "../index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  console.log("Scale Factor:", screen.getPrimaryDisplay().scaleFactor);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
