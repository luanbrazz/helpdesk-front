import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataHora();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create() {
    this.chamadoService.create(this.chamado).subscribe({
      next: (resposta) => {
        this.snackBar.open("Chamado cadastrado com sucesso!", "Fechar", {
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
}
