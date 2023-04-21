import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
  currentDate: Date;

  constructor() {}

  ngOnInit(): void {
    this.dataHora();
  }

  dataHora() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}
