const dominio = 'http://localhost:8080';

let config = {
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Content-type': 'application/json; charset=UTF-8',
    },
};
//Retira os 6 primeiros digitos do parâmetro da url e armazena em variável
let params = window.location.search.substring(6);
console.log('Id do Equipamento: ' + params);
//função está incompleta
function atualizaEquipamento() {
    let put_data = {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    fetch(dominio + '/posts/' + params, {
        method: 'PUT',
        body: JSON.stringify(put_data),
        config,
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}
//Função anônima que faz requisição GET para preencher formulário e mostrar dados do equipamento ao cliente
(() => {
    fetch(dominio + '/equipment/' + params, config)
        .then((response) => response.json())
        .then((data) => {
            //Faz a seleção dos campos os quais não devem ser apresentados ao usuário no momento da edição do material
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
            //hidden = true > esconde campos
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
