const { app, BrowserWindow } = require('electron');

function createWindow() {
  let win = new BrowserWindow({
    maxWidth: 800,
    maxHeight: 600,
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    transparent: true,
    icon: 'src/images/icon.ico',
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
      enableRemoteModule: true,      
    },
  });
  win.loadFile('src/pages/index.html');
  app.on('closed', () => {
    win = null;
    user.done();
  });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
