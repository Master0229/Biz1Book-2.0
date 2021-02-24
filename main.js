const { app, BrowserWindow, Menu } = require('electron')
var express = require('express');
var api = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const url = require("url");
const path = require("path");
const electron = require('electron');
const { PosPrinter } = require("electron-pos-printer");
// const database = require('./database')
// const find = require('local-devices');
// const ip = require('ip');
// const customTitlebar = require('custom-electron-titlebar');

// new customTitlebar.Titlebar({
// 	backgroundColor: customTitlebar.Color.fromHex('#4b7cf3') 
// });

// Print
global.testPrint = function (count, printer, template) {

    const options = {
        preview: false,                                 // Preview in window or print
        width: '300px',                                 //  width of content body
        margin: '0 0 0 0',                              // margin of content body
        copies: 1,                                      // Number of copies to print
        printerName: printer,         // printerName: string, check it at webContent.getPrinters()
        timeOutPerLine: 400,
        silent: true
    }
    console.log(options)
//     var template =
//         `<div class="header">
//     <p style="text-align: center;font-family: Helvetica;font-size: medium;"><strong>FB Cakes n Sweets</strong></p>
//     <p style="text-align: center;font-family: Helvetica;font-size: small;">
//     Test, Test, 9600888834<br>
//     GSTIN:Q4A5D8W6ASD<br>
//     Counter Invoice: 2220210205/1<br>
//     Feb 5, 2021 12:37 PM</p>
//     <hr>
//     </div>
//     <div hidden>
//       <p style="text-align: left;font-family: Helvetica;font-weight: bold;">Customer Address</p>
//       <p style="text-align: center;">,</p>
//       <p style="text-align: center;"></p>
//       <hr>
//     </div>
//     <table>
//         <thead>
//             <tr>
//                 <th style="width: 100px;"><strong>ITEM</strong></th>
//                 <th><strong>PRICE</strong></th>
//                 <th><strong>QTY</strong></th>
//                 <th style="text-align: right;padding-right:20px"><strong>AMOUNT</strong></th>
//             </tr>
//         </thead>
//         <tbody><tr>
//       <td style="width: 100px;">BLACK FOREST PASTRY</td>
//       <td>50</td>
//       <td>1</td>
//       <td style="text-align: right;padding-right:20px">50.00</td>
//       </tr><tr>
//       <td style="width: 100px;">PINEAPPLE PASTRY</td>
//       <td>50</td>
//       <td>1</td>
//       <td style="text-align: right;padding-right:20px">50.00</td>
//       </tr>
//     </tbody>
//     </table>
//     <hr>
//     <table>
//         <tbody>
//             <tr>
//                 <td style="width: 100px;"><strong>Subtotal</strong></td>
//                 <td></td>
//                 <td></td>
//                 <td style="text-align: right;padding-right:20px">100.00</td>
//             </tr><tr>
//       <td style="width: 100px;"><strong>CGST</strong></td>
//       <td></td>
//       <td></td>
//       <td style="text-align: right;padding-right:20px">9.00</td>
//   </tr><tr>
//       <td style="width: 100px;"><strong>SGST</strong></td>
//       <td></td>
//       <td></td>
//       <td style="text-align: right;padding-right:20px">9.00</td>
//   </tr>
//             <tr hidden>
//                 <td style="width: 100px;">Extra</td>
//                 <td></td>
//                 <td></td>
//                 <td style="text-align: right;padding-right:20px"><strong>0.00</strong></td>
//             </tr>
//             <tr>
//                 <td style="width: 100px;">Total</td>
//                 <td></td>
//                 <td></td>
//                 <td style="text-align: right;padding-right:20px"><strong>118.00</strong></td>
//             </tr>
//             <tr >
//                 <td style="width: 100px;">Paid</td>
//                 <td></td>
//                 <td></td>
//                 <td style="text-align: right;padding-right:20px"><strong>118.00</strong></td>
//             </tr>
//             <tr hidden>
//                 <td style="width: 100px;">Balance</td>
//                 <td></td>
//                 <td></td>
//                 <td style="text-align: right;padding-right:20px"><strong>0.00</strong></td>
//             </tr>
//         </tbody>
//     </table>
//     <hr hidden>
//     <p hidden style="text-align: center;font-family: Helvetica;">undefined</p>
//     <hr>
//     <p style="text-align: center;">Thankyou. Visit again.&#128521;</p>
//   </div>
//   <style>
//   table, p{
//     empty-cells: inherit;
//     font-family: Helvetica;
//     font-size: small;
//     width: 290px;
//     padding-left: 0px;
//   }
//   th{
//     text-align: left 
//   }
//   hr{
//     border-top: 1px dashed black;
//     margin-top: 0.5em ;
//     margin-bottom: 0.5em;
//   }
//   tr.bordered {
//     border-top: 100px solid #000;
//     border-top-color: black;
//   }
//   </style>`;
    var obj = {
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image'
        value: `${template}`,
        style: ``,
        css: {}
    };
    const data = [{
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image'
        value: `${template}`,
        style: ``,
        css: {}
    }];
    for (let i = 0; i <= count; i++) {
        // data.push(obj);
        PosPrinter.print(data, options)
            .then(() => { })
            .catch((error) => {
                console.error(error);
            });

    }
    // for (let i = 0; i <= 100; i++) {
    PosPrinter.print(data, options)
        .then(() => { })
        .catch((error) => {
            console.error(error);
        });
}

