

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
