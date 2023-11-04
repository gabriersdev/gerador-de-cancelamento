const isEmpty = (valor) => {
  try{
    if(typeof valor == 'string'){
      return valor == undefined || valor == null || valor.trim().length <= 0;
    }else if(Array.isArray(valor)){
      return valor.length <= 0;
    }else if(typeof valor == 'object'){
      return Object.keys(valor).length <= 0;
    }else{
      return valor == undefined || valor == null
    }
  }catch(error){
    throw new error('Ocorreu um erro ao verificar se o %s é vazio. Error: %s', typeof valor, error);
    return true;
  }
}

const capitalize = (valor) => {
  return valor.charAt(0).toUpperCase() + valor.substr(1, valor.length).toLowerCase();
}

const atualizarDatas = () => {
  const dataAtual = new Date();
  document.querySelectorAll("[data-ano-atual]").forEach(area => {
    area.textContent = `${dataAtual.getFullYear()}`;
  })
} 

const controleFechamentoModal = () => {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    const btnFecha = modal.querySelector('[data-modal-fecha]');
    btnFecha.addEventListener('click', () => {
      $('#' + modal.id).modal('hide');
    })
  })
}

function sanitizarString(string ){
  if(typeof string == 'string'){
    const substituir = [
      {
        original: '-',
        subst: ''
      },
      {
        original: '(',
        subst: ''
      },
      {
        original: ')',
        subst: ''
      },
      {
        original: ' ',
        subst: ''
      },
    ]
    
    substituir.forEach(substituicao => {
      string = string.replace(substituicao.original, substituicao.subst)
    })
    
    return string.trim();
  }else{
    console.log('O tipo do parâmetro passado não é uma string.');
    return null;
  }
}

function tooltips(){
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
}

function popovers(){
  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });
}

async function SwalAlert(tipo, {icon, title, comp, confirm, html}, iconx, titlex, timer){
  tipo = tipo.toLowerCase().trim();
  
  // comp: text, mensagem, timer
  // confirm: label, showCancelButton, focusCancel
  
  try{
    if(isEmpty(comp)){
      comp = new Object();
      comp.text = '';
      comp.mensagem = '';
    }
  }catch(error){
    throw new Error('Necessário informar o objeto para desestruturação ainda que vazio');
  }
  
  try{
    if(isEmpty(title) && !isEmpty(titlex)){
      title = titlex;
    }
    
    if(isEmpty(icon) && !isEmpty(iconx)){
      icon = iconx;
    }
  }catch(error){
    
  }
  
  switch(tipo){
    case 'confirmacao':
    case 'confirm':
    if(isEmpty(confirm)){
      throw new Error('Necessário informar dados de confirmação para um alerta do tipo confirmação');
    }else{
      const dialog = await Swal.fire({
        icon: icon,
        title: title,
        text: comp.text,
        showCancelButton: confirm.showCancelButton,
        confirmButtonText: confirm.label,
        focusCancel: confirm.focusCancel,
        timer: timer
      })
      
      return new Promise((resolve, reject) => {
        resolve({confirmed: dialog.isConfirmed});
      });
    }
    break;
    
    case 'html':
    if(!isEmpty(html)){
      Swal.fire(html);
    }else{
      throw new Error('Objeto HTML não informado no parâmetro');
    }
    console.log(html)
    break;
    
    case 'aviso':  
    case 'error':
    default:    
    Swal.fire({
      icon: tipo == 'error' ? 'error' : icon,
      title: title,
      text: comp.text,
      footer: comp.mensagem,
      timer: timer
    })    
    break;
  }
}

function resizeTextArea(textarea){
  // Créditos https://www.instagram.com/reel/CrdgXF3AECg/
  const initialHeight = parseInt(getComputedStyle(textarea).getPropertyValue('height'));
  textarea.addEventListener('input', () => {
    textarea.style.height = `${initialHeight}px`;
    const scrollHeight = textarea.scrollHeight;
    const newHeight = textarea.scrollHeight - initialHeight;
    textarea.style.height = `${newHeight < scrollHeight ? scrollHeight : newHeight}px`;
  });
}

