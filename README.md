## Sites pesquisados sobre Web Serial API:
https://whatwebcando.today/serial.html
https://wicg.github.io/serial/

### Especificações da placa embarcada ESP32:
* productId: 29987 ==> 0x7523
* usbVendorId: 6790 ==> 0x1A86

#### Diagrama esquemático da ligação do ESP32 com módulo RFid
https://curtocircuito.com.br/blog/Categoria%20IoT/controle-de-acesso-pelo-telegram-com-esp32
#### Pinagem ESP32
https://www.aranacorp.com/pt/utilizar-um-modulo-rfid-com-um-esp32/

## Deploy (hospedagem) da aplicação

Alterado os dominios das rotass das funções JS. No primeiro momento o backend e o banco de dados foram migrados para o servidor RAILWAY já frontend está no servidor NETLIFY:
* Dominio local antes da implantação:
    * http://localhost:8080
* Dominio RAILWAY depois da implantação:
    * https://gcmsystem.up.railway.app
* Dominio NETLIFY depois da implantação:
    * https://gcmsystem.netlify.app

## Preload 12/11/2023
Implementado 2(dois)segundos e meio de pré-carregamento na página principal (*index.html*) para que o usuário final não visualize o carregamento desordenado do site.