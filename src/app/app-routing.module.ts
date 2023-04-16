import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { TecnicoListComponent } from "./components/tecnico/tecnico-list/tecnico-list.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { TecnicoCreateComponent } from "./components/tecnico/tecnico-create/tecnico-create.component";
import { TecnicoUpdateComponent } from "./components/tecnico/tecnico-update/tecnico-update.component";

const routes: Routes = [
  {
    path: "",
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "tecnico", component: TecnicoListComponent },
      { path: "tecnico/create", component: TecnicoCreateComponent },
      { path: "tecnico/update/:id", component: TecnicoUpdateComponent },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
