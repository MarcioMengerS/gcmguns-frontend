//função que pega o id que está na url informada pela página listagcms.html e mostrana tela
function carregarPagina(){
    var params = window.location.search.substring(1);
    console.log(params);
    var teste = document.getElementById('id_gcm');
    teste.innerHTML = params;
}

window.onload = () => {carregarPagina();}