import { Component, OnInit } from '@angular/core';
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";
import {Client, SessionsResponse_SessionHistoryItem} from "../../core/Client";
import {StateDataService} from "../../core/services/stateData.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyItems: SessionsResponse_SessionHistoryItem[];
  constructor(private blocksManager: BlocksOpenManagerService,
              private client: Client, private stateService: StateDataService) { }

  ngOnInit(): void {
    this.getHistoryObjects();
  }

  getHistoryObjects(): void {
  this.client.history(undefined).subscribe(x => {
    this.historyItems = x;
  })
  }

  setValues(id: number | undefined): void {
    this.stateService.setStateData(id);
    this.blocksManager.setDefaultObjectsPanelContentShow(false);
    this.blocksManager.setHistoryObjectsPanelContentShow(true);

  }
  setHistoryWindowOpen(): void {
    this.blocksManager.setHistoryWindowOpen(false);
  }
  getHistoryWindowOnTop(): boolean {
    return this.blocksManager.historyWindowOnTop;
  }
}