const copiar = async (valor) => {
  await navigator.clipboard.writeText(valor);
}

function verificarCPF(cpf){
  cpf = cpf.replace(/\D/g, '');
  
  switch (cpf){
    case '00000000000':
    resultado = false
    break;
    case '11111111111':
    resultado = false
    break;
    case '22222222222':
    resultado = false
    break;
    case '33333333333':
    resultado = false
    break;
    case '44444444444':
    resultado = false
    break;
    case '55555555555':
    resultado = false
    break;
    case '66666666666':
    resultado = false
    break;
    case '77777777777':
    resultado = false
    break;
    case '88888888888':
    resultado = false
    break;
    case '99999999999':
    resultado = false
    break;
    default: 
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var resultado = true;
    [9,10].forEach(function(j){
      var soma = 0, r;
      cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
        soma += parseInt(e) * ((j+2)-(i+1));
      });
      r = soma % 11;
      r = (r <2)?0:11-r;
      if(r != cpf.substring(j, j+1)) resultado = false;
    });
  }
  
  return resultado;
}

function zeroEsquerda(quantidadeZeros, valor){
  let zeros;
  
  for(let i = 0; i < quantidadeZeros; i++){
    zeros == null ? zeros = "0" : zeros = zeros + "0";
  }
  return (zeros + valor).slice(-quantidadeZeros);
}

function desanitizarStringURL(string){
  if(!isEmpty(string)){
    return decodeURIComponent(string).replaceAll('-', ' ').trim();
  }else{
    return '';
  }
}

function sanitizarStringParaURL(string){
  if(!isEmpty(string)){
    return encodeURIComponent(string.trim().toLowerCase().replaceAll(' ', '-'));
  }else{
    return '';
  }
}

function sanitizarNumeros(string){
  if(!isEmpty(string)){
    return string.replace(/\D/g, '');
  }else{
    return '';
  }
}

const criarEBaixarArquivo = (conteudo, nome_arquivo, ext) => {
  try{
    let blob = new Blob([`${JSON.parse(conteudo)}`], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `${nome_arquivo.toUpperCase()}.${ext}`);
  }catch(error){
    console.warn('Framework File Saver necessário');
    throw new Error(error);
  }
}

const capturarDadosURL = (parametro) => {
  try{
    const parametros = new URLSearchParams(new URL(window.location).searchParams);
    
    if(isEmpty(parametro) && parametros.size > 0){
      const saida = new Object();
      
      parametros.forEach((value, key) => {
        saida[key] = value;
      })
      
      return saida;
    }else{
      return parametros.get(parametro);
    }
  }catch(error){
    throw new Error('Ocorreu um erro ao capturar os parâmetros passados na URL. Error: %s', error);
  }
}

const format = (string, composicao) => {
  if(string.includes('{}')){
    if(Array.isArray(composicao)){
      for(let i = 0; i <= (composicao.length - 1); i ++){
        if(composicao[i] !== null && composicao[i] !== undefined){
          string = string.replace('{}', composicao[i]);
        }
      }
      return string;
    }else if(!isNaN(composicao)){
      return string.replace('{}', composicao);
    }else{
      throw new Error('Parâmetro de composição não informado');
    }
  }else{
    return string;
  }
}

const mult = (str, multiplicador) => {
  let ret = str;
  if(multiplicador !== undefined && typeof parseInt(multiplicador) == 'number' && !isEmpty(str)){
    for (i = 1; i < multiplicador; i++){
      ret += str
    }
  }
  return ret
}

const tratamentoCampos = (input) => {
  $(document).ready(function(){
    switch(input.dataset.input){
      case 'cpf':
      $(input).mask('000.000.000-00', {reverse: true});
      break;
      
      case 'cep':
      $(input).mask('00000-000', {reverse: true});
      break;
      
      case 'data_nascimento':
      $(input).mask('00/00/0000');
      break;
      
      case 'telefone':
      $(input).mask('(00) 00000-0000');
      break;
      
      case 'id-fid':
      $(input).mask('000000');
      break;
      
      case 'id-valor-imovel':
      mascararValores(input);
      break;
      
      case 'matricula':
      $(input).mask('0000000');
      break;
      
      default:
      break;
    }
    
    switch(input.dataset.mask){
      case 'money':
      mascararValores(input);
      break;
    }
  });
}

