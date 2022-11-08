import {Client, SessionsResponse_Session, SessionsResponse_SingleEstate} from "../Client";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {IMapItem} from "../../pages/main/main.component";

@Injectable({
  providedIn: 'root'
})
export class StateDataService {
  private stateObjects: Subject<SessionsResponse_Session | null> = new Subject<SessionsResponse_Session | null>();
  public stateObjects$ = this.stateObjects.asObservable();
  objectId: number | undefined;
  private geometries: Array<IMapItem> = [];
  isFileLoaded: boolean;
  constructor(private client: Client) {
  }


  setStateData(id: number | undefined): void {
    if (id) {
      this.client.change(id).subscribe(x => {})
    }

    this.client.state().subscribe(x => {
      this.geometries = [];
      x.estatePool?.forEach((x: SessionsResponse_SingleEstate) => {
        if (x.coordinates) {
          const coordinates = [x.coordinates.latitude, x.coordinates.longitude];
          this.geometries.push(<IMapItem>{coordinates});
        }
      })
      this.stateObjects.next(x);
    })
  }
  setObjectDataById(id: number | undefined): void {
    this.objectId = id;
  }
  getObjectDataById(): Observable<any> {
    return this.client.estate(Number(this.objectId));
  }
  clearStateItems(): void {
    this.stateObjects.next(null);
  }
  getGeometries(): any {
    return this.geometries;
  }
}