let mainWindow
function redirect() {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
}

function createWindow() {
    mainWindow = new BrowserWindow({
        // backgroundColor: ' rgb(27, 69, 160)',
        titleBarStyle: "hiddenInset",
        width: 800,
        height: 600,
        // titleBarStyle: "hidden", 
        // frame: false,
        // transparent: true,
        icon: __dirname + `/dist/favicon.png`,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        vibrancy: 'ultra-dark'
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    //   Hide Menu Bar Electron
    mainWindow.setMenu(null)

    var menu = Menu.buildFromTemplate([
        {
            label: 'Biz1Book POS',
            submenu: [
                {
                    label: 'Reload',
                    // accelerator: "F5", 
                    accelerator: process.platform === 'darwin' ? 'Ctrl+R' : 'F5',
                    click() { redirect(); }
                },
                {
                    role: 'toggledevtools',
                    accelerator: process.platform === 'darwin' ? 'Ctrl+T' : 'F12',

                },
                { role: 'togglefullscreen' },
                {
                    role: 'close',
                    accelerator: process.platform === 'darwin' ? 'F10' : 'Ctrl+Q',
                },
            ]
        }
    ])
    Menu.setApplicationMenu(menu);

}
// function toggleFullscreen() {
//     if (mainWindow.isFullScreen()) {
//         mainWindow.setFullScreen(false);
//     } else {
//         mainWindow.setFullScreen(true);
//     }
// }

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})


//////////////////////////////////////PRINT/////////////////////////////////////////////////////////////
global.GetPrinters = function () {
    return mainWindow.webContents.getPrinters()
}
// global.scanlan = function () {
//   return find();
// }
// global.startserver = function (){
//   return database.startserver();
// }
// global.database = function (){
//   return database.app
// }
// Print
global.testPrint = function (count, printer, template) {
    console.log(count, printer, mainWindow.webContents.getPrinters()[5].name)
    const options = {
        preview: false,               // Preview in window or print
        width: '300px',               //  width of content body
        margin: '0 0 0 0',            // margin of content body
        copies: count,                // Number of copies to print
        printerName: mainWindow.webContents.getPrinters()[5].name,         // printerName: string, check with webContent.getPrinters()
        timeOutPerLine: 5000,
        silent: true
        // pageSize: { height: 301000, width: 71000 }  // page size
    }
    const data = [
        {
            type: 'text',             // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: template,
            style: ``,
            css: {}
        }
    ]
    PosPrinter.print(data, options)
        .then(() => {
            console.log("Print Successfull")
        })
        .catch((error) => {
            console.error(error);
        });
}
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(bodyParser.raw());
api.use(cors());

api.post('/print', function (req, res) {
    console.log(req.body.count, req.body.printer, mainWindow.webContents.getPrinters()[5].name)
    const options = {
        preview: false,               // Preview in window or print
        width: '300px',               //  width of content body
        margin: '0 0 0 0',            // margin of content body
        copies: req.body.count,                // Number of copies to print
        printerName: mainWindow.webContents.getPrinters()[5].name,         // printerName: string, check with webContent.getPrinters()
        timeOutPerLine: 5000,
        silent: true
        // pageSize: { height: 301000, width: 71000 }  // page size
    }
    const data = [
        {
            type: 'text',             // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: req.body.template,
            style: ``,
            css: {}
        }
    ]
    var response = {data: null}
    PosPrinter.print(data, options)
        .then(() => {
            console.log("Print Successfull")
            response.data = "Print Successfull"
            res.send(response)
        })
        .catch((error) => {
            console.error(error);
            response.data = error
            res.send(response)
        });
});

var server = api.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example api listening at http://%s:%s", host, port)
    api.emit('appstarted', server.address())
});