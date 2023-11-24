//const dominio = 'http://localhost:8080';//README
const dominio = 'https://gcmsystem.up.railway.app';
let config = {
    headers: {'Authorization':'Bearer '+sessionStorage.getItem('token')}
}
//função que pega o id que está na url informada pela página listagcms.js e mostra na tela
var params = window.location.search.substring(1);
console.log("Id do GCM: "+params)

//iniciado automaticamente no final do arquivo. chamado por listagcms.js
async function carregarGCM() {
    if(params!=""){
        const response = await fetch(dominio+'/gcm/'+params, config);
        const objeto = await response.json();
        console.log(objeto);
const nome = document.getElementById('nome');
        const numero = document.getElementById('numero');
        const cpf = document.getElementById('cpf');
        const dataAds = document.getElementById('data-ads');
        const dataNas = document.getElementById('data-nas');
        const email = document.getElementById('email');
        // const tag = document.getElementById('tag');
        const idade = document.getElementById('age');
        const contribuicao = document.getElementById('contribution');
        // const transPass = document.getElementById('pass');

        nome.value = objeto.nome;
        numero.value = objeto.numero;
        cpf.value = objeto.cpf;
        dataAds.value = objeto.dataAdmis;
        dataNas.value = objeto.dataNas;
        email.value = objeto.email;
        // tag.value = objeto.tag;
        idade.value = calculaTempo(objeto.dataNas);
        contribuicao.value = calculaTempo(objeto.dataAdmis);
        // transPass.value = objeto.transactionPass;    
    }
}
//desbloqueia campos do formulário
function desbloquearDados(){
    document.getElementById('nome').removeAttribute('readonly');
    document.getElementById('numero').removeAttribute('readonly');
    document.getElementById('cpf').removeAttribute('readonly');
    document.getElementById('email').removeAttribute('readonly');
    document.getElementById('data-nas').removeAttribute('readonly');
    document.getElementById('data-ads').removeAttribute('readonly');
    document.getElementById('pass').removeAttribute('readonly');
}
//transforma todo nome do GCM em maiúscula
function nomeTodasMaiusculas(){
    let nomeObj = document.getElementById("nome");
    nomeObj.value = nomeObj.value.toUpperCase();
}
//Validações campos cadastros GCM
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
function setError(index){
    campos[index].style.border = '3px solid #e63636';
    spans[index].style.display = 'block';
    return false;
}
function removeError(index){
    campos[index].style.border = '';
    spans[index].style.display = 'none';
    return true;
}
function nameValid(){
    if(campos[0].value.length > 50 || campos[0].value.length < 12) return setError(0);
    else return removeError(0);
}
function numberValid(){
    if(campos[1].value < 1) return setError(1);
    else return removeError(1);
}
function cpfValid() {
    if (campos[2].value == "00000000000") {return setError(2);}
    if (campos[2].value.length != 11) {return setError(2);}
    var soma = 0;
    var resto;

    for (i = 1; i <= 9; i++) {
        soma = soma + (parseInt(campos[2].value.substring(i - 1, i)) * (11 - i));
    }

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)){resto = 0;}
    if (resto != parseInt(campos[2].value.substring(9, 10))){return setError(2);}

    soma = 0;
    for (i = 1; i <= 10; i++) {
        soma = soma + (parseInt(campos[2].value.substring(i - 1, i)) * (12 - i));
    }

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)){resto = 0;}
    if (resto != parseInt(campos[2].value.substring(10, 11))){return setError(2);}
    return removeError(2);
}
function emailValid(){
    if(emailRegex.test(campos[3].value)) return removeError(3);
    else return setError(3);
}

