const dominio = 'http://localhost:8080';//README
//const dominio = 'https://gcmsystem.up.railway.app';

async function cadastroEquipamento(){
  const agente = document.getElementById("agent");
  const patrimonio = document.getElementById("assetNumber");
  const marca = document.getElementById("brand");
  const calibre = document.getElementById("caliber");
  const categoria = document.getElementById("category");
  const distancia = document.getElementById("distance");
  const validade = document.getElementById("expirationDate");
  const genero = document.getElementById("gender");
  const informacao = document.getElementById("info");
  const jato = document.getElementById("jetSystem");
  const protecao = document.getElementById("levelOfProtection");
  const fabricacao = document.getElementById("manufacturingDate");
  const modelo = document.getElementById("model");
  const numero = document.getElementById("number");
  const canos = document.getElementById("numberOfPipes");
  const funcionamento = document.getElementById("operation");
  const registro = document.getElementById("register");
  const tamanho = document.getElementById("size");
  const alma = document.getElementById("soulInformation");
  const especie = document.getElementById("especie");
  const uso = document.getElementById("wear");

  const equipment = {
    agent: agente.value,
    assetNumber: Number(patrimonio.value),
    brand: marca.value,
    caliber: calibre.value,
    category: categoria.value,
    distance: distancia.value,
    expirationDate: validade.value,
    gender: genero.value,
    info: informacao.value,
    jetSystem: jato.value,
    levelOfProtection: protecao.value,
    manufacturingDate: fabricacao.value,
    model: modelo.value,
    number: numero.value,
    numberOfPipes: canos.value,
    operation: funcionamento.value,
    register: Number(registro.value),
    size: tamanho.value,
    soulInformation: alma.value,
    specie: especie.value,
    wear: uso.value
  }

  let myHeaders = new Headers;
  myHeaders.append("Content-Type","application/json");
  myHeaders.append("Authorization","Bearer "+ sessionStorage.getItem('token'));
  const init ={
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(equipment)
  }

  await fetch(dominio+'/equipment', init);
  //Link serve para voltar a página de Listar EQUIPAMENTO
  window.location.href = "/listaequipamentos.html";
}