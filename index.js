const arrayComponentes = [];
document.querySelectorAll("acordion-component").forEach(comp => arrayComponentes.push(comp));

const buscar = document.querySelector("#buscar")

const filtrarBusqueda = (e) => {
  e.preventDefault();
  const seccionBusqueda = document.querySelector("#busqueda")
  const entrada = document.querySelector("#entrada").value.trim().toLowerCase();
  const coincidencia = arrayComponentes.find(comp => comp.getAttribute("title").toLowerCase() == entrada);
  
  if (coincidencia) {
    seccionBusqueda.innerHTML = ""

    let HTML = `
    <div id="contenedor-busqueda">
      <p>BÚSQUEDA</p>
      <acordion-component title="${coincidencia.getAttribute("title")}" class="${coincidencia.getAttribute("class")}">
        <span slot="contenido">${coincidencia.innerHTML}</span>
      </acordion-component>
    </div>
    `;

    seccionBusqueda.innerHTML += HTML;
  } else {
    return;
  }
}

buscar.addEventListener("click", filtrarBusqueda)
  
function filtrarCategoria(categoria) {
  
  const seccionFiltrados = document.querySelector("#filtrados")
  function iterarFiltrados(array){
    seccionFiltrados.innerHTML = "";

    let textoFiltros = document.querySelector("#texto-filtro")
    textoFiltros.innerText = "FILTROS"

    array.forEach(comp => {
        const categoria = comp.getAttribute("class"); 
        const titulo = comp.getAttribute("title"); 
        const contenido = comp.innerHTML; 
    
        // Generar un template por cada componente
        let HTML = `
          <acordion-component title="${titulo}" class="${categoria}">
                <span slot="contenido">${contenido}</span>
          </acordion-component>
        `;

        seccionFiltrados.innerHTML += HTML;
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
