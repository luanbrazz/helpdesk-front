import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-update",
  templateUrl: "./chamado-update.component.html",
  styleUrls: ["./chamado-update.component.css"],
})
export class ChamadoUpdateComponent implements OnInit {
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

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  descricao: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.dataHora();
    this.findAllClientes();
    this.findAllTecnicos();
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

  update() {
    this.chamadoService.update(this.chamado).subscribe({
      next: (resposta) => {
        this.snackBar.open("Chamado atualizado com sucesso!", "Fechar", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "end",
          panelClass: ["success-message"],
        });
        this.router.navigate(["chamados"]);
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

  findAllClientes() {
    this.clienteService.findAll().subscribe((resp) => {
      this.clientes = resp;
      console.log(resp);
    });
  }

  findAllTecnicos() {
    this.tecnicoService.findAll().subscribe((resp) => {
      this.tecnicos = resp;
      console.log(resp);
    });
  }

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.descricao.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    );
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
