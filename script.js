
const id = document.querySelectorAll(".price");
const qty = document.querySelectorAll(".qty");
const discount = document.querySelector("#dis_per");
const minus = document.querySelectorAll(".minus");
const plus = document.querySelectorAll(".plus")

const params = new URLSearchParams(window.location.search)
document.querySelector("#dis_per").value = params.get("Disc")
qty.forEach(element => {
    const mat = element.closest("tr").querySelector("td").textContent;
    const mat_value = params.get(mat);
    if (mat_value !== null)
    {
        element.value = mat_value;
    }
});
CountTotal();


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
    let discount = Number(document.querySelector("#dis_per").value)
    document.querySelector("#total").textContent = Math.round(total * (100-discount)/100)
    WriteUrl()
}

function WriteUrl() {
    let url = new URLSearchParams
    qty.forEach(element => {
        let name = element.closest("tr").querySelector("td").textContent
        if (element.value != 0)
        {
            url.set(name, element.value)
        }
    });
    const disc = Number(document.querySelector("#dis_per").value);
    if (disc != 0) {
        url.set("Disc", disc)
    }
    history.replaceState(null, "", "?" + url.toString());
}