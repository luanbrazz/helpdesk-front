import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
  @ViewChild("passwordInput") passwordInput: any;
  hide = true;

  currentDate: Date;

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  nome: FormControl = new FormControl(null, Validators.minLength(4));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(4));

  constructor(
    private service: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataHora();
  }

  create(): void {
    this.service.create(this.cliente).subscribe({
      next: (resposta) => {
        this.snackBar.open("Cliente cadastrado com sucesso!", "Fechar", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "end",
          panelClass: ["success-message"],
        });
        this.router.navigate(["clientes"]);
      },
      error: (ex) => {
        console.log(ex);

        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.snackBar.open(element.message, "Fechar", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "end",
              panelClass: ["error-message"],
            });
          });
        } else {
          this.snackBar.open(ex.error.message, "Fechar", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "end",
            panelClass: ["error-message"],
          });
        }
      },
    });
  }

  addPerfil(perfil: any) {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
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

  dataHora() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}
