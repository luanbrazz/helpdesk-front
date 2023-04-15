import { Directive, ElementRef, HostListener } from "@angular/core";
@Directive({
  selector: "[appCpfMask]",
})
export class CpfMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event"])
  onInput(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, "");

    if (value.length > 3 && value.length < 6) {
      input.value = `${value.substr(0, 3)}.${value.substr(3)}`;
    } else if (value.length >= 6 && value.length < 9) {
      input.value = `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(
        6
      )}`;
    } else if (value.length >= 9) {
      input.value = `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(
        6,
        3
      )}-${value.substr(9)}`;
    } else {
      input.value = value;
    }
  }
}
