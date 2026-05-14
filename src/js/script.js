//Declarações dos Elementos usando DOM(Document Object Model)
const videoElemento = document.getElementById("video");
const botaoScnear = document.getElementById ("btn-texto");
const resultado = document.getElementById ("saida");
const canvas = document.getElementById("canvas");

//Função assicrona para habilitar a câmera

async function configurarCamera(){
    //tratamento de erros
    try{
        //chama a apai do navegador para solicitar acesso
        const midia= await navigator.mediaDevices.getUserMedia({
            //habilit a câmera traseira
           video:{factingMode: "enviroment"},
            //o audio nao seá capturado
        audio:false
        });
        //recebe a função midia para ser executada 
        videoElemento.srcObject=midia;
        //foça a reprodução do vídeo
        videoElemento.onplay();

    }catch(erro){
            resultado.innerText="Erro ao acessar a Câmera",erro;
    }
}
    //executando a função
    configurarCamera();

    //função para capturar o texto da câmera
botaoScnear.onclick =async ()=>{
botaoScnear.disabled=true; // habilitando a câmera
resultado.innerText="Fazendo a leitura do texto... aguarde";

//Define o cnvas para iniciar a leitura
const contexto = canvas.getContext("2d");

//ajusta o tamanho do canvas para o tamanho real do video
canvas.width =videoElemento.videoWidth;
canvas.height = videoElemento.videoHeight;

//aplica o filtron para melhorar o OCR
contexto.filter='contrast (1.2) grayscale(1)'; 

//desenha o video no canvas
contexto.drawImage(videoElemento, 0,0, canvas.width, canvas.height);

try{
const {data:{text}}=await Tesseract.recognize( 
canvas,
'por' //define o idioma
);
//remove os espaços em branco
const textoFinal = text.trim();
resultado.innerText=textoFinal.length > 0 ? textoFinal.length > 0 ?
//estrutura condicional ternaria ?=if : =else
textoFinal: "Não foi possível indentificar o texto"


}catch(erro){
resultado.innerText="Erro no processamento", erro
}
finally{
//desabilita o botão para fazer a nova captura
    botaoScnear.disabled =false
}


}

