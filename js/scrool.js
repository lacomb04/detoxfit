document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o comportamento padrão de navegação

    const targetId = this.getAttribute("href"); // Obtém o destino do link
    const targetElement = document.querySelector(targetId); // Seleciona o elemento de destino

    // Verifica se o elemento existe antes de tentar rolar
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth", // Aplica a rolagem suave
        block: "start", // Alinha ao topo da seção
      });
    } else {
      console.log("Elemento não encontrado:", targetId);
    }
  });
});
