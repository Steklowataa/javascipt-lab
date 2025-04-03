function Sum() {
    let numbers = [];
    document.querySelectorAll(".input-group input").forEach(input => {
        let value = parseFloat(input.value)
        if (!isNaN(value)) {
            numbers.push(value)
        }
    })

    let sum = numbers.reduce((a, b) => a+b, 0)
    let avg = sum / numbers.length
    let min = Math.min(...numbers)
    let max = Math.max(...numbers)

    document.getElementById("output").innerHTML = `
    Suma: ${sum}  <br/>
    Srednia: ${avg}  <br/>
    Minimalna wartość: ${min} <br/>
    Maxymalna wartość: ${max}`

}

let inputCount = 0; 
    const inputColumn = document.getElementById("input-column");

    function addField() {
        const div = document.createElement("div");
        div.classList.add("input-group");
        div.innerHTML = `
            <input class="input" type="number" id="num${inputCount}" placeholder="Liczba ${inputCount + 1}">
            <button onclick="removeField(this)">🗑️</button>
        `;
        inputColumn.appendChild(div);
        inputCount++;
    }

function removeField(button) {
    button.parentElement.remove()
}

addField()
addField()
addField()
