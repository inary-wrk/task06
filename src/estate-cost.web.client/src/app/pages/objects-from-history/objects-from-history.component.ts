import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";
import {StateDataService} from "../../core/services/stateData.service";
import {SessionsResponse_Session} from "../../core/Client";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-objects-from-history',
  templateUrl: './objects-from-history.component.html',
  styleUrls: ['./objects-from-history.component.css']
})
export class ObjectsFromHistoryComponent implements OnInit, OnDestroy {
  historyItems: SessionsResponse_Session | null;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private blocksManager: BlocksOpenManagerService, private stateService: StateDataService) {

  }

  ngOnInit(): void {
    this.getStateItems();
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
    this.stateService.clearStateItems();
  }

  setValues(): void {
    this.blocksManager.setDefaultObjectsPanelContentShow(true);
    this.blocksManager.setHistoryObjectsPanelContentShow(false);
  }
  getStateItems(): void {
    this.stateService.stateObjects$.pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.historyItems = x;
    })
  }
}
