import KeyPressLissener from "./KeyPressLissener.js";

export default class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("text_message");

    this.element.innerHTML = `
        <p class="text_message__p">${this.text}</p>
        <button class="text_message__button">Next</button>
    `

    this.element.querySelector(".text_message__button").addEventListener("click", () => {
      this.done();
    })

    this.actionListenner = new KeyPressLissener("Enter", () => {
      this.actionListenner.unbind();
      this.done();
    })
  }

  done() {
    this.element.remove();
    this.onComplete();
  }
}