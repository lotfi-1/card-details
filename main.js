/** @format */

function insertFormat(ele, e, parent, maxLength, text = "numbers only") {
  if (
    (isNaN(Number(e.key)) || e.key.charCodeAt(0) == 32) &&
    e.key !== "Backspace" &&
    e.key !== "Tab"
  ) {
    e.preventDefault();
    if (
      parent.lastElementChild.className !== "wrong" &&
      ele.value.length < maxLength
    ) {
      addElement(parent, ele, text);
    }
  } else {
    checkmessage(parent, ele);
  }
}

function addElement(parent, ele, text) {
  if (parent !== undefined) {
    ele.style.borderColor = "#E91E63";
    let e = document.createElement("div");
    e.className = "wrong";
    e.textContent = text;
    parent.style.position = "relative";
    e.style.cssText = `
        color: #E91E63; 
        height: 15px;
        padding-left: 5px;
        font-size: 10px ;
        flex:1;height:15px;
        position:absolute; 
        left:0;
        bottom:-20px;`;
    parent.append(e);
  }
}
function isCharacterALetter(char) {
  return /[a-zA-Z]/.test(char);
}

function checkmessage(parent, ele) {
  ele.onmousedown = function () {
    ele.style.borderColor = "#ccc";
    if (parent.lastElementChild.className === "wrong") {
      parent.lastElementChild.remove();
    }
  };
  if (
    parent !== undefined &&
    parent.lastElementChild.classList.contains("wrong")
  ) {
    ele.style.borderColor = "#ccc";
    parent.lastElementChild.remove();
  }
}

let userName = document.querySelector(".container form div:nth-child(1) input");
let insertWrongName = document.querySelector(
  ".container form div:nth-child(1)"
);
userName.onkeydown = function (e) {
  userName.maxLength = 15;
  if (
    !isCharacterALetter(e.key) &&
    e.key.charCodeAt(0) !== 32 &&
    e.key !== "Backspace"
  )
    e.preventDefault();
};
checkmessage(insertWrongName, userName);

let numCard = document.querySelector(".container form div:nth-child(2) input");
let insertWrongCode = document.querySelector(
  ".container form div:nth-child(2)"
);
numCard.onkeydown = function (e) {
  numCard.maxLength = 19;
  insertFormat(numCard, e, insertWrongCode, 19);
  if (e.key !== "Backspace") {
    switch (numCard.value.length) {
      case 4:
      case 9:
      case 14:
        numCard.value += " ";
    }
  }
};
checkmessage(insertWrongCode, numCard);

let insertWrongMMYY = document.querySelector(
  ".container form div:nth-child(3)"
);
let mDate = document.querySelector(
  ".container form div:nth-child(3) input:first-of-type"
);
mDate.onkeydown = function (e) {
  mDate.maxLength = 2;
  insertFormat(mDate, e, insertWrongMMYY, 2);
};
checkmessage(insertWrongMMYY, mDate);

let yDate = document.querySelector(
  ".container form div:nth-child(3) input:last-child"
);
yDate.onkeydown = function (e) {
  yDate.maxLength = 2;
  insertFormat(yDate, e, insertWrongMMYY, 2);
};
checkmessage(insertWrongMMYY, yDate);

let cvc = document.querySelector(".container form div:nth-child(4) input");
let insertWrongcvc = document.querySelector(".container form div:nth-child(4)");
cvc.onkeydown = function (e) {
  cvc.maxLength = 3;
  insertFormat(cvc, e, insertWrongcvc, 3);
};
checkmessage(insertWrongcvc, cvc);

