
const id = document.querySelectorAll(".price");
const qty = document.querySelectorAll(".qty");
const discount = document.querySelector("#dis_per");
const minus = document.querySelectorAll(".minus");
const plus = document.querySelectorAll(".plus")
qty.forEach(element => {
    element.addEventListener("input", CountTotal);
    element.addEventListener("blur", (event) => {
        let value = Number(event.target.value);
        if(value < 0){
            value = 0
        }
        event.target.value = value
        CountTotal()
    });
});
plus.forEach(element => {
    element.addEventListener("click", (event) => {
        const cl_input = event.target.closest(".wrap");
        const value = cl_input.querySelector(".qty");
        value.value = Number(value.value) + 1;
        CountTotal();
    });
});
minus.forEach(element => {
    element.addEventListener("click", (event) => {
        const cl_input = event.target.closest(".wrap");
        const value = cl_input.querySelector(".qty");
        if (value.value > 0){
            value.value = Number(value.value) - 1;
        }
        CountTotal();
    });
});

discount.addEventListener("input", CountTotal)
discount.addEventListener("blur", (event) => {
    let value = Number(event.target.value)
    if (value < 0)
    {
        value = 0
    }
    else if (value > 3)
    {
        value = 3
    }
    event.target.value = value
    CountTotal();
});



function CountTotal() {
    let total = 0
    for (let i = 0; i < id.length; i++) {
        total += Number(id[i].textContent) * Number(qty[i].value)
    }
    document.querySelector("#total").textContent = total
    let discount = Number(document.querySelector("#dis_per").value)
    document.querySelector("#discount").textContent = Math.round(total * (100-discount)/100)
}