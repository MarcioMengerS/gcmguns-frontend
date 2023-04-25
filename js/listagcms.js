// o mesmo que arrow function
// function carregarListaGCM(){
// }
//Arrow function
//Função que retorna do backend a lista de GCMs e apresenta no index.html
const carregarListaGCM = async() =>{
    const response = await fetch('http://localhost:8080/gcm');
    const dados = await response.json();

    dados.forEach(item => {
        const constainerGcms  = document.getElementById('container-gcms');

        const template = document.getElementById('gcm-template');

        const gcmElement = document.importNode(template.content, true);

        const item_ancora = gcmElement.querySelectorAll('a');

        const itens_gcm = gcmElement.querySelectorAll('span');
        itens_gcm[0].innerText = item.nome;
        itens_gcm[1].innerText = item.numero;
        itens_gcm[2].innerText = item.cpf;
        itens_gcm[3].innerText = item.dataAdmis;
        //foi criado essa variavel para introduzir o id dos
        //objetos GCM a página mostragcm.html pelo id
        item_ancora[0].href = "/mostragcm.html?id="+ item.id;

        constainerGcms.append(gcmElement);
    });
}
//Os eventos acontecem somente depois da página ter sido carregada
window.onload = () => {carregarListaGCM();}