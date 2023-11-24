//const dominio = 'http://localhost:8080';//README
const dominio = 'https://gcmsystem.up.railway.app';
let config = {
    headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
}

var params = window.location.search.substring(4);
const carregarModal = async() => {

    const response = await fetch(dominio+'/equipment/'+params, config);
    const dados = await response.json();

    const modaltitle = document.getElementById('modal_t');
    const modalText = document.getElementsByClassName('modal__text');//Função que traz array de objetos
    console.log(modalText[0].textContent);

    modaltitle.innerText = dados.category;
    modalText[0].textContent = "Marca: " + dados.brand;
    modalText[1].textContent = "Número: "+ dados.number;

    //Se o equipamento está indisponivel entra no if muda modal
    if(!dados.available){
        const response = await fetch(dominio+'/loan/equipment_id/'+dados.id, config);
        const da = await response.json();
        console.log("Array de equipamentos Emprestados: ");console.log(da);
        var array = [];
        array = da;
        console.log(array.length -1);
        const input = document.getElementById('input');
        input.style.display = 'none'; //oculta input
        const btn = document.getElementsByTagName('button'); //Função que traz array de objetos
        btn[0].textContent = "Devolver Equipamento";
        const description = document.getElementsByClassName('modal__description');//Função que traz array de objetos
        description[0].textContent = "Este equipamento está em posse de "+da[da.length-1].name_gcm;
        console.log(description[0]);
    }
}
window.onload = () => {carregarModal();}