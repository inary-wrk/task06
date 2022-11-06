import { Component, OnInit } from '@angular/core';
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";
import {StateDataService} from "../../core/services/stateData.service";
import {SessionsResponse_Session} from "../../core/Client";

@Component({
  selector: 'app-objects-from-history',
  templateUrl: './objects-from-history.component.html',
  styleUrls: ['./objects-from-history.component.css']
})
export class ObjectsFromHistoryComponent implements OnInit {
  historyItems: SessionsResponse_Session;
  constructor(private blocksManager: BlocksOpenManagerService, private stateService: StateDataService) {

  }

  ngOnInit(): void {
    this.getStateItems();
  }

  setValues(): void {
    this.blocksManager.setDefaultObjectsPanelContentShow(true);
    this.blocksManager.setHistoryObjectsPanelContentShow(false);
  }
  getStateItems(): void {
    this.stateService.stateObjects$.subscribe(x => {
      this.historyItems = x;
    })
  }
}
