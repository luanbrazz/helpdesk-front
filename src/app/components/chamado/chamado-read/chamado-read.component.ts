import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Chamado } from "src/app/models/chamado";
import { ChamadoService } from "src/app/services/chamado.service";

@Component({
  selector: "app-chamado-read",
  templateUrl: "./chamado-read.component.html",
  styleUrls: ["./chamado-read.component.css"],
})
export class ChamadoReadComponent implements OnInit {
  currentDate: Date;

  // chamado: Chamado;

  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };

  constructor(
    private chamadoService: ChamadoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.dataHora();
  }

  findById() {
    this.chamadoService.findById(this.chamado.id).subscribe({
      next: (resp) => {
        this.chamado = resp;
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

  dataHora() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == "0") {
      return "BAIXA";
    } else if (prioridade == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }
}
