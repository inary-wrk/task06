import {Client, SessionsResponse_Session} from "../Client";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StateDataService {
  private stateObjects: Subject<SessionsResponse_Session> = new Subject<SessionsResponse_Session>();
  public stateObjects$ = this.stateObjects.asObservable();
  geometries: Array<{} | undefined> | null = new Array<{} | undefined>();
  constructor(private client: Client) {
  }


  setStateData(id: number | undefined): void {
    if (id) {
      this.client.change(id).subscribe(x => {})
    }

    this.client.state().subscribe(x => {
      this.geometries = null;
      x.estatePool?.forEach(x => {
      this.geometries?.push(x.coordinates)
      })
      this.stateObjects.next(x);
    })
  }
}
