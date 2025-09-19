

async function getDados() {
    try {
        const resultado = await fetch("https://dummyjson.com/c/091b-d505-4819-a890", {
            method: "GET",
        })

        const dados = await resultado.json()

        const visao = document.getElementById("visao")
        const missao = document.getElementById("missao")
        const valores = document.getElementById("valores")

        let visaoText = document.createElement("p")
        let missaoText = document.createElement("p")
        let valoresText = document.createElement("p")

        visaoText.innerText = dados[0].visao
        missaoText.innerText = dados[1].missao
        valoresText.innerText = dados[2].valores

        visaoText.classList.add("titleCardValores")
        missaoText.classList.add("titleCardValores")
        valoresText.classList.add("titleCardValores")

        console.log(missaoText)

        visao.appendChild(visaoText)
        missao.appendChild(missaoText)
        valores.appendChild(valoresText)

    } catch (err) {
        console.error(err)
    }
}

getDados()