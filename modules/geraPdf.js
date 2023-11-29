export async function geracaoPdf(){
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("PREFEITURA MUNICIPAL DE PORTO ALEGRE",45, 30);
    doc.text("Secretaria Municipal de Segurança",45, 39);
    doc.text("Guarda Civil Metropolitana de Porto Alegre",45, 48);
    //doc.text("texto", distancia da esquerda da página, distancia do topo da página)
    doc.setFontSize(24);
    doc.text("Cautela nº 04", 90, 70);
    doc.setFontSize(10);
    doc.text("Guarda Municipal "+" declara ter RECEBIDO do supervisor da Equipe de ", 20, 80);
    doc.text("armamento e comunicação - EARC, o material abaixo discriminado:", 15, 87);

    doc.text(" Marca: ", 80, 101);
    doc.text(" Numero: ", 110, 101);
    doc.text("", 15, 108);
    doc.text("Declaro ter conhecimento e estar de acordo com as RESPONSABILIDADES DECORRENTES DA POSSE DO", 20, 115);
    doc.text("DO EQUIPAMENTO descrito", 15, 122);
    doc.text("Em conhecendo e subordinando-se às condições impostas pelo presente instrumento cabe ao detentor zelar ",15, 129);
    doc.text("pela conservação do equipamento, sob sua posse;", 15, 136);
    var now = new Date();
    var dateHour = now.toLocaleString("pt-br");
    doc.text("Realizado empréstimo do equipamento no dia: "+dateHour,50, 160);
    doc.text("Essa cautela foi gerada automaticamente mediante uso de senha e aproximação de crachá para identificação", 30, 167);
    doc.save('Cautela.pdf');
  }