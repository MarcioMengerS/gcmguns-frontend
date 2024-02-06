const dominio = 'http://localhost:8080';//leia o README
///////////////Cabeçalho com token e tipo de conteúdo//////////////////////
let myHeaders = new Headers;
myHeaders.append("Content-Type","application/json");
myHeaders.append("Authorization","Bearer "+ sessionStorage.getItem('token'));

//Retira os 6 primeiros digitos do parâmetro da url e armazena em variável//
let params = window.location.search.substring(6);
console.log('Id do Equipamento: ' + params);

//////////função (PUT) que envia dados editados para o backend//////////////
const form = document.querySelector('form');
form.addEventListener('submit', updateEquipment);
                      
function updateEquipment(event) {
    event.preventDefault();
    const myFormData = new FormData(event.target);
    const categoria = document.getElementById('category');
    myFormData.append("id", params);
    myFormData.append("category", categoria.textContent);
    const formDataObj = Object.fromEntries(myFormData.entries());

    fetch(`${dominio}/equipment/${params}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(formDataObj)
    })
    .then((response) => {
        response.status==201 ? window.location.href = "/listaequipamentos.html": ""
    })
    .catch((error) => console.error(error));
};

//////Função anônima(GET). Preenche formulário e mostra dados ao cliente /////
(() => {
    fetch(dominio + '/equipment/' + params, {
        method: 'GET',
        headers: myHeaders
    })
    .then((response) => response.json())
    .then((data) => {
        //Seleciona os campos que devem ser apresentados ao cliente na edição do material
        let categ;
        const cat = data.category;
        const image = document.querySelector('img');
        if(cat =='COLETE'){
            categ = ['caliber', 'register', 'specie', 'operation', 'distance', 'jetSystem', 'agent'];
            image.src = "/images/bulletproof.png";
        }else if(cat =='ARMA_LETAL'){
            categ = ['manufaturing', 'expiration', 'gender', 'wear', 'levelOfProtection', 'size',
            'distance','jetSystem', 'agent'];
            image.src = "images/pistol.png";
        }else if(cat =='ALGEMA'||cat =='ARMA_MENOS_LETAL'||cat =='RADIO_COMUNICADOR'||cat =='LANTERNA'){
                categ = ['caliber', 'register', 'specie', 'operation', 'distance', 'jetSystem', 
                    'agent', 'manufaturing', 'expiration', 'gender', 'wear', 'levelOfProtection', 'size'];
                //Icones extraídos de: https://www.flaticon.com/
                switch (cat) {
                    case 'ALGEMA':
                        image.src = "images/handcuffs.png";
                        break;
                    case 'ARMA_MENOS_LETAL':
                        image.src = "/images/stun-gun.png";
                        break;
                    case 'RADIO_COMUNICADOR':
                        image.src = "images/walkie-talkie.png";
                        break;
                    case 'LANTERNA':
                        image.src = "images/flashlight.png";
                        break;
                }
        }
        //////////////// hidden = true > esconde campos ////////////////////////
        categ.forEach((element) => document.getElementById(`campo-${element}`).hidden = true);
        const categoria = document.getElementById('category');
        categoria.innerHTML = data.category;
        //FOR para preencher o formulário apresentado ao usuário sem dados de id, categoria e disponibilidade//
        delete data.id;
        delete data.category;
        delete data.available;
        for (var item in data){
            const tagHtml = document.getElementById(item);
            tagHtml.value = data[item];
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
    })
    .catch((error) => console.error(error));
})();