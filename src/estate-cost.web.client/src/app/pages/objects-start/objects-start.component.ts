import {Component, OnInit} from '@angular/core';
import Dashboard from "@uppy/dashboard";
import {ru_RU} from "../../core/services/uppy-locales";
import XHRUpload from "@uppy/xhr-upload";
import Uppy from "@uppy/core";
import {StateDataService} from "../../core/services/stateData.service";
import Tus from "@uppy/tus";
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";

@Component({
  selector: 'app-objects-start',
  templateUrl: './objects-start.component.html',
  styleUrls: ['./objects-start.component.css']
})
export class ObjectsStartComponent implements OnInit {
  uppy = new Uppy();
  constructor(public stateDataService: StateDataService, private blockManager: BlocksOpenManagerService) {
  }

  ngOnInit(): void {
    this.initUppy();
  }

  initUppy(): void {
    const context = this;
    this.uppy.
      use(Dashboard, {
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
        getResponseData(resText, resData: any) {
          if (resData.status == 200) {
            context.blockManager.showStartObjectPanel = false;
            context.blockManager.defaultObjectsPanelContentShow = true;
          }
        }
      })
    console.log(this.uppy.state)
  }

}
