//const dominio = 'http://localhost:8080';
const dominio = 'https://gcmsystem.up.railway.app';//README
let config = {
    headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
}
// o mesmo que arrow function
// function carregarListaGCM(){}
//Função que trás do backend a lista de GCMs e apresenta no index.html
const carregarListaGCM = async() => {
    const response = await fetch(dominio+'/gcm', config);
    const dados = await response.json();
    
    dados.forEach(item => {

        const container = document.getElementById('container_mm');
        container.setAttribute('class', 'container');
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const box = document.createElement('div');
        box.setAttribute('class', 'box');
        const content = document.createElement('div');
        content.setAttribute('class', 'content');
        const h2 = document.createElement('h2');
        h2.innerText = item.numero;
        const h3 =document.createElement('h3');
        var firstName = item.nome.split(" ");
        h3.innerText = firstName[0];
        const a = document.createElement('a');
        a.href ="/mostragcm.html?"+ item.id;//envia referencia para o botão detalhes
        a.innerHTML = "Detalhes";
   
        content.appendChild(h2);
        content.appendChild(h3);
        content.appendChild(a);
        box.appendChild(content);
        card.appendChild(box);
        container.appendChild(card);

    });
}
//Os eventos acontecem somente depois da página ter sido carregada
window.onload = () => {carregarListaGCM();}