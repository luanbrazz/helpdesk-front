import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
  @ViewChild("passwordInput") passwordInput: any;
  hide = true;

  currentDate: Date;
  constructor() {}

  ngOnInit(): void {
    this.dataHora();
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
