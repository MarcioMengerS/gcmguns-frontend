let itens = document.getElementById("itens").children;
// Esconder todos os itens inicialmente
for (let i = 0; i < itens.length; i++) {
    itens[i].style.display = "none";
}
function exibirItens() {
    let categoria = document.getElementById("category");
    let categoriaSelecionada = categoria.options[categoria.selectedIndex].value;

    // Esconder todos os itens
    for (let i = 0; i < itens.length; i++) {
        itens[i].style.display = "none";
    }
    // Exibir itens da categoria selecionada
    let itensDaCategoria = document.getElementsByClassName(categoriaSelecionada);
    for (let i = 0; i < itensDaCategoria.length; i++) {
        itensDaCategoria[i].style.display = "block";
    }
}