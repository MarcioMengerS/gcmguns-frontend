//função que pega o id que está na url informada pela página listagcms.html e mostrana tela
var params = window.location.search.substring(1);
var numGcm = document.getElementById('id_gcm');
numGcm.innerHTML = params;
numGcm = params.slice(-1);
async function carregarGCM() {

    const response = await fetch('http://localhost:8080/gcm/'+numGcm);
    const objeto = await response.json();
    const nome = document.getElementById('nome');
    const numero = document.getElementById('numero');
    const cpf = document.getElementById('cpf');
    const dataAds = document.getElementById('data-ads');
    const dataNas = document.getElementById('data-nas');
    const email = document.getElementById('email');
    const tag = document.getElementById('tag');
    const idade = document.getElementById('age');
    const contribuicao = document.getElementById('contribution');

    nome.value = objeto.nome;
    numero.value = objeto.numero;
    cpf.value = objeto.cpf;
    dataAds.value = objeto.dataAdmis;
    dataNas.value = objeto.dataNas;
    email.value = objeto.email;
    tag.value = objeto.tag;
    idade.value = calculaTempo(objeto.dataNas);
    contribuicao.value = calculaTempo(objeto.dataAdmis)
}

function desbloquearDados(){
    document.getElementById('nome').removeAttribute('readonly');
    document.getElementById('numero').removeAttribute('readonly');
    document.getElementById('cpf').removeAttribute('readonly');
    document.getElementById('email').removeAttribute('readonly');
    document.getElementById('data-nas').removeAttribute('readonly');
    document.getElementById('data-ads').removeAttribute('readonly');
}

async function salvarDados(){
    const numeroObj = document.getElementById("numero");
    const nomeObj = document.getElementById("nome");
    const cpfObj = document.getElementById("cpf");
    const dataNascObj = document.getElementById("data-nas");
    const dataAdmisObj = document.getElementById("data-ads");
    const emailObj = document.getElementById("email");
    const tagObj = document.getElementById('tag');

    const gcm = {
        numero: Number(numeroObj.value),
        nome: nomeObj.value,
        cpf: cpfObj.value,
        dataNas: dataNascObj.value,
        dataAdmis: dataAdmisObj.value,
        email: emailObj.value,
        tag: tagObj.value
    }
    
    const init ={
        method: 'PUT',
        headers:{"Content-Type":'application/json'},
        body: JSON.stringify(gcm)
    }
    await fetch('http://localhost:8080/gcm/'+numGcm, init);
    //Voltar para página Lista GCM
    window.location.href = "/listagcms.html";
}

function calculaTempo(data){
    tempo = Math.floor((Date.now() - new Date(data)) / (31557600000));
    if(tempo <= 1){
        return tempo+" ano";
    }else{
        return tempo+" anos";
    }
}
async function getEquipamentos(){
    const clean = document.querySelector("#new-container");
    clean.innerHTML="";  //limpa guia equipamentos
    const response = await fetch('http://localhost:8080/loan/gcm_id/'+numGcm)
    const dados = await response.json();
    dados.forEach(item => {
        const newContainer = document.getElementById('new-container');
        const course = document.createElement('div');
        const coursePreview = document.createElement('div');
        const h6 = document.createElement('h6');
        const courseInfo = document.createElement('div');
        const h6_2 = document.createElement('div');
        const btn = document.createElement('a');

        course.setAttribute('class', 'course');
        coursePreview.setAttribute('class', 'course-preview');
        h6.setAttribute('class', 'name-princ');
        courseInfo.setAttribute('class', 'course-info');
        btn.setAttribute('class', 'btn-detalhes');

        btn.href = `/mostraequipamento.html?id=${item.id}#modal-opened`;
        btn.innerHTML = "Detalhes";
        //formando data e hora
        let dataHora = new Date(item.removal);
        let data = ((dataHora.getDate() )) + "/" + ((dataHora.getMonth() + 1)) + "/" + dataHora.getFullYear();
        let hora = dataHora.getHours()+":"+dataHora.getMinutes();
        console.log(data);
        console.log(hora);
        h6_2.innerText = "Retirado no dia: "+data+" às "+hora;
        h6.innerText = item.equipment_category;

        courseInfo.appendChild(h6_2);
        courseInfo.appendChild(btn);
        coursePreview.appendChild(h6);
        course.appendChild(coursePreview);
        course.appendChild(courseInfo);
        newContainer.appendChild(course);
    });
}
window.onload = () => {carregarGCM();}