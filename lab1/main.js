function Sum() {
    let numbers = [];
    document.querySelectorAll(".input-group input").forEach(input => {
        let value = parseFloat(input.value);
        if (!isNaN(value)) {
            numbers.push(value);
        }
    });

    let sum = numbers.reduce((a, b) => a + b, 0);
    let avg = numbers.length ? (sum / numbers.length) : 0;
    let min = numbers.length ? Math.min(...numbers) : 0;
    let max = numbers.length ? Math.max(...numbers) : 0;

    document.getElementById("output").innerHTML = `
        Suma: ${sum} <br/>
        Średnia: ${avg} <br/>
        Minimalna wartość: ${min} <br/>
        Maksymalna wartość: ${max}
    `;
}

let inputCount = 0;
const inputColumn = document.getElementById("input-column");

function addField() {
    const div = document.createElement("div");
    div.classList.add("input-group");

    const input = document.createElement("input");
    input.classList.add("input");
    input.type = "number";
    input.id = `num${inputCount}`;
    input.placeholder = `Liczba ${inputCount + 1}`;
    input.addEventListener("input", Sum);

    const button = document.createElement("button");
    button.innerText = "🗑️";
    button.onclick = function () {
        removeField(button);
    };

    div.appendChild(input);
    div.appendChild(button);
    inputColumn.appendChild(div);

    inputCount++;
    Sum(); 
}

function removeField(button) {
    button.parentElement.remove();
    Sum(); 
}

addField();
addField();
addField();

