import { Component, OnInit } from '@angular/core';
import Uppy from '@uppy/core';
import { IFlatItem } from '../under-map-layout/under-map-layout.component';
import Dashboard from '@uppy/dashboard';
import { ru_RU } from '../../core/services/uppy-locales';
import XHRUpload from '@uppy/xhr-upload';
import { BlocksOpenManagerService } from '../../core/services/blocks-open-manager.service';
import {StateDataService} from "../../core/services/stateData.service";
import {SessionsResponse_Session} from "../../core/Client";

@Component({
  selector: 'app-objects-default',
  templateUrl: './objects-default.component.html',
  styleUrls: ['./objects-default.component.css'],
})
export class ObjectsDefaultComponent implements OnInit {
  objectWindowMinimize = false;

  uppy = new Uppy();
  flatItem: SessionsResponse_Session;
  objectCardWindowOpen: boolean;
  constructor(private blocksManager: BlocksOpenManagerService,
              private stateDataService: StateDataService) {
    this.objectCardWindowOpen = blocksManager.objectCardWindowOpen;
  }

  ngOnInit(): void {
    this.stateDataService.setStateData(undefined);
    this.initUppy();
    this.getFlats();
  }

  initUppy(): void {
    this.uppy
      .use(Dashboard, {
        trigger: '#upload-file',
        closeAfterFinish: true,
        showProgressDetails: true,
        theme: 'auto',
        locale: {
          strings: ru_RU,
        },
      })
      .use(XHRUpload, {
        endpoint: 'https://localhost:7079/api/sessions/fileupload',
        getResponseError(responseText, xhr) {
          return Error(responseText);
        },
      });
  }

  getFlats(): void {
    this.stateDataService.stateObjects$.subscribe(x => {
      this.flatItem = x
    })
  }

  setObjectCardWindowOpen(value: boolean): void {
    this.blocksManager.setObjectCardWindowOpen(value);
    // this.blocksManager.setDefaultObjectsPanelContentShow(false);
  }
  getObjectWindowMinimize(): boolean {
    return this.blocksManager.objectWindowMinimize;
  }
  setObjectWindowMinimize(value: boolean | null): void {
    value
      ? this.blocksManager.setObjectWindowMinimize(value)
      : this.blocksManager.setObjectWindowMinimize(
          !this.blocksManager.objectWindowMinimize
        );
  }
  setObjectWindowOnTop(value: boolean): void {
    this.blocksManager.setObjectWindowOnTop(value);
  }
  setShowAnalogWindow(value: boolean): void {
    this.blocksManager.analogWindowOpen = value;
  }
  setObjectWindowMobileVisible(value: boolean): void {
    this.blocksManager.objectWindowMobileVisible = value;
  }
}
