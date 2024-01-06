const dominio = 'http://localhost:8080';//README
//const dominio = 'https://gcmsystem.up.railway.app';
let config = { 
    headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
}
//Transições do menu lateral da página
window.onload = () => {
    let list = document.querySelectorAll('.list-item');
    for(let i=0; i<list.length; i++){
        list[i].onclick = function(){
            let j = 0;
            while(j < list.length){
                list[j++].className = 'list-item';
            }
            list[i].className = 'list-item active';
        }
    }

    //let toggleBtn = document.querySelector('.toggle');
    let sidebar = document.querySelector('.sidebar');
    //toggleBtn.onclick = function(){
        //toggleBtn.classList.toggle('active');
        sidebar.classList.toggle('active');
        
    //}
}
//método default que busca os equipamentos de cada categoria
async function getAllEquip(endpoint){
    const caminho = endpoint
    const url = dominio+`/equipment/category/${caminho}`;

    const postsContainer = document.querySelector("#posts-container-equip");
    postsContainer.innerHTML = "";//limpa conteúdo da página

    const response = await fetch(url, config);
    const data = await response.json();
    data.map((post) => {
        console.log(post);
        //tamanho do card
        const div_w75 = document.createElement("div");
        div_w75.setAttribute("class", "card w-75 mb-3");
        //Corpo do texto
        const div_body = document.createElement("div");
        div_body.setAttribute("class", "card-body");
        //Muda cor do box quando  equipamento estiver indisponível
        if(!post.available){
            div_body.style.backgroundColor = "#fddb3a"; //cor amarela
        }
        //título do card
        const h5_title = document.createElement("h5");
        h5_title.setAttribute("class", "card-title");

        const p_text = document.createElement("p");
        p_text.setAttribute("class", "card-text");

        const details_btn = document.createElement("a");
        details_btn.setAttribute("class", "btn btn-primary");
        details_btn.setAttribute("href", `/mostraequipamento.html?id=${post.id}#modal-opened`);
        details_btn.setAttribute("role", "button");
        details_btn.innerText = "Detalhes";

        const edit_btn = document.createElement("a");
        edit_btn.setAttribute("class", "btn btn-success");
        edit_btn.setAttribute("href", `/modificaequipamento.html`);
        edit_btn.setAttribute("role", "button");
        edit_btn.innerText = "Editar";

        h5_title.innerHTML = "Marca "+ post.brand;
        p_text.innerText = "Número: "+post.number+" Modelo: "+post.model;

        div_body.appendChild(h5_title);
        div_body.appendChild(p_text);
        div_body.appendChild(details_btn);
        div_body.appendChild(edit_btn);
        div_w75.appendChild(div_body);

        postsContainer.appendChild(div_w75);
    });
}

function listaColetes(){
    getAllEquip("COLETE");
}

function listaAlgemas(){
    getAllEquip("ALGEMA");
}

function listaArmas(){
    getAllEquip("ARMA_LETAL");
}

function listaNaoLetais(){
    getAllEquip("ARMA_MENOS_LETAL");
}

function listaEspargidores(){
    getAllEquip("ESPARGIDOR");
}

function listaMunicoes(){
    getAllEquip("MUNICAO");
}

function listaLancadores(){
    getAllEquip("LANCADOR");
}

function listaRadios(){
    getAllEquip("RADIO_COMUNICADOR");
}

function listaBastoes(){
    getAllEquip("BASTAO");
}

function listaLanternas(){
    getAllEquip("LANTERNA");
}
