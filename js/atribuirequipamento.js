//Resposta ChatGPT: exemplo de comunicação serial com a linguagem de programação javascript?
//Solicita permissão para acessar a porta serial
var params = window.location.search.substring(4);
console.log("ID_EQUIPAMENTO: "+params);
async function requestPort() {
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
      return ports[0];
    }
    const options = {
    //   baudRate: 9600,
      dataBits: 8, //ou 7,
      parity: odd, //odd, even, none
      bufferSize: 2, //menor que 16
      flowControl: none, //ou hardware, none,
      stopBits: 2 //ou 1
    };
    
    const port = await navigator.serial.requestPort(options);
    return port;
  }
  
  // Abre a porta serial e inicia a leitura do cartão
async function identificarGCM() {
  const inputGcm = document.getElementById('input');
  const port = await requestPort();
  await port.open({ baudRate: 9600, dataBits:8, bufferSize:8, stopBits:2});
  
  // Turn off Request To Send (RTS) signal.
  await port.setSignals({ requestToSend: false });
  const reader = port.readable.getReader();
  const { usbProductId, usbVendorId } = port.getInfo();
  console.log(usbProductId);
  console.log(usbVendorId);
  const signals = await port.getSignals();
  while (port.readable) {
      const readableS = port.readable;
      console.log(readableS.locked=true);
      const { value, done } = await reader.read();
      if (done) {
          console.log('Conexão fechada!');
          break;
      }

    const decoder = new TextDecoder();
    const data = decoder.decode(value);

    signals.clearToSend = true;
    //   signals.dataSetReady = true;
    //   signals.dataCarrierDetect = true;
    signals.ringIndicator = true;

    console.log(`Clear To Send:       ${signals.clearToSend}`);
    console.log(`Data Carrier Detect: ${signals.dataCarrierDetect}`);
    console.log(`Data Set Ready:      ${signals.dataSetReady}`);
    console.log(`Ring Indicator:      ${signals.ringIndicator}`);
    //Se capturou os 8 caracteres do cartão entar no IF
    if(data.length == 8){
      console.log('8 caracteres recebidos: ' + data);
      //devolução de equipamento
      if(inputGcm.value ==""){
        console.log("input vazio. Ativada função para devolver equipamento. busca gcm");
        const res = await fetch('http://localhost:8080/loan/equipment_id/'+params);
        var resLoan = await res.json();

        const response = await fetch('http://localhost:8080/gcm/'+resLoan[resLoan.length-1].id_gcm);
        var responseGcm = await response.json();

        inputGcm.value = responseGcm.numero;
        console.log(inputGcm.value);
        //Faz a validação do crachá comparando a numeração da TAG do banco com a inserida com retorno booleano
        const boolean = await fetch(`http://localhost:8080/gcm/search-tag/${inputGcm.value}/${data}`);
        const dados = await boolean.json();
        const rtn = document.getElementById('return');
        rtn.setAttribute("class", "modal__btn");
        //confirmando tag e envia dados de devolução
        if(dados){//muda atributo available para True (equipamento devolvido)
          const init ={
            method:'PUT',
              // method: 'POST',
            headers:{"Content-Type":'application/json'}
          }
          await fetch(`http://localhost:8080/loan/devolve/${resLoan[resLoan.length-1].id}/${params}`, init);
          // await fetch(`http://localhost:8080/loan/${inputGcm.value}/${params}/${true}`, init);
          rtn.innerText = "Equipamento devolvido pelo GCM "+inputGcm.value;
          rtn.setAttribute("href", "/listaequipamentos.html");
          console.log("GCM:");console.log(responseGcm);
          console.log("Emprestimo: ");console.log(resLoan);
        }else{
          rtn.innerText = "crachá NÂO confere!";
          rtn.setAttribute("href", "/listaequipamentos.html");
        }
      }else{//emprestimo de equipamento
        //Faz a validação do crachá comparando a numeração da TAG do banco com a inserida com retorno booleano
        console.log("Dados no INPUT. Emprestando equipamento");
        const boolean = await fetch(`http://localhost:8080/gcm/search-tag/${inputGcm.value}/${data}`);
        const dados = await boolean.json();
        const rtn = document.getElementById('return');
        rtn.setAttribute("class", "modal__btn");
        //confirmando tag e envia dados de empréstimo
        if(dados){//muda atributo available para False (equipamento devolvido)
          const init ={
              method: 'POST',
              headers:{"Content-Type":'application/json'}
          }
          await fetch(`http://localhost:8080/loan/${inputGcm.value}/${params}`, init);
          rtn.innerText = "Emprestado equipamento ao GCM "+inputGcm.value;
          rtn.setAttribute("href", "/listaequipamentos.html");
          console.log("GCM:");console.log(responseGcm);
          console.log("Emprestimo: ");console.log(resLoan);
        }else{
          rtn.innerText = "crachá NÂO confere!";
          rtn.setAttribute("href", "/listaequipamentos.html");
        }
      }
    }else{// reader.cancel();
      console.log("passe o crachá novamente");
      console.log(data);
    }
  // await port.close();
  }
}