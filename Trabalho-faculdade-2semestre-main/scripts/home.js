

async function getDados() {
    try {
        const resultado = await fetch("https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%0A++%5B_type+%3D%3D+%27Valores%27%5D%0A%7B%0A++%22Emoji%22+%3A+Emoji.asset+-%3Eurl%2C%0A++++Titulo%2C%0A++++Texto%0A%7D%0A%0A%0A%0A&perspective=drafts ", {
            method: "GET",
        })
        console.log(resultado)
        const dados = await resultado.json()
        console.log(dados.result)

        const visao = document.getElementById("visao")
        const missao = document.getElementById("missao")
        const valores = document.getElementById("valores")

        let visaoText = document.createElement("p")
        let missaoText = document.createElement("p")
        let valoresText = document.createElement("p")

        visaoText.innerText = dados.result[0].Texto
        missaoText.innerText = dados.result[1].Texto
        valoresText.innerText = dados.result[2].Texto

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


document.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('.sidebar .tab');
  const sections = document.querySelectorAll('.secao');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('ativo'));
      tab.classList.add('ativo');

      const target = tab.getAttribute('data-target');
      sections.forEach(sec => {
        sec.classList.toggle('ativa', sec.id === target);
      });
    });
  });

//carrossel
  document.querySelectorAll('.swiper').forEach(swiperEl => {
    new Swiper(swiperEl, {
      loop: true,
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-button-next'),
        prevEl: swiperEl.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: swiperEl.querySelector('.swiper-pagination'),
        clickable: true,
      },
    });
  });
});

//Dinamização da seção da história

async function getHistoria() {
    try {
        const resultado = await fetch("https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%0A++%5B_type+%3D%3D+%27Historia%27%5D%0A%7B%0A++Titulo%2C%0A++++Texto%2C%0A++++%22Imagem%22+%3A+Imagem.asset-%3Eurl%0A%7D%0A%0A%0A%0A%0A&perspective=drafts", {
            method: "GET",
        })
        console.log(resultado);
        const dados = await resultado.json();

        console.log(dados.result);
  const item = (dados && Array.isArray(dados.result) && dados.result[0]) || null;
    if (!item) {
      console.warn("Sem conteúdo em Historia.");
      return;
    }

    // <section id="historia" class="historia">
    const section = document.createElement("section");
    section.id = "historia";
    section.classList.add("historia");

    const container = document.createElement("div");
    container.classList.add("historia-container");

    const texto = document.createElement("div");
    texto.classList.add("historia-texto");

    // Título
    const h2 = document.createElement("h2");
    h2.textContent = item.Titulo || "";
    texto.appendChild(h2);

    // Parágrafos (quebra por ponto, ?, ! — ignora vazios)
    const frases = (item.Texto || "")
      .split(/[.!?]+/g)
      .map(s => s.trim())
      .filter(Boolean);

    frases.forEach(f => {
      const p = document.createElement("p");
      p.textContent = f + ".";
      texto.appendChild(p);
    });

    // Imagem
    const figure = document.createElement("figure");
    figure.classList.add("historia-imagem");
    const img = document.createElement("img");
    img.src = item.Imagem || "";
    img.alt = item.Titulo || "Imagem da seção história";
    img.loading = "lazy";
    figure.appendChild(img);

    container.append(texto, figure);
    section.appendChild(container);


    const mount = document.querySelector("#historia-root");
    if (mount) {
      mount.innerHTML = "";
      mount.appendChild(section);
    } else {
      document.body.appendChild(section);
    }

    } catch (err) {
        console.error(err);
    }
  }

getHistoria();