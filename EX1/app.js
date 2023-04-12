// let menu = ['rau xào', 'thịt luộc','gà rán'];

class menu {
  #menu = this._getItemLocalStorage("menu") ?? [
    "rau xào",
    "thịt luộc",
    "gà rán",
  ];
  constructor() {
    localStorage.setItem("menu", JSON.stringify(this.#menu));

    const valuePrompt = prompt("Nhập 1 trong 4 ký tự sau: “C,R,U,D”");

    if (valuePrompt) {
      switch (valuePrompt.toUpperCase()) {
        case "C":
          const valueCreate = prompt(
            "Mời người dùng nhập món ăn muốn thêm vào menu"
          );
          this.create(valueCreate);
          break;
        case "R":
          this.read();
          break;
        case "U":
          this.update();
          break;

        case "D":
          this.delete();
          break;
        default:
          break;
      }
    }
  }

  create(value) {
    this.#menu.push(value);
    this._setItemLocalStorage();
  }

  read() {
    console.log(this._getItemLocalStorage("menu"));
    this._render("menu");
  }

  update() {
    const valueUpdate = prompt(
      "Mời người dùng nhập vào tên món muốn update"
    ).toLowerCase();
    const itemIndex = this.#menu.findIndex((item) =>
      item.toLowerCase().includes(valueUpdate)
    );
    const newValueUpdate = prompt("Mời người dùng nhập vào tên món ăn mới");
    this.#menu[itemIndex] = newValueUpdate;
    this._setItemLocalStorage();
  }

  delete() {
    const valueDelete = prompt("Mời người dùng nhập vào tên món muốn Delete");
    const itemIndex = this.#menu.findIndex((item) =>
      item.toLowerCase().includes(valueDelete)
    );
    if (itemIndex < 0) return;
    this.#menu.splice(itemIndex, 1);
    this._setItemLocalStorage();
  }

  _getItemLocalStorage(value) {
    console.log(JSON.parse(localStorage.getItem(value)));
    return JSON.parse(localStorage.getItem(value));
  }

  _setItemLocalStorage() {
    localStorage.setItem("menu", JSON.stringify(this.#menu));
    return this;
  }

  _render(value) {
    const popup = document.querySelector(".popup");
    const localStrVal = this._getItemLocalStorage(value);
    const liValue = localStrVal.map((item) => `<li>${item}</li>`).join("");

    const html = `
            <h3>Danh sách các món ăn:</h3>
            <ul>
               ${liValue}
            </ul>
            `;

    popup.innerHTML = html;
    return this;
  }
}

console.log(new menu());