function mascararValores(input){
  // Créditos https://stackoverflow.com/questions/62894283/javascript-input-mask-currency
  
  if(isEmpty(input.value)){
    input.value = 'R$ 0,00';
  }
  
  input.addEventListener('input', () => {
    const value = input.value.replace('.', '').replace(',', '').replace(/\D/g, '')
    
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100)
    
    if(isNaN(result) && result == 'NaN'){
      input.value = 'R$ 0,00';
    }else{
      input.value = 'R$ ' + result;
    }
  })
  input.removeAttribute('maxlength');
}

const range = ({min, max, scale}) => {
  isEmpty(min)? min = 0 : '';
  isEmpty(scale) ? scale = 1 : '';
  const ret = new Array();
  
  if(max !== 0 && scale !== 0){
    if(scale >= 1 && min < max){
      for(let i = min; i < max; i += scale){
        ret.push(i)
      }
    }else if(scale < 0 && min < max){
      for(let i = min; i < max; i -= scale){
        ret.push(i)
      }
    }
    return ret;
  }else{
    return max;
  }
}

const between = (value, initial, end) => {
  return value >= initial && value <= end
}

const componenteCopiar = async () => {
  $('[data-component-copy]').each((index, element) => {
    const [buttonCopy, originCopy, propertyCopy] = [element.querySelector('[data-element="origin-copy"'), element.querySelector('[data-action="button-copy"]'), element.dataset.propertyCopy]
    if(!isEmpty(originCopy) && !isEmpty(buttonCopy)){
      $(buttonCopy).on('click', (event) => {
        event.preventDefault();
        return new Promise((resolve, reject) => {
          switch(propertyCopy){
            case 'textContent':
            case 'innerHTML':
            case 'outerHTML':
            case 'value':
              resolve(copiar(originCopy.getAttribute(propertyCopy)))
            break;
            default:
              resolve(copiar(originCopy.getAttribute('value')))
            break;
          }
        })
      })
    }else{
      console.log('Um dos elementos necessários para o funcionamento do componente não foi definido.')
    }
  })
}

const setAttributes = (element, params) => {
  if(Object.keys(params).length >= 1 && !Array.isArray(params)){
    try{
      let param = ''
      for (param in params){
        element.setAttribute(param, params[param])
      }
    }catch(error){
      throw new Error('Um erro ocorreu.', error)
    }
  }else if(Array.isArray(params) && params.length == 2){
    try{
      element.setAttribute(params[0], params[1])
    }catch(error){
      throw new Error('Um erro ocorreu.', error)
    }
  }

  return element;
}

const createElement = (element, params) => {
  if(params !== null && params !== undefined){
    element = setAttributes(element, params);
  }

  return element;
}

const criarTooltips = () => {
  $('[data-visual-tooltip]').each((index, e) => {
    const ele = setAttributes(e, {
      "data-toggle": "tooltip",
      "data-placement": "top",
      "data-bs-custom-class": `${e.dataset.customTooltip}`
    })
  })
}

function primeiroNome(nome){
  const nome_separado = nome.trim().split(' ');
  return nome_separado[0];
}

export{
  isEmpty,
  capitalize,
  atualizarDatas,
  controleFechamentoModal,
  sanitizarString,
  tooltips,
  popovers,
  SwalAlert,
  resizeTextArea,
  copiar,
  verificarCPF,
  zeroEsquerda,
  desanitizarStringURL,
  sanitizarStringParaURL,
  sanitizarNumeros,
  criarEBaixarArquivo,
  capturarDadosURL,
  format,
  mult,
  tratamentoCampos,
  mascararValores,
  range,
  between,
  componenteCopiar,
  createElement,
  setAttributes,
  criarTooltips,
  primeiroNome
}