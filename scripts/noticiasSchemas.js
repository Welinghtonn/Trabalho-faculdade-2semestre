
const loader = document.getElementById("loader")

//hambuerguer//

const hamburguer = document.getElementById("hamburguer");
const menuLateral = document.getElementById("menu-lateral");

if (hamburguer && menuLateral) {
  hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("ativo");
    menuLateral.classList.toggle("ativo");
  });

  document.querySelectorAll(".menu-lateral a").forEach(link => {
    link.addEventListener("click", () => {
      hamburguer.classList.remove("ativo");
      menuLateral.classList.remove("ativo");
    });
  });
}


async function getNoticias() {
  try {
    const resultado = await fetch("https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%0A++%5B_type+%3D%3D+%27Noticias%27%5D%0A%7B%0A++Titulo%2C%0A++++Texto%2C%0A++++%22Imagem%22+%3A+Imagem.asset-%3Eurl%2C%0A++++DataCompleta%2C%0A++++++Link%0A++%0A%7D%0A%0A%0A%0A%0A%0A%0A&perspective=drafts", {
      method: "GET",
    });

    const dados = await resultado.json();

    const containerPrincipal = document.querySelector(".news");

    dados.result.forEach((item) => {

      const divPrincipal = document.createElement("div");
      divPrincipal.classList.add("boxNoticia")

      const divContainerNoticia = document.createElement("div");
      divContainerNoticia.classList.add("container", "noticias");

      const divImg = document.createElement("div");
      divImg.classList.add("imgNews");
      const img = document.createElement("img");
      img.src = item.Imagem || "../assets/noticias-assets/noticia01.png";
      img.alt = item.Titulo || "";
      divImg.appendChild(img);

      const divManchete = document.createElement("div");
      divManchete.classList.add("manchete");
      const h2 = document.createElement("h2");
      h2.textContent = item.Titulo || "Título da notícia";
      const pTexto = document.createElement("p");
      pTexto.textContent = item.Texto || "Texto da notícia...";
      divManchete.append(h2, pTexto);

      divContainerNoticia.append(divImg, divManchete);

      const divContainer = document.createElement("div");
      divContainer.classList.add("container");

      const divSaibaMais = document.createElement("div");
      divSaibaMais.classList.add("saibaMais");

      const pData = document.createElement("p");
      pData.textContent = item.DataCompleta;

      const pLink = document.createElement("p");
      const a = document.createElement("a");
      a.href = item.Link;
      a.textContent = "Saiba mais";
      pLink.appendChild(a);

      divSaibaMais.append(pData, pLink);

      const hr = document.createElement("hr");

      divContainer.append(divSaibaMais, hr);

      divPrincipal.append(divContainerNoticia, divContainer);

      containerPrincipal.appendChild(divPrincipal);
    });
  } catch (err) {
    console.error("Erro ao buscar notícias:", err);
  }
}

async function getPosts() {
  try {
    const resultado = await fetch("https://bjd9aof9.api.sanity.io/v2025-10-21/data/query/production?query=*%0A++%5B_type+%3D%3D+%27Publicacoes%27%5D%0A%0A%7B%0A+%22FotosInstagram%22+%3A+FotosInstagram.asset-%3Eurl%0A%7D%0A%0A%0A%0A%0A%0A%0A%0A%0A&perspective=drafts", {
      method: "GET",
    });

    const dados = await resultado.json();
    console.log(dados.result);

    const raiz = document.querySelector(".social-section");

    const grid = document.createElement("div");
    grid.classList.add("grid-posts");

    dados.result.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.FotosInstagram;
      img.alt = "Publicação Instagram";
      grid.appendChild(img);
    });

    raiz.appendChild(grid);
  } catch (err) {
    console.error("Erro ao buscar as postagens:", err);
  }
}


async function init() {
  await Promise.all([getNoticias(), getPosts()]);
  loader.style.display = "none";
}

init();