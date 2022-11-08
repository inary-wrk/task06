import {Component, EventEmitter, OnInit} from '@angular/core';
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import {ru_RU} from "../../core/services/uppy-locales";
import Tus from "@uppy/tus";
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";
import {LogoutModalComponent} from "../logout-modal/logout-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {StateDataService} from "../../core/services/stateData.service";

export interface IFlatItem {
  name: string,
  square: number,
  rooms: number,
  floor: number,
  cost: number
}
@Component({
  selector: 'app-under-map-layout',
  templateUrl: './under-map-layout.component.html',
  styleUrls: ['./under-map-layout.component.css']
})
export class UnderMapLayoutComponent implements OnInit {
  constructor(private blocksManager: BlocksOpenManagerService, public dialog: MatDialog,
              private stateDataService: StateDataService) {

  }

  ngOnInit(): void {

  }

  getObjectCardWindowOpen(): boolean {
    return this.blocksManager.objectCardWindowOpen;
  }

  getShowStartObjectPanel(): boolean {
    return this.blocksManager.showStartObjectPanel;
  }
  getDefaultObjectsPanelContentShow(): boolean {
    return this.blocksManager.defaultObjectsPanelContentShow;
  }
  getHistoryObjectsPanelContentShow(): boolean {
    return this.blocksManager.historyObjectsPanelContentShow;
  }
  getHistoryWindowOpen(): boolean {
    return this.blocksManager.historyWindowOpen;
  }
  setHistoryWindowOpen(value: boolean): void {
    this.blocksManager.setHistoryWindowOpen(value);
    this.blocksManager.setHistoryWindowOnTop(true);
  }

  openLogoutDialog(): void {
    this.dialog.open(LogoutModalComponent)
  }

  getAnalogWindowOpen(): boolean {
    return this.blocksManager.analogWindowOpen;
  }
  setObjectWindowMobileVisible(value: boolean): void {
    this.blocksManager.objectWindowMobileVisible = value;
  }
}
