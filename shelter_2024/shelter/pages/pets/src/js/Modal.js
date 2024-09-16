export class Modal {
    constructor (classes) {
        this.classes = classes;
        this.modal = '';
        this.modalContent = '';
        this.modalCloseBtn = '';
        this.overlay = '';
    };

    buildModal(content) {
        //Overlay
        this.overlay = this.createDomNote(this.overlay, 'div', 'overlay', 'overlay_modal');

        //Modal
        this.modal = this.createDomNote(this.modal, 'div', 'modal', this.classes);

        //Modal content
        this.modalContent = this.createDomNote(this.modalContent, 'div', 'modal__content');

        //Close button
        this.modalCloseBtn = this.createDomNote(this.modalCloseBtn, 'span', 'modal__close-icon');
        this.modalCloseBtn.innerHTML = '<img src="../../assets/icons/close.svg" alt="close" class="close-icon">'
        
        this.setContent(content);

        this.appendModalElements();

        //Bind Events
        this.bindEvents();

        //Open modal
        this.openModal();
    };

    createDomNote(node, element, ...classes) {
        node = document.createElement(element);
        node.classList.add(...classes);
        return node;
    };

    setContent(content) {
        if(typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else {
            this.modalContent.innerHTML = '';
            this.modalContent.appendChild(content);
        }
    };

    appendModalElements() {
        this.modal.append(this.modalCloseBtn);
        this.modal.append(this.modalContent);
        this.overlay.append(this.modal);
    };

    bindEvents() {
        this.modalCloseBtn.addEventListener('click', this.closeModal);
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.appendChild(this.overlay);
        body.classList.toggle("menu-opend");
    };

    closeModal(e) {
        let classes = e.target.classList;
        if(classes.contains('overlay') || classes.contains('modal__close-icon') || classes.contains('close-icon')) {
            document.querySelector('.overlay').remove();
            body.classList.remove("menu-opend");
        }
    };
    
}
