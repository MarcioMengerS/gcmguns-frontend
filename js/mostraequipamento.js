var params = window.location.search.substring(4);
const carregarModal = async() =>{
    // console.log(params);
    // var teste = document.getElementById('id_equip');
    // teste.innerHTML = params;
    // teste = params.slice(-1);
    // console.log(teste);
    const response = await fetch('http://localhost:8080/equipment/'+params);
    const dados = await response.json();
    const modaltitle = document.getElementById('modal_t');
    const modalText = document.getElementsByClassName('modal__text');
    console.log(modalText[0].textContent);

    modaltitle.innerText = dados.category;
    modalText[0].textContent = "Marca: " + dados.brand;
    modalText[1].textContent = "Número: "+ dados.number;
}

window.onload = () => {carregarModal();}

function atribuirGcm(){
    const inputGcm = document.getElementById('input');
    const init ={
        method: 'POST',
        headers:{
            "Content-Type":'application/json'
        },
    }
    fetch(`http://localhost:8080/loan/${inputGcm.value}/${params}`, init);
    window.location.href = "/listaequipamentos.html";
}