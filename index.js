const arrayComponentes = [];
document.querySelectorAll("acordion-component").forEach(comp => arrayComponentes.push(comp));

function filtrarBusqueda(e) {
  e.preventDefault(); 
  const entrada = document.querySelector("#entrada").value.trim().toLowerCase();
  const coincidencia = arrayComponentes.find(comp => comp.getAttribute("title") === entrada);
  
  if (coincidencia) {
    function insertCoincidencia(coincidencia) {
        seccionBusqueda.innerHTML = "";

        const HTML = `
          <acordion-component title="${coincidencia.getAttribute("title")}" class="${coincidencia.getAttribute("class")}">
                <span slot="contenido">${comp.innerHTML}</span>
            </acordion-component>
        `;

        seccionBusqueda.innerHTML += HTML;
    };
    insertCoincidencia;
  } else {
    return;
  }
}

function filtrarCategoria(categoria) {
  const seccionBusqueda = document.querySelector("#busqueda")

  function iterarFiltrados(array){
    seccionBusqueda.innerHTML = "";
    array.forEach(comp => {
        const categoria = comp.getAttribute("class"); 
        const titulo = comp.getAttribute("title"); 
        const contenido = comp.innerHTML; 
    
        // Generar un template por cada componente
        const HTML = `
          <acordion-component title="${titulo}" class="${categoria}">
                <span slot="contenido">${contenido}</span>
            </acordion-component>
        `;

        seccionBusqueda.innerHTML += HTML;
    })
  }

  if (categoria === "precios") {
    let arrayBusqueda = arrayComponentes.filter(comp => comp.classList.contains("precios"));
    iterarFiltrados(arrayBusqueda);
  } else if (categoria === "informacion") {
    let arrayBusqueda = arrayComponentes.filter(comp => comp.classList.contains("informacion"));
    iterarFiltrados(arrayBusqueda);
  } else if (categoria === "resenas") {
    let arrayBusqueda = arrayComponentes.filter(comp => comp.classList.contains("resenas"));
    iterarFiltrados(arrayBusqueda);
  } else {
    alert("Le erraste, máquina!");
    return; 
  }
}
