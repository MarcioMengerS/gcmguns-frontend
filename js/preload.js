// Apresenta semi-círculos girando enquanto a página carrega
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector("body").classList.add("loaded");
    }, 2000)
});