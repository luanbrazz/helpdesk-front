import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
  @ViewChild("passwordInput") passwordInput: any;
  hide = true;

  nome: FormControl = new FormControl(null, Validators.minLength(4));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(4));

  currentDate: Date;
  constructor() {}

  ngOnInit(): void {
    this.dataHora();
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

  // Função para formatar CPF
  maskCpf(value: string): string {
    let cpf = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (cpf.length === 11) {
      // Verifica se o valor informado é um CPF válido
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Aplica a máscara
    }
    return cpf; // Retorna o CPF formatado ou o valor original
  }
}
