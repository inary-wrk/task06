import { Component, OnInit } from '@angular/core';
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";
import {StateDataService} from "../../core/services/stateData.service";
import {EstateResponse_SingleEstate} from "../../core/Client";

@Component({
  selector: 'app-objects-id',
  templateUrl: './objects-id.component.html',
  styleUrls: ['./objects-id.component.css']
})
export class ObjectsIdComponent implements OnInit {

  showAnalogWindow = false;
  stateitem: EstateResponse_SingleEstate;
  constructor(private blocksManager: BlocksOpenManagerService, private stateDataService: StateDataService) { }

  ngOnInit(): void {
    this.getDataByObjectId();
  }

  getDataByObjectId(): void {
    this.stateDataService.getObjectDataById().subscribe(x => {
      this.stateitem = x;
      console.log(this.stateitem)
    })
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