let confirm = document.querySelector(".container form div:last-child input");
confirm.onclick = function (e) {
  let input = document.querySelectorAll(".container form [type=text]");
  let parent = document.querySelectorAll(" .container form .data");
  let x = 0;
  input.forEach(function (ele, ind) {
    if (ele.value === "") {
      x++;
      switch (ind) {
        case 0:
        case 1: {
          checkmessage(parent[ind], ele);
          addElement(parent[ind], ele, "can't be blank");
          break;
        }
        case 2:
        case 3: {
          checkmessage(parent[2], ele);
          addElement(parent[2], ele, "Invalide Date");
          break;
        }
        case 4: {
          checkmessage(parent[3], ele);
          addElement(parent[3], ele, "can't be blank");
          break;
        }
      }
    } else {
      switch (ind) {
        case 1:
          x = succes(ele, parent[1], "codeCard", x);
          break;
        case 2:
          x = succes(ele, parent[2], "month", x);
          break;
        case 3:
          x = succes(ele, parent[2], "year", x);
          break;
        case 4:
          x = succes(ele, parent[3], "cvc", x);
          break;
      }
    }
  });
  if (x === 0) {
    let form = document.querySelector(".container form ");
    if (form !== undefined) form.remove();
    addCardSeccessful();
    placeInformation(input);
  }
};
function succes(inputele, parent, type, x) {
  switch (type) {
    case "codeCard": {
      if (inputele.value.length < 19) {
        checkmessage(parent, inputele);
        addElement(parent, inputele, "incorrect code");
        x++;
      }
      break;
    }
    case "month": {
      if (Number(inputele.value) < 0 || Number(inputele.value) > 12) {
        checkmessage(parent, inputele);
        addElement(parent, inputele, "Invalide Date");
        x++;
      }
      break;
    }
    case "year": {
      const d = new Date();
      let date = Number(inputele.value);
      if (date < d.getFullYear() % 100 || date > (d.getFullYear() % 100) + 2) {
        checkmessage(parent, inputele);
        addElement(parent, inputele, "Invalide Date");
        x++;
      }
      break;
    }

    case "cvc": {
      if (inputele.value.length < 3) {
        checkmessage(parent, inputele);
        addElement(parent, inputele, "Invalide cvc");
        x++;
      }
      break;
    }
  }
  return x;
}

function addCardSeccessful() {
  let container = document.createElement("div");
  container.classList = "seccessfulContainer";
  container.style.cssText = `
    width:300px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    gap: 10px 0;`;

  let truee = document.createElement("div");
  truee.style.cssText = `
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-100%) rotate(-45deg);
    width:20px;
    height:8px;
    border-left:solid 3px white;
    border-bottom:solid 2px white;
    background-color:transparent;
    `;
  let trueCont = document.createElement("div");
  trueCont.append(truee);
  trueCont.style.cssText = `
    width: 50px;
    height:50px;
    border-radius:50%;
    background: linear-gradient(135deg, hsl(249, 99%, 64%)  0%,hsl(278, 94%, 30%));
    position:relative;
    margin-bottom:15px;
    `;
  container.append(trueCont);

  let thanks = document.createElement("div");
  thanks.textContent = "THANK YOU!";
  thanks.style.cssText = `
    flex-basis:100%;
    letter-spacing:1px;
    color : hsl(278, 94%, 30%); 
    text-align: center; 
    height:30px
    `;
  container.append(thanks);
  let message = document.createElement("div");
  message.textContent = "We've added your card details";
  message.style.cssText = `
    color : #ccc ; 
    text-align:center ; 
    padding-bottom:15px;
    flex-basis:100%;
    height:30px
    `;
  container.append(message);

  let confirmB = document.createElement("button");
  confirmB.textContent = "Confirm";
  confirmB.style.cssText = `
    color: white; 
    background: linear-gradient(135deg, hsl(249, 99%, 64%)  0%,hsl(278, 94%, 30%));
    height : 50px;
    border-radius : 10px ;
    cursor: pointer;
    outline: none;
    flex-basis:100%;
    border:none;
    `;
  container.append(confirmB);
  let insertsuccess = document.querySelector(".container");
  insertsuccess.append(container);

  let confirmclick = document.querySelector(".container .seccessfulContainer");
  if (confirmclick !== null) {
    confirmclick.onclick = function () {
      location.reload();
    };
  }
}
function placeInformation(inputInformation) {
  let htmlInfo = document.querySelectorAll(".info");
  htmlInfo.forEach(function (ele, ind) {
    if (ele.classList.contains("cvc"))
      ele.textContent = inputInformation[4].value;
    else if (ele.classList.contains("name"))
      ele.textContent = inputInformation[0].value;
    else if (ele.classList.contains("code"))
      ele.textContent = inputInformation[1].value;
    else
      ele.textContent =
        inputInformation[2].value + "/" + inputInformation[3].value;
  });
}
