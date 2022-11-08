import {Injectable} from "@angular/core";
import {StateDataService} from "./stateData.service";

@Injectable({
  providedIn: 'root'
})

export class BlocksOpenManagerService {
  showStartObjectPanel: boolean = true;
  historyWindowOpen: boolean = false;
  defaultObjectsPanelContentShow: boolean = false;
  historyObjectsPanelContentShow: boolean = false;
  objectCardWindowOpen: boolean = false;
  analogWindowOpen: boolean = false;
  objectWindowMinimize: boolean = false;

  historyWindowOnTop: boolean;
  objectWindowOnTop: boolean;
  analogWindowOnTop: boolean;
  objectWindowMobileVisible: boolean = false;
  constructor(private stateDataService: StateDataService) {
    console.log(stateDataService.isFileLoaded)
  }

  setHistoryWindowOnTop(value: boolean): void {
    this.historyWindowOnTop = value;
    this.objectWindowOnTop = false;
    this.analogWindowOnTop = false;
  }
  setObjectWindowOnTop(value: boolean): void {
    this.historyWindowOnTop = false;
    this.objectWindowOnTop = value;
    this.analogWindowOnTop = false;
  }
  setAnalogWindowOnTop(value: boolean): void {
    this.historyWindowOnTop = false;
    this.objectWindowOnTop = false;
    this.analogWindowOnTop = value;
  }

  setShowStartObjectPanel(value: boolean): void {
    this.showStartObjectPanel = value;
  }
  setHistoryWindowOpen(value: boolean): void {
    this.historyWindowOpen = value;
  }
  setDefaultObjectsPanelContentShow(value: boolean): void {
    this.defaultObjectsPanelContentShow = value;
  }
  setHistoryObjectsPanelContentShow(value: boolean): void {
    this.historyObjectsPanelContentShow = value;
  }
  setObjectCardWindowOpen(value: boolean): void {
    this.objectCardWindowOpen = value;
  }
  setAnalogWindowOpen(value: boolean): void {
    this.analogWindowOpen = value;
  }
  setObjectWindowMinimize(value: boolean): void {
    this.objectWindowMinimize = value;
  }


}
