/**
 * Created by Zhongyi on 5/2/16.
 */
'use strict';

const path = require('path');
const {app, Menu, nativeImage, Tray} = require('electron');

const config = require('./config');

class AppTray {
  constructor(splashWindow, mainWindow) {
    this.splashWindow = splashWindow;
    this.mainWindow = mainWindow;

    let image;
    image = nativeImage.createFromPath(config.tray.icon);
    image.setTemplateImage(true);

    this.tray = new Tray(image);
    this.tray.setToolTip(config.tray.title);

    if (process.platform === 'linux') {
      let contextMenu = Menu.buildFromTemplate([
        {
          label: 'Show', click: () => this.hideSplashAndShowWeChat()
        },
        {
          label: 'Exit',
          click: () => app.exit(0)
        }
      ]);
      this.tray.setContextMenu(contextMenu);
    } else {
      this.tray.on('click', () => this.hideSplashAndShowWeChat());
    }
  }

  setTitle(title) {
    this.tray.setTitle(title);
  }

  hideSplashAndShowWeChat() {
    if (this.splashWindow.isShown) {
      return;
    }
    this.mainWindow.show();
  }
}

module.exports = AppTray;