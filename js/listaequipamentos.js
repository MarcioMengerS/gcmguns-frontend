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

function listaBastoes(){
    const postsContainer = document.querySelector("#posts-container-equip");
    postsContainer.innerHTML = ""; //Serve para apagar a página
}

function listaAlgemas(){
    const url = "http://localhost:8080/equipment/category/ALGEMA";

    const postsContainer = document.querySelector("#posts-container-equip");
    postsContainer.innerHTML =""; //Serve para apagar a página

    async function getAllHundcuffs(){
        const response = await fetch(url);
        const data = await response.json();
        data.map((post) => {
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

            const a_btn = document.createElement("a");
            a_btn.setAttribute("class", "btn btn-primary");
            a_btn.setAttribute("href", `/mostraequipamento.html?id=${post.id}#modal-opened`);

            h5_title.innerHTML = "Marca "+ post.brand;
            p_text.innerText = "número "+post.number;
            a_btn.innerText = "Detalhes";

            div_body.appendChild(h5_title);
            div_body.appendChild(p_text);
            div_body.appendChild(a_btn);
            div_w75.appendChild(div_body);

            postsContainer.appendChild(div_w75);
        });
    }
    getAllHundcuffs();
}

function listaColetes(){
    //Location.reload();
    const url = "http://localhost:8080/equipment/category/COLETE";

    const postsContainer = document.querySelector("#posts-container-equip");
    postsContainer.innerHTML = ""; //Serve para limpar conteúdo da página

    async function getAllColetes(){
        const response = await fetch(url);
        const data = await response.json();
        data.map((post) => {

            const div_w75 = document.createElement("div");
            div_w75.setAttribute("class", "card w-75 mb-3"); //estilizar com bootstrap
            console.log(post);

            const div_body = document.createElement("div");
            div_body.setAttribute("class", "card-body");
            //Muda cor do box quando  equipamento estiver indisponível
            if(!post.available){
                div_body.style.backgroundColor = "#fddb3a";//cor amarela
            }

            const h5_title = document.createElement("h5");
            h5_title.setAttribute("class", "card-title");

            const p_text = document.createElement("p");
            p_text.setAttribute("class", "card-text");

            const a_btn = document.createElement("a");
            a_btn.setAttribute("class", "btn btn-primary");
            a_btn.setAttribute("href", `/mostraequipamento.html?id=${post.id}#modal-opened`);
            
            h5_title.innerHTML = "Marca " + post.brand;
            p_text.innerText = "número: " + post.number;
            a_btn.innerText = "Detalhes"; //título apresentado no botão

            console.log(post.available);

            div_body.appendChild(h5_title);
            div_body.appendChild(p_text);
            div_body.appendChild(a_btn);
            div_w75.appendChild(div_body);

            postsContainer.appendChild(div_w75);
        });
    }
    getAllColetes();
}

function listaArmas(){
    const postsContainer = document.querySelector("#posts-container-equip");
    postsContainer.innerHTML = ""; //Limpa a página
}

function listaEspargidores(){
    const postsContainer = document.querySelector("#posts-container-equip");
    postsContainer.innerHTML = ""; //Serve para apagar a página
}

function listaMunicoes(){
    const postsContainer = document.querySelector("#posts-container-equip");
    postsContainer.innerHTML = ""; //Serve para apagar a página
}

