import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./pages/main/main.component";
import {AuthorizeComponent} from "./pages/authorize/authorize.component";
import {AuthGuard} from "./core/guards/auth-guard";

const router: Routes = [
  {path: '', component: AuthorizeComponent},
  {path: 'main', component: MainComponent, canLoad: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
