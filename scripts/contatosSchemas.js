
const loader = document.getElementById("loader")

async function getLocalização(){
    try{
        const resultado = await fetch("https://bjd9aof9.api.sanity.io/v2025-11-04/data/query/production?query=*%0A++%5B_type+%3D%3D+%27Localizacao%27%5D%0A%7B%0A++Rua%2C+%0A++++Bairro%2C%0A++++Cidade%0A%7D%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A&perspective=drafts", {
            method: "GET",
        })

        const dados = await resultado.json()
        console.log(dados.result)

        const rua = document.getElementById("rua")
        const bairro = document.getElementById("bairro")
        const cidade = document.getElementById("cidade")

        let ruaText = document.createElement("p")
        let bairroText = document.createElement("p")
        let cidadeText = document.createElement("p")

        ruaText.innerText = dados.result[0].Rua
        bairroText.innerText = dados.result[0].Bairro
        cidadeText.innerText = dados.result[0].Cidade

        rua.appendChild(ruaText)
        bairro.appendChild(bairroText)
        cidade.appendChild(cidadeText)

    }catch(err){
        console.error(err)
    }
}

async function getAtendimento() {
    try{
        const resultado = await fetch("https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%0A++%5B_type+%3D%3D+%27Atendimento%27%5D%0A%7B%0A++Email%2C%0A++++Numero%0A%7D%0A%0A%0A%0A%0A&perspective=drafts", {
            method: "GET",
        })

        const dados = await resultado.json()
        console.log(dados.result)

        const email = document.getElementById("email-contato")
        const numero = document.getElementById("telefone-contato")

        let emailText = document.createElement("p")
        let numeroText = document.createElement("p")

        emailText.classList.add("email")
        emailText.innerText = dados.result[0].Email
        numeroText.innerText = dados.result[0].Numero

        email.appendChild(emailText)
        numero.appendChild(numeroText)


    }catch(err){
        console.error(err)
    }
}

async function init() {
  await Promise.all([getAtendimento(), getLocalização()]);
  loader.style.display = "none";
}

init();