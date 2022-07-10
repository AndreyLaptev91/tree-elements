const tree = [
  { id: "1", label: "1.", children: [] },
  { id: "2", label: "2.", children: [] },
  { id: "3", label: "3.", children: [] },
  { id: "4", label: "4.", children: [] },
  { id: "5", label: "5.", children: [] },
  { id: "6", label: "6.", children: [] },
  { id: "7", label: "7.", children: [] },
  { id: "8", label: "8.", children: [] },
  { id: "9", label: "9.", children: [] },
  { id: "10", label: "10.", children: [] },
];

const list = document.querySelector("#list");
createList(tree, list);

function createList(array, parent) {
  array.forEach((child) => {
    parent.append(createLiElement(child));
  });
}

function addTree(array, parenId) {
  array.forEach((paren) => {
    if (paren.id === parenId) {
      const newChild = {
        id: `${paren.id}-${paren.children.length + 1}`,
        label: `${paren.label}${paren.children.length + 1}.`,
        children: [],
      };

      paren.children.push(newChild);
      const elementParent = document.querySelector(`#f${paren.id}`);
      elementParent.children[1].children[0].append(createLiElement(newChild));
      elementParent.children[0].children[1].children[0].className = "";
      return null;
    }
    if (paren.children.length > 0) {
      addTree(paren.children, parenId);
    }
  });
}

function hideChildren(img) {
  const wrapperUl = img.parentElement.parentElement.parentElement.children[1];
  if (wrapperUl.className === "display-none") {
    wrapperUl.className = "light-img";
    img.src = "arrow_up_ic.svg";

    setTimeout(() => {
      wrapperUl.className = "";
    }, 2000);
  } else {
    wrapperUl.className = "display-none";
    img.src = "arrow_down_ic.svg";
  }
}

function createLiElement(object) {
  const { id, label, children } = object;
  const haveChildren = children.length > 0;
  const li = document.createElement("li");
  li.className = "element";
  li.id = `f${id}`;
  li.innerHTML = `
      <div class="element-content">
          <p>${label} </p>
          <div class="element-buttons">
            <img class="display-none" src="arrow_up_ic.svg" onclick="hideChildren(this)" />
            <button onclick="addTree(tree, (this.parentElement.parentElement.parentElement.id).slice(1))">+</button>
          </div>
      </div>
      <div>
        <ul></ul>
      </div>`;

  return li;
}

function makeExport() {
  console.log(tree);
}
