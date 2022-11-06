import { Component, OnInit } from '@angular/core';
import ObjectManager = ymaps.ObjectManager;
import {BlocksOpenManagerService} from "../../core/services/blocks-open-manager.service";

@Component({
  selector: 'app-objects-analog',
  templateUrl: './objects-analog.component.html',
  styleUrls: ['./objects-analog.component.css']
})
export class ObjectsAnalogComponent implements OnInit {

  constructor(private blocksManager: BlocksOpenManagerService) { }

  ngOnInit(): void {
  }

  setAnalogWindowOpen(value: boolean): void {
    this.blocksManager.setAnalogWindowOpen(value)
  }

  getAnalogWindowOnTop(): boolean {
    return this.blocksManager.analogWindowOnTop;
  }
}
