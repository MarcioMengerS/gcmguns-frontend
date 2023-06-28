//Resposta ChatGPT: exemplo de comunicação serial com a linguagem de programação javascript?
//Solicita permissão para acessar a porta serial
var params = window.location.search.substring(4);

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
        if(data.length == 8){
            console.log('Dados recebidos: ' + data);
            //document.getElementById("tagResult").innerHTML = data;
            // document.querySelector('input[name="tagResult"]').value = data;
            const inputGcm = document.getElementById('input');
            const boolean = await fetch(`http://localhost:8080/gcm/search-tag/${inputGcm.value}/${data}`);
            const dados = await boolean.json();
            const rtn = document.getElementById('return');
            rtn.setAttribute("class", "modal__btn");
            if(dados){
                const init ={
                    method: 'POST',
                    headers:{
                      "Content-Type":'application/json'
                    }
                  }
                await fetch(`http://localhost:8080/loan/${inputGcm.value}/${params}`, init);
                rtn.innerText = "Equipamento atribuído ao GCM "+inputGcm.value;
                rtn.setAttribute("href", "/listaequipamentos.html");

            }else{
                rtn.innerText = "crachá NÂO confere!";
                rtn.setAttribute("href", "/listaequipamentos.html");
            }
        }
        else{
            // reader.cancel();
            console.log("passe o crachá novamente");
            console.log(data);
        }
        // await port.close();
    }
}