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
*/
async function connect2() {
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
        const decoder = new TextDecoder();
        const data = decoder.decode(value);
        hex += data;
        if(hex.length==8){
          reader.cancel();
          // reader.releaseLock();
          await port.forget(); 
          console.log("numero Binário: "+hex);
          return hex;
        }
      }
      if (done) {
        console.log('Conexão fechada!');
        hex="ERRO"
        return hex;
      }
    }
}
export { connect2 };