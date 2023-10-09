const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Isso é importante para manter a segurança.
      preload: __dirname + '/preload.js', // Opcional, para injetar scripts na WebView.
    },
  });

  win.loadFile('index.html'); // Carrega o arquivo HTML na WebView.
  win.setMenu(null);
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