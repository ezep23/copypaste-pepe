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
                <slot name="contenido"></slot>
              </div>
            </div>
        </div>
        `;

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
                background-color: #f7f7f7;
                padding: 10px;
                cursor: pointer;
                font-weight: bold;
            }

            .accordion-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                padding: 0 10px;
                background-color: #fff;
            }

            .accordion-content.open {
                max-height: 100px; /* Ajusta según el contenido */
                padding: 10px;
            }
        `;
        this.shadowRoot.appendChild(container);
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('acordion-component', Acordion);
