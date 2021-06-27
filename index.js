/* -------------------------------------Regiões-----------------------------------------*/
const regioes = {
  '111': 'centroOeste',
  '333': 'nordeste',
  '555': 'norte',
  '888': 'sudeste',
  '000': 'sul',
};

/*------------------------------------Tipos de produto---------------------------------*/
const tipoDeProduto = {
  '000': 'joias',
  '111': 'livros',
  '333': 'eletronicos',
  '555': 'bebidas',
  '888': 'brinquedos',
};

const pacotes = [
  '888555555123888',
  '333333555584333',
  '222333555124000',
  '000111555874555',
  '111888555654777',
  '111333555123333',
  '555555555123888',
  '888333555584333',
  '111333555124000',
  '333888555584333',
  '555888555123000',
  '111888555123555',
  '888000555845333',
  '000111555874000',
  '111333555123555',
];
/*----------------------------------------Verificações---------------------------------*/
function verificaPacoteValido(pacote) {
  let valido = true
  if (pacote.codigoLoggi != "555") valido = false;
  if (!pacote.tipoProduto) valido = false;
  if (pacote.tipoProduto == "joias" && pacote.origem == "centroOeste")  {
    valido = false;
}
  if (pacote.vendedor == "584") valido = false;
  return valido
}

function verificaDados(arrPacotes = []) {
  if (!arrPacotes || (arrPacotes && arrPacotes.length < 1)) return [];

  return arrPacotes.map((pacote) => {
    const resultado = {
      pacote,
      valido: true,
    };
    if (pacote.length < 15) return { valido: false }; 
    let index = 0
    const regiaoOrigem = regioes[pacote.slice(index, index + 3)];
    index = index + 3
    const regiaoDestino = regioes[pacote.slice(index, index + 3)];
    index = index + 3
    const codigoLoggi = pacote.slice(index, index + 3);
    index = index + 3
    const codigoVendedor = pacote.slice(index, index + 3);
    index = index + 3
    const codigoTipoProduto = tipoDeProduto[pacote.slice(index, index + 3)];
    if (regiaoOrigem == "sul" && codigoTipoProduto == "brinquedos") {
        resultado.contemBrinquedo = true;
    }
    resultado.destino = regiaoDestino;
    resultado.codigoLoggi = codigoLoggi;
    resultado.origem = regiaoOrigem;
    resultado.vendedor = codigoVendedor;
    resultado.tipoProduto = codigoTipoProduto;
    resultado.valido = verificaPacoteValido(resultado)
    return resultado
  });
}

function buscarPacotesPorDestino(pacotes) {
  return pacotes.reduce((resultado = {}, pacote) => {
    if(verificaPacoteValido(pacote)){
      (resultado[pacote['destino']] = resultado[pacote['destino']] || []).push(pacote);
      return resultado;
    }
 }, {});
}
  const pacotesPorDestino = JSON.stringify(buscarPacotesPorDestino(verificaDados(pacotes)))
  console.log(pacotesPorDestino)

function contaPacotesPorVendedor(pacotes) {
  return pacotes.reduce((resultado, pacote) => {
    if(!verificaPacoteValido(pacote)) return resultado
    let count = (resultado[pacote['vendedor']] = resultado[pacote['vendedor']] || 0)
    resultado[pacote['vendedor']] = count + 1
    return resultado;
 }, {});
}
const pacotesPorVendedor = JSON.stringify(contaPacotesPorVendedor(verificaDados(pacotes)))
console.log(pacotesPorVendedor)

function buscarPacotesPorTipo(pacotes) {
  return pacotes.reduce((resultado = {}, pacote) => {
    if(verificaPacoteValido(pacote)){
      (resultado[pacote['tipoDeProduto']] = resultado[pacote['tipoDeProduto']] || []).push(pacote);
      return resultado;
    }
 }, {});
}
