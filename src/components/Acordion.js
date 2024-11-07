class Acordion extends HTMLElement {
    constructor() {
        super(); 
        this.attachShadow({ mode: 'open' }); 
        
        // estructura acordión
        const HTML = `
        <div class="accordion">
            <div class="accordion-item">
            <div class="accordion-header">${this.getAttribute("title")}</div>
                <div class="accordion-content">
                <slot name="contenido" class="copiar"></slot>
                <button class="copy-button">Copiar al portapapeles</button>
                </div>
            </div>
        </div>
        `;

        // insertandolo en el HTML
        const container = document.createElement('div');
        container.innerHTML = HTML;

        // Funcionalidades del acordión
        let header = container.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            if (content.classList.contains('open')) {
                content.classList.remove('open');
            } else {
                container.querySelector('.accordion-content').classList.remove('open');
                content.classList.add('open');
            }
        });

        // Funcionalidad del botón copiar
        container.querySelector('.copy-button').addEventListener('click', () => {
        const slot = container.querySelector('slot[name="contenido"]');
        const assignedNodes = slot.assignedNodes();
    
        // Busca solo elementos con texto o texto en el slot
        const texto = assignedNodes.map(node => node.textContent.trim()).join(' ');
  
        navigator.clipboard.writeText(texto)
        .then(() => {
            Toastify({
                text: "Texto copiado",
                duration: 1000,
                style: {
                    background: "#000",
                },
            }).showToast();
        })
        .catch(error => {
            console.error('Error al copiar texto:', error);
            });
        });

        // Estilos del producto
        const style = document.createElement('style');
        style.textContent = `
        .accordion {
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
            width: 300px;
        }

            .accordion-item {
                border-bottom: 1px solid #ccc;
            }

            .accordion-header {
                background-color: #d9d9d9;
                padding: 10px;
                cursor: pointer;
                font-weight: bold;
            }

            .accordion-content {
                display: flex;
                flex-direction: column;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                padding: 0 10px;
                gap: 10px;
                background-color: #fff;
            }

            .accordion-content.open {
                gap: 10px;
                max-height: 100px; /* Ajusta según el contenido */
                padding: 10px;
            }

            .copy-button{
                background-color: #d9d9d9;
                border-radius: 50px;
                padding: 5px;
                width: ;
            }
        `;
        this.shadowRoot.appendChild(container);
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('acordion-component', Acordion);
