const billInput = document.getElementById("bill");
const tipInputs = document.querySelectorAll("input[name='tip']");
const peopleInput = document.getElementById("people");
const peopleWrapper = document.getElementById("people-wrapper");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const tipCustomRadio = document.getElementById("tip-custom");
const customTipInput = document.getElementById("tip-custom-value");
const resetButton = document.getElementById("reset");

function calculateTip() {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    const selectedTip = Array.from(tipInputs).find(input => input.checked);
    const tipPercentage = selectedTip ? parseFloat(selectedTip.value) / 100 : 0;

    if (people > 0) {
        const tipAmount = (bill * tipPercentage) / people;
        const totalAmount = (bill / people) + tipAmount;
        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
        tipAmountDisplay.textContent = "$0.00";
        totalAmountDisplay.textContent = "$0.00";
    }
}

function clearTipSelectionStyles() {
    tipInputs.forEach(input => {
        input.parentElement.classList.remove("bg-green-900", "text-white");
    });
}

tipInputs.forEach(input => {
    input.addEventListener("change", (event) => {
        console.log(event.target.parentElement.parentElement);
        clearTipSelectionStyles();
        if (input !== tipCustomRadio) {
            event.target
                .parentElement
                .parentElement
                .classList
                .add("bg-green-900", "text-white");
        }
    });
});

billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);
tipInputs.forEach(input => input.addEventListener("change", calculateTip));

tipCustomRadio.addEventListener("change", () => {
    customTipInput.disabled = !tipCustomRadio.checked;
    if (tipCustomRadio.checked) {
        customTipInput.focus();
    }
});

customTipInput.addEventListener("input", () => {
    tipCustomRadio.value = customTipInput.value;
    tipCustomRadio.checked = true;
    calculateTip();
});

resetButton.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "1";
    tipInputs.forEach(input => input.checked = false);
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
});

peopleInput.addEventListener("input", () => {
    if (parseInt(peopleInput.value) === 0) {
        peopleWrapper.classList.add("border-2");
        document.getElementById("people-error").classList.remove("hidden");
    } else {
        peopleWrapper.classList.remove("border-2");
        document.getElementById("people-error").classList.add("hidden");
    }
});

// Initial calculation to set default values
calculateTip();