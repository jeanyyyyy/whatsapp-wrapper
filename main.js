const { app, BrowserWindow } = require('electron');
const path = require('path');

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    let mainWindow;

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.setName('WhatsApp');
    app.setAppUserModelId('whatsapp-wrapper');

    function openWindow() {
        app.userAgentFallback =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/136.0.0.0 Safari/537.36';

        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            icon: path.join(__dirname, 'assets/whatsapp.svg'),
            title: 'WhatsApp',
        });

        mainWindow.loadURL('https://web.whatsapp.com/');

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    app.whenReady().then(openWindow);
}
