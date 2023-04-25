//Resposta ChatGPT: exemplo de comunicação serial com a linguagem de programação javascript?
//Solicita permissão para acessar a porta serial
async function requestPort() {
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
      return ports[0];
    }
    const options = {
      baudRate: 9600,
      dataBits: 8,
      bufferSize: 128,
      //flowControl: hardware,
      stopBits: 2
    };
    const port = await navigator.serial.requestPort(options);
    return port;
}
  
// Abre a porta serial e inicia a leitura do cartão
async function connect() {
    const port = await requestPort();
    await port.open({ baudRate: 9600});
    const reader = port.readable.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log('Conexão fechada!');
        break;
      }
      const decoder = new TextDecoder();
      const data = decoder.decode(value);
      if(data.length == 8){
        console.log('Dados recebidos: ' + data);
        //document.getElementById("tagResult").innerHTML = data;
        document.querySelector('input[name="tagResult"]').value = data;
      }
      else{
        console.log("passe o cartão novamente");
      }
    }
    //await port.close();
}


//API de Cadastro de GCM
async function btnCadastro(){
  const numeroElement = document.getElementById("num");
  const nomeElement = document.getElementById("nome");
  const cpfElement = document.getElementById("cpf");
  const dataNascElement = document.getElementById("dataNasc");
  const dataAdmisElement = document.getElementById("dataAd");
  const emailElement = document.getElementById("email");
  const tagElement = document.getElementById('tag')

  const gcm = {
    numero: Number(numeroElement.value),
    nome: nomeElement.value,
    cpf: cpfElement.value,
    dataNas: dataNascElement.value,
    dataAdmis: dataAdmisElement.value,
    email: emailElement.value,
    tag: tagElement.value
  }
  const init ={
    method: 'POST',
    headers:{
      "Content-Type":'application/json'
    },
    body: JSON.stringify(gcm)
  }
  const response = await fetch('http://localhost:8080/gcm', init);
  const dados = await response.json();
  console.log(JSON.stringify(gcm));
  //Link serve para voltar a página Lista GCM
  window.location.href = "/listagcms.html";
}