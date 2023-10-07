/*
* Sites pesquisados sobre Web Serial API:
* https://whatwebcando.today/serial.html
* https://wicg.github.io/serial/
*
* Especificações da placa embarcada ESP32:
* productId: 29987 => 0x7523
* usbVendorId: 6790 => 0x1A86
*
* Diagrama esquemático da ligação do ESP32 com módulo RFid
* https://curtocircuito.com.br/blog/Categoria%20IoT/controle-de-acesso-pelo-telegram-com-esp32
*
* Pinagem ESP32
* https://www.aranacorp.com/pt/utilizar-um-modulo-rfid-com-um-esp32/
*
*/
//quando mostrar mensagem de erro no console trocar de porta e fechar IDE Arduino
// Abre a porta serial e inicia a leitura do cartão
async function connect() {
  var hex="";
  const port = await navigator.serial.requestPort({ filters: [{usbVendorId: 0x1A86}] });
  console.log(port.getInfo());
  await port.open({ baudRate: 9600, bufferSize: 1});
  const reader = port.readable.getReader();
  const { usbProductId, usbVendorId } = port.getInfo();
  console.log("USBProductID: "+usbProductId);
  console.log("USBVendorId: "+usbVendorId);
  await new Promise(resolve => setTimeout(resolve, 2000));
  while (true) {
      const { value, done } = await reader.read();
    if(value){
        // console.log("value: "+value);
        // log.textContent += value + '\n';
    }
    if (done) {
      console.log('Conexão fechada!');
      break;
    }
    const decoder = new TextDecoder();
    const data = decoder.decode(value);   
    hex += data;
    if(hex.length==8){
      console.log(hex);
      document.querySelector('input[name="tagResult"]').value = hex;
      break;
    }
  }
  reader.cancel();
  closed;
  reader.releaseLock();
  await port.forget(); 
  console.log("numero Binário: "+hex);
}
//API de Cadastro de GCM
async function btnCadastro(){
  const numeroElement = document.getElementById("num");
  const nomeElement = document.getElementById("nome");
  const cpfElement = document.getElementById("cpf");
  const dataNascElement = document.getElementById("dataNasc");
  const dataAdmisElement = document.getElementById("dataAd");
  const emailElement = document.getElementById("email");
  const tagElement = document.getElementById('tag');

  const gcm = {
    numero: Number(numeroElement.value),
    nome: nomeElement.value,
    cpf: cpfElement.value,
    dataNas: dataNascElement.value,
    dataAdmis: dataAdmisElement.value,
    email: emailElement.value,
    tag: tagElement.value,
    transactionPassword: null
  }
  let myHeaders = new Headers;
  myHeaders.append("Content-Type","application/json");
  myHeaders.append("Authorization","Bearer "+ sessionStorage.getItem('token'));
  const init ={
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(gcm)
  }

  let response = await fetch('http://localhost:8080/gcm', init);
  const dados = await response.json();
  console.log(JSON.stringify(gcm));
  //Link serve para voltar a página Lista GCM
  window.location.href = "/listagcms.html";
}