async function salvarDados(){
    //validações de campos
    if(!nameValid()) return alert("NOME incorreto. Revise-o!");
    if(!numberValid()) return alert("NÚMERO incorreto. Revise-o!");
    if(!cpfValid()) return alert("CPF incorreto. Revise-o!");
    if(!emailValid()) return alert("E-MAIL incorreto. Revise-o!");

    const nomeObj = document.getElementById("nome");
    const numeroObj = document.getElementById("numero");
    const cpfObj = document.getElementById("cpf");
    const dataNascObj = document.getElementById("data-nas");
    const dataAdmisObj = document.getElementById("data-ads");
    const emailObj = document.getElementById("email");
    const tagObj = document.getElementById('tag');
    const passObj = document.getElementById('pass');

    const gcm = {
        numero: Number(numeroObj.value),
        nome: nomeObj.value,
        cpf: cpfObj.value,
        dataNas: dataNascObj.value,
        dataAdmis: dataAdmisObj.value,
        email: emailObj.value,
        tag: tagObj.value,
        transactionPassword: passObj.value
    }
    let myHeaders = new Headers;
    myHeaders.append("Content-Type","application/json");
    myHeaders.append("Authorization","Bearer "+ sessionStorage.getItem('token'));
    if(params!=""){
        const init ={
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(gcm)
        }
        await fetch(dominio+'/gcm/'+params, init);
    }else{
        const init ={
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(gcm)
        }
        try{
            const response = await fetch(dominio+'/gcm', init)
            if(!response.ok) throw (`Error: Response status ${response.status}`);
        }catch(e) {console.log(e)}
    }
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
    const response = await fetch(dominio+'/loan/gcm_id/'+params, config)
    const dados = await response.json();
    console.log(dados);
    dados.forEach(item => {
        const newContainer = document.getElementById('new-container');
        const course = document.createElement('div');
        const coursePreview = document.createElement('div');
        const h6 = document.createElement('h6');
        const courseInfo = document.createElement('div');
        const h6_retira = document.createElement('div');
        const h6_devolve = document.createElement('div');
        const btn = document.createElement('a');

        course.setAttribute('class', 'course');
        coursePreview.setAttribute('class', 'course-preview');
        h6.setAttribute('class', 'name-princ');
        courseInfo.setAttribute('class', 'course-info');
        btn.setAttribute('class', 'btn-detalhes');

        btn.href = `/mostraequipamento.html?id=${item.id_equipment}#modal-opened`;
        btn.innerHTML = "Detalhes";
        //formando data e hora de emprestimo
        let dataHoraRemoval = new Date(item.removal);
        let dataRemoval = ((dataHoraRemoval.getDate() )) + "/" + ((dataHoraRemoval.getMonth() + 1)) + "/" + dataHoraRemoval.getFullYear();
        let horaRemoval = dataHoraRemoval.getHours()+":"+dataHoraRemoval.getMinutes();
        h6_retira.innerText = "Retirado no dia: "+dataRemoval+" às "+horaRemoval;
        //formando data e hora de devolução
        let dataHoraDevolution = new Date(item.devolution);
        let dataDevolve;
        let horaDevolve;
        if(item.devolution==null){
            dataDevolve = "";
            horaDevolve = "";
        }else{

        dataDevolve = ((dataHoraDevolution.getDate() )) + "/" + ((dataHoraDevolution.getMonth() + 1)) + "/" + dataHoraDevolution.getFullYear();
        horaDevolve = dataHoraDevolution.getHours()+":"+dataHoraDevolution.getMinutes();
        }
        console.log(dataDevolve);
        console.log(horaDevolve);
  
        h6_devolve.innerText = "Devolveu no dia: "+dataDevolve+" - "+horaDevolve;
        h6.innerText = item.equipment_category;

        courseInfo.appendChild(h6_retira);
        courseInfo.appendChild(h6_devolve);
        courseInfo.appendChild(btn);
        coursePreview.appendChild(h6);
        course.appendChild(coursePreview);
        course.appendChild(courseInfo);
        newContainer.appendChild(course);
    });
}
//utilizado módulo readCard.js javascript dinâmico para esta função
async function btnLeCartao(){
  const modulo = await import("../modules/readCard.js");
  document.querySelector('input[name="tagResult"]').value = await modulo.connect2();
}
window.onload = () => {carregarGCM();}