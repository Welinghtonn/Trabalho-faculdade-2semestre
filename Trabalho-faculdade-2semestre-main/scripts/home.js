document.addEventListener("DOMContentLoaded", () => {
  getBanner();
});

async function getBanner() {
  try {
    const url =
      "https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'Banner'%5D%7BTitulo%2C%20Texto%2C%20'Fundo'%3AFundo.asset-%3Eurl%7D";

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Fetch falhou: ${resp.status} ${resp.statusText}`);

    const { result = [] } = await resp.json();
    if (!result.length) throw new Error("Nenhum documento 'Banner' encontrado.");

    const { Titulo = "", Texto = "", Fundo = "" } = result[0];

    const containerBanner = document.querySelector(".bgHome01");
    if (!containerBanner) throw new Error("Elemento .bgHome01 não encontrado no DOM.");

    if (Fundo) {
      containerBanner.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${Fundo}')`;
      containerBanner.style.backgroundSize = "cover";
      containerBanner.style.backgroundPosition = "center";
      containerBanner.style.backgroundRepeat = "no-repeat";
    }

    let cardBg = containerBanner.querySelector(".cardBgHome01");
    if (!cardBg) {
      cardBg = document.createElement("div");
      cardBg.className = "cardBgHome01";
      containerBanner.appendChild(cardBg);
    }

    let tituloEl = cardBg.querySelector(".textTituloCard");
    if (!tituloEl) {
      tituloEl = document.createElement("p");
      tituloEl.className = "textTituloCard";
    
      const bar = cardBg.querySelector(".barCard");
      if (bar) cardBg.insertBefore(tituloEl, bar);
      else cardBg.appendChild(tituloEl);
    }
    tituloEl.textContent = Titulo || " ";

    let textoEl = cardBg.querySelector(".textCard");
    if (!textoEl) {
      textoEl = document.createElement("p");
      textoEl.className = "textCard";
      const bar = cardBg.querySelector(".barCard");
      if (bar) cardBg.insertBefore(textoEl, bar.nextSibling); 
      else cardBg.appendChild(textoEl);
    }
    textoEl.textContent = Texto || " ";

  } catch (err) {
    console.error("Erro em getBanner():", err);
  }
}

async function getDados() {
  try {
    const resultado = await fetch("https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%0A++%5B_type+%3D%3D+%27Valores%27%5D%0A%7B%0A++%22Emoji%22+%3A+Emoji.asset-%3Eurl%2C%0A++++Titulo%2C%0A++++Texto%0A%7D%0A&perspective=drafts");

    const dados = await resultado.json();
    console.log(dados.result);

    const containerValores = document.querySelector(".containerCardValores");

    dados.result.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("cardsValores");

      const emoji = document.createElement("img");
      emoji.src = item.Emoji;
      emoji.alt = item.Titulo;
      emoji.classList.add("iconsCardValores");

      const title = document.createElement("p");
      title.classList.add("visao");
      title.textContent = item.Titulo;

      const line = document.createElement("div");
      line.classList.add("lineCardValores");

      const text = document.createElement("p");
      text.textContent = item.Texto;
      text.classList.add("textCardValores");

      card.append(emoji, title, line, text);
      containerValores.appendChild(card);
    });

  } catch (err) {
    console.error(err);
  }
}

//renderValores("#app");
getDados();



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
    const url = "https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'Historia'%5D%7B%0A%20%20Titulo%2C%0A%20%20Texto%2C%0A%20%20%22Imagem%22%3A%20Imagem.asset-%3Eurl%0A%7D&perspective=drafts";
    const response = await fetch(url);
    const data = await response.json();

    const item = Array.isArray(data.result) ? data.result[0] : null;
    if (!item) {
      console.warn("⚠️ Nenhum conteúdo encontrado em 'Historia'.");
      return;
    }

    const section = document.createElement("section");
    section.id = "historia";
    section.classList.add("historia");

    const container = document.createElement("div");
    container.classList.add("historia-container");

    const texto = document.createElement("div");
    texto.classList.add("historia-texto");

    const h2 = document.createElement("h2");
    h2.textContent = item.Titulo || "Nossa História";
    texto.appendChild(h2);

    const paragrafos = (item.Texto || "")
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(Boolean);

    paragrafos.forEach(f => {
      const p = document.createElement("p");
      p.textContent = f + ".";
      texto.appendChild(p);
    });

    const figure = document.createElement("figure");
    figure.classList.add("historia-imagem");

    const img = document.createElement("img");
    img.src = item.Imagem || "";
    img.alt = item.Titulo || "Imagem da seção História";
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
    console.error("Erro ao carregar a seção História:", err);
  }
}

getHistoria();
