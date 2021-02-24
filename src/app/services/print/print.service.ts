import { Injectable } from '@angular/core'
import { ElectronService } from 'ngx-electron'

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor(private electronService: ElectronService) {}
  print(html) {
    if (this.electronService.isElectronApp)
      this.electronService.remote.getGlobal('testPrint')(1, 'EPSON TM-T82 ReceiptSA4', html)
  }
}
