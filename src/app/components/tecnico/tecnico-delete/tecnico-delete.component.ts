import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-delete",
  templateUrl: "./tecnico-delete.component.html",
  styleUrls: ["./tecnico-delete.component.css"],
})
export class TecnicoDeleteComponent implements OnInit {
  @ViewChild("passwordInput") passwordInput: any;
  hide = true;

  currentDate: Date;

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  constructor(
    private service: TecnicoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataHora();
    this.pegarIdDaUrl();
    this.findById();
  }

  pegarIdDaUrl() {
    this.tecnico.id = this.route.snapshot.paramMap.get("id");
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe((resp) => {
      resp.perfis = [];
      this.tecnico = resp;
    });
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe({
      next: (resposta) => {
        this.snackBar.open("Técnico deletado com sucesso!", "Fechar", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "end",
          panelClass: ["success-message"],
        });
        this.router.navigate(["/tecnicos"]);
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
