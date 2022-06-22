
 $('#searchF').fadeOut(1);


function aparecerLabel(){
    $('#searchF').fadeIn(2000);
    $('#searchF').focus();
    
}

function limit (string = '', limit = 0) {  
  return string.substring(0, limit)
}

function desaparecerLabel(){ 
    $('#searchF').fadeOut(10);
    $('#searchF').blur();
    
}

function validateParams(valor){ 
  if(event.key === 'Enter') {
    exibeFilmeSearch(valor)
  }
}

function carregaModal(valor){ 
  let modal = document.getElementById ('modal-div');

  $.ajax ({
    url: `https://api.themoviedb.org/3/movie/${valor}?api_key=55377b36c147ee5f67870358be9cbd79`,
    method: 'GET',
            
  }).done (function (data) {        

    // Mostrar o código na div tela
    modal.innerHTML = contruirCorpoModal(data);    

  });    
}



function contruirCorpoModal(data){
  let textoHTML = '';
  let imagemFilme = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  let sinopseFilme = data.overview;
  let tituloFilme = data.original_title
  let linkFilme = data.homepage
  console.log(data);

  textoHTML += `
  <div class="card card-bg" widht="100%" height="100%" style='max-height: 440px;'>
    <div class="row">
      <div class="col-6">
        <img src="${imagemFilme}" height="100%" width="100%"  class="img-destaque" alt="Img">
      </div>

      <div class="col-6">
        <div class="card-body">
            <p class="card-text"><b>Titulo:</b>${tituloFilme}</p>
            <p class="card-text"><b>Sinopse:</b>${limit(sinopseFilme,140)}...</p>
            <p class="card-text"><b>Link:</b><a target="_blank" href="${linkFilme}"><h6>Link para a pagina do filme...</h6></a></p>
        </div>
      </div>
    </div>
  </div>

        `;

  
    return textoHTML
  } 


function exibeFilmeSearch (valor=""){
  let tela = document.getElementById ('tela');
  let titulo = document.getElementById('destaques') 
  if(valor == ""){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor digite um valor válido!',
      footer: '<b>Vamos, tente novamente</b>'
    })
    titulo.innerHTML= `<b>Favor digite algo valido!</b>`
    return
  }
  titulo.innerHTML= `Resultado da pesquisa sobre <b>${valor}</b>`
  
    $.ajax ({
      url: `https://api.themoviedb.org/3/search/movie?api_key=55377b36c147ee5f67870358be9cbd79&query=${valor}`,
      method: 'GET',        
    }).done (function (data) { 
      
      // console.log(data);
     
      // Mostrar o código na div tela
      tela.innerHTML = contruirEstruturas(data);    

    });
}


function exibeFilmes () {
    let tela = document.getElementById ('tela');

    $.ajax ({
      url: `https://api.themoviedb.org/3/movie/popular`,
      method: 'GET',
      data: {
        api_key: '55377b36c147ee5f67870358be9cbd79'
      },        
    }).done (function (data) {        
      // console.log(data);
     
      // Mostrar o código na div tela
      tela.innerHTML = contruirEstruturas(data);    

    });    
  }


function contruirEstruturas(data){
  let textoHTML = '';

  for (i=0; i < data.results.length; i++) {
    let imagemFilme = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
    let tituloFilme = data.results[i].title;
    let linkFilme = data.results[i].homepage;
    let sinopseFilme = data.results[i].overview;
    let idFilme = data.results[i].id;

    textoHTML += `
    <div class="col-xs-3 col-md-6 col-lg-4 col-sm-6">
      <div class="card card-bg" widht="100%" height="100%" style='max-height: 440px;'>
          <a onclick="carregaModal(${idFilme})" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="${imagemFilme}" height="100%" width="100%"  class="img-destaque" alt="Demon Slayer"></a>
          <div class="card-body">
              <p class="card-text"><b>${limit(sinopseFilme,140)}...</b></p>
          </div>
      </div>
    </div>`;

    }
  
    return textoHTML
  }                



  window.addEventListener ('load', function () {
    exibeFilmes ();
  });