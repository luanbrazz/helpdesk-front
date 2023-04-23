import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Credenciais } from "src/app/models/credenciais";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  hide = true;

  @ViewChild("passwordInput") passwordInput: any;

  creds: Credenciais = {
    email: "",
    senha: "",
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private snackBar: MatSnackBar,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logar() {
    // lógica de login aqui
    this.service.autenticate(this.creds).subscribe(
      (resposta) => {
        this.service.loginSucesso(
          resposta.headers.get("Authorization").substring(7)
        );
        this.router.navigate([""]);
        this.snackBar.open("Sucesso no Login!", "Ok", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "end",
          panelClass: ["custom-snackbar", "valid-user"],
        });
      },
      () => {
        this.snackBar.open("Usuário ou senha inválida!", "Fechar", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "end",
          panelClass: ["custom-snackbar"],
        });
      }
    );
  }

  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
    if (!this.hide) {
      setTimeout(() => {
        this.hide = true;
        this.passwordInput.nativeElement.type = "password";
      }, 2000);
    }
  }
}
