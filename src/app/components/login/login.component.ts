import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Credenciais } from "src/app/models/credenciais";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  creds: Credenciais = {
    email: "",
    senha: "",
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  logar() {
    if (this.validaCampos()) {
      // lógica de login aqui
    } else {
      this.creds.senha = "";

      this.snackBar.open("Usuário ou senha inválida!", "Fechar", {
        duration: 4000, // duração da exibição em milissegundos
        verticalPosition: "top", // posição vertical do popup
        horizontalPosition: "end", // posição horizontal do popup
        panelClass: ["custom-snackbar"], // classe CSS personalizada para o popup
      });
    }
  }

  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }
}
