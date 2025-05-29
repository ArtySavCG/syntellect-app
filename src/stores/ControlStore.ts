import { makeAutoObservable } from "mobx";

export class ControlStore {
  text: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setText(value: string) {
    this.text = value;
  }

  clearText() {
    this.text = "";
  }

  setHelloWorld() {
    this.text = "Hello world!";
  }

  showTextAlert() {
    alert(this.text);
  }

  showNumberAlert() {
    const num = Number(this.text);
    if (!isNaN(num)) {
      alert(num);
    } else {
      alert("Пожалуйста, введите корректное число");
    }
  }
}