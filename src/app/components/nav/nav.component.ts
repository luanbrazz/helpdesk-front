import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.router.navigate(["chamados/update/1"]);
  }

  logout() {
    const snackBarRef = this.snackBar.open(
      "Deseja realmente sair do sistema?",
      "Sim",
      {
        duration: 6000,
        verticalPosition: "top",
        horizontalPosition: "end",
        panelClass: ["logout-snackbar"],
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.authService.logout();
      this.router.navigate(["login"]);
    });
  }
}
