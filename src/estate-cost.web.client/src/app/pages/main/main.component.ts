import { Component, OnInit } from '@angular/core';
import Uppy from '@uppy/core';
import {Client} from "../../core/Client";
import Dashboard from "@uppy/dashboard";
import Tus from "@uppy/tus";
import {ru_RU} from "../../core/services/uppy-locales";
import {StateDataService} from "../../core/services/stateData.service";
export interface IMapItem {
  purchaseId: number,
  coordinates: number[]
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  uppy = new Uppy()
  mapContents: Array<IMapItem> = [];
  mapPanelOpen = false;

  constructor(private client: Client, private stateDataService: StateDataService) {
  }

  ngOnInit(): void {
  this.geometriesListener();
  }

  getMapPanelInfo(purchaseId: number) {
    this.mapPanelOpen = true;
    // this.client.purchase_GetPurchaseMapById(purchaseId).subscribe(data => {
    //   this.mapPanelInfo = data;
    // this.mapPanelInfo.name = this.torgiService.buildPurchaseName(this.mapPanelInfo);
    // });
  }

  geometriesListener(): void {
    // this.mapContents = this.stateDataService.geometries;
  }

}
