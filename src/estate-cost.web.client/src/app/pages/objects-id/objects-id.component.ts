import { Component, OnInit } from '@angular/core';
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";

@Component({
  selector: 'app-objects-id',
  templateUrl: './objects-id.component.html',
  styleUrls: ['./objects-id.component.css']
})
export class ObjectsIdComponent implements OnInit {

  showAnalogWindow = false;

  constructor(private blocksManager: BlocksOpenManagerService) { }

  ngOnInit(): void {
  }

  setObjectCardWindowOpen(value: boolean): void {
    this.blocksManager.setObjectCardWindowOpen(value);
  }

  setShowAnalogWindow(value: boolean): void {
    this.blocksManager.setAnalogWindowOnTop(true);
    this.blocksManager.objectWindowMobileVisible = true;
    this.blocksManager.setAnalogWindowOpen(value)
  }
  getObjectWindowOnTop(): boolean {
    return this.blocksManager.objectWindowOnTop;
  }
  getObjectWindowMobileVisible(): boolean {
    return this.blocksManager.objectWindowMobileVisible;
  }
  setObjectWindowMobileVisible(value: boolean): void {
    this.blocksManager.objectWindowMobileVisible = value;
  }
  getShowAnalogWindow(): boolean {
    return this.blocksManager.analogWindowOpen;
  }
}
