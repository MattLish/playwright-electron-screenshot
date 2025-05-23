import {
  _electron as electron,
  ElectronApplication,
  expect,
  test,
} from "@playwright/test";
import * as path from "path";
import { scaleImage } from "./util/png";

let electronApp: ElectronApplication;

test.beforeEach(async () => {
  // Launch Electron app
  electronApp = await electron.launch({
    args: [path.join(__dirname, "../dist/main.js")],
  });

  electronApp.on("console", console.log);
});

test.afterEach(async () => {
  // Close app after each test
  await electronApp.close();
});

test("should take a screenshot of the app", async () => {
  // Get the first window
  const window = await electronApp.firstWindow();
  window.on("console", console.log);

  // Wait for the app to be fully loaded
  await window.waitForLoadState("domcontentloaded");

  // await scaleImage({
  //   inputPath: path.join(
  //     __dirname,
  //     "./screenshot.spec.ts-snapshots/electron-app_large.png",
  //   ),
  //   outputPath: path.join(
  //     __dirname,
  //     "./screenshot.spec.ts-snapshots/electron-app.png",
  //   ),
  //   scale: "half",
  // });

  // Take a screenshot and compare with the baseline
  // await expect(window).toHaveScreenshot("electron-app.png", {scale: "css"});
  await expect(window).toHaveScreenshot("electron-app.png");
});
