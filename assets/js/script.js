"use strict";

import { capitalize, criarTooltips, desanitizarStringURL, isEmpty, popovers, primeiroNome, sanitizarString, tooltips } from "./modulos/utilitarios.js";

(() => {
  const url = new URLSearchParams(new URL(window.location).search);
  
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload();
    })
  })
  
  function atribuirLinks(){
    const linkElementos = document.querySelectorAll('[data-link]');
    
    linkElementos.forEach(link => {
      switch(link.dataset.link.toLowerCase().trim()){      
        case 'confirmacao-cca':
        link.href = 'https://gabrieszin.github.io/confirmacao-cca/';
        break;

        case 'password-generator':
        link.href = 'https://gabrieszin.github.io/random-password/';
        break;

        case 'nlw-exporer':
        link.href = 'https://github.com/gabrieszin/nlw-esports-gabrieszin';
        break;

        case 'qr-code-generator':
        link.href = 'https://gabrieszin.github.io/qr-code-generator/';
        break;
        
        case 'github-dev':
        link.href = 'https://github.com/gabrieszin';
        break;
        
        case 'github-projeto':
        link.href = 'https://github.com/gabrieszin/gerador-de-cancelamento';
        break;
        
        case 'portfolio':
        link.href = 'https://gabrieszin.github.io/portfolio/';
        break;  
        
        case 'linkedin':
        link.href = 'https://linkedin.com/in/gabrielribeirodev/';
        break;  
      }
      
      link.setAttribute('rel', 'noopener noreferrer');
    })
  }
  
  function atribuirAcoes(){
    const acoes = document.querySelectorAll('[data-action]');
    
    acoes.forEach(acao => {
      switch(acao.dataset.action){
        case 'acao':
        break;
        
        default:
        console.warn('A ação não foi implementada.')
        break;
      }
    })
  }
  
  const motivosParaSerCancelado = [
    "Discurso de ódio",
    "Crimes contra a Humanidade",
    "Apropriação Cultural",
    "Terrorismo",
    "Bad Take",
    "Bullying",
    "Racismo",
    "Machismo",
    "Feminismo",
    "Sexismo",
    "Homofobia",
    "Transfobia",
    "Xenofobia",
    "Intolerância religiosa",
    "Apologia à violência",
    "Assédio online",
    "Cyberbullying",
    "Compartilhamento de informações pessoais sem permissão",
    "Assédio sexual",
    "Uso indevido de linguagem ou memes ofensivos",
    "Plágio",
    "Falsas acusações",
    "Comportamento misógino",
    "Negligência em relação a responsabilidades éticas",
    "Desinformação deliberada",
    "Incitação à discriminação",
    "Exploração de vulnerabilidades de outras pessoas",
    "Comportamento narcisista excessivo",
    "Cultura do linchamento online",
    "Comportamento manipulador",
    "Abuso de poder em posições de autoridade",
    "Práticas antiéticas em negócios",
    "Atos criminosos",
    "Comentários insensíveis em momentos de tragédia",
    "Difamação",
    "Práticas questionáveis em marketing de mídia social",
    "Comportamento predatório",
    "Participação em scams ou fraudes online",
    "Excesso de autopromoção",
    "Falta de empatia",
    "Ignorar ou minimizar questões importantes",
    "Apoiar ou promover causas prejudiciais",
    "Ataques pessoais sem motivo justificável",
    "Abuso de poder em relações pessoais ou profissionais",
    "Falta de transparência",
    "Desrespeito aos direitos autorais",
    "Compartilhamento irresponsável de informações médicas",
    "Exploração de minorias ou grupos vulneráveis",
    "Defesa de teorias da conspiração",
    "Plataformas de discurso de ódio",
    "Apoio a regimes ou grupos extremistas",
    "Comportamento tóxico em comunidades online",
    "Comportamento destrutivo em relacionamentos interpessoais",
    "Abuso de animais em vídeos ou fotos",
    "Comportamento perigoso para a saúde pública",
    "Violação de leis de privacidade",
    "Não se desculpar ou aprender com erros anteriores"
  ];  
  
  const input = document.querySelector('.form-input-name');
  
  input.addEventListener('input', (evento) => {
    evento.target.setAttribute('size', input.value.length > 0 ? input.value.length : 11)
  })
  
  window.addEventListener("load", function () {
    setTimeout(() => {
      $('.overlay').slideUp();
    }, 0);
    
    atribuirLinks();
    atribuirAcoes();
    criarTooltips();
    tooltips();
    popovers();
    
    let work = false;
    
    $('form').on('submit', (event) => {
      event.preventDefault();
      
      const input = document.querySelector('.form-input-name');
      const message = document.querySelector('#message');
      
      if(!isEmpty($('.form-input-name').val())){
        // Só executará se a tarefa estiver como false
        if(!work){
          $(message).text('');
          $(message).fadeIn();
          
          work = true; // Marcando tarefa como em execução
          input.setAttribute('disabled', 'on');
          event.target.querySelector('button').classList.add('disabled');
          
          setTimeout(() => message.textContent = '_', 100);
          setTimeout(() => message.innerHTML = '&nbsp;', 300);
          setTimeout(() => message.textContent = '_', 400);
          setTimeout(() => message.innerHTML = '&nbsp;', 500);
          
          setTimeout(() => {
            const urlMotivo = desanitizarStringURL(url.get('motivo'));

            // Sortear um índice do array de motivosParaSerCancelado
            const motivoSorteado = isEmpty(urlMotivo)? Math.floor(Math.random() * motivosParaSerCancelado.length) :urlMotivo;
            
            `${capitalize(primeiroNome($(input).val()))} foi cancelado por ${isEmpty(urlMotivo) ? motivosParaSerCancelado[motivoSorteado].toLowerCase() : motivoSorteado }.`.split('').forEach((letter, index) => {
              setTimeout(() => {
                index === 0 ? message.textContent = letter : message.textContent += letter;
              }, index * 40);
            });
            
            setTimeout(() => {
              input.removeAttribute('disabled');
              event.target.querySelector('button').classList.remove('disabled');
              work = false;
            }, (isEmpty(urlMotivo) ? motivosParaSerCancelado.length : motivoSorteado.length) * 40);
          }, 500);
        }
      }else{
        $(message).fadeOut(); // Escondendo a seção de mensagem
        $(input).val('') // Limpando o input de nome
        input.setAttribute('size', '11'); // Resetando o input de nome para o tamanho padrão
      }
    })
    
  });
})();