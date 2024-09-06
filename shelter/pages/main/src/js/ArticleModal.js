import { Modal } from './Modal';

export class ArticleModal extends Modal {
    constructor (classes, {id, name, img, type, breed, description, age, inoculations, diseases, parasites}) {
        super(classes);
        this.id = id;
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }

    //Content generator
    generateContent() {
        let template = '';
        let card = document.createElement('div');
        card.className = 'card-modal__content';
        card.setAttribute('id', this.id);

        this.img &&
        (template += `<img class="our-friends-modal-img" src=${this.img} alt="our-friends">`)

        if(this.name || this.type || this.breed || this.description || this.age || this.inoculations || this.diseases || this.parasites) {
            template += `<div class="our-friends__modal-content">`

            this.name && 
            (template += `<h3 class="our-friends__modal-name">${this.name}</h3>`)

            this.type && this.breed &&
            (template += `<h4 class="our-friends__modal-type">${this.type} - ${this.breed}</h4>`)

            this.description && 
            (template += `<h5 class="our-friends__modal-description">${this.description}</h5>`)

            template += `<ul class="our-friends__modal-list">`

            this.age &&
            (template += `<li class="our-friends__modal-li"><span class="our-friends__modal-span-li">Age:</span> ${this.age}</li>`)

            if(this.inoculations) {
                template += `<li class="our-friends__modal-li"><span class="our-friends__modal-span-li">Inoculations:</span>`
                this.inoculations.map((inoc, index) => {
                    if (this.inoculations.length - 1 > 0 && this.inoculations.length - 1 != index) {
                        template += `<span class="our-friends__modal-span"> ${inoc}, </span>`
                    } else {
                        template += `<span class="our-friends__modal-span"> ${inoc} </span>`
                    }
                })
                template += `</li>`
            }

            if(this.diseases) {
                template += `<li class="our-friends__modal-li"><span class="our-friends__modal-span-li">Diseases:</span>`
                this.diseases.map((dis, index) => {
                    if (this.diseases.length - 1 > 0 && this.diseases.length - 1 != index) {
                        template += `<span class="our-friends__modal-span"> ${dis}, </span>`
                    } else {
                        template += `<span class="our-friends__modal-span"> ${dis} </span>`
                    }
                    
                })
                template += `</li>`
            }

            if(this.parasites) {
                template += `<li class="our-friends__modal-li"><span class="our-friends__modal-span-li">Parasites:</span>`
                this.parasites.map((par, index) => {
                    if (this.parasites.length - 1 > 0 && this.parasites.length - 1 != index) {
                        template += `<span class="our-friends__modal-span"> ${par}, </span>`
                    } else {
                        template += `<span class="our-friends__modal-span"> ${par} </span>`
                    }
                })
                template += `</li>`
            }

            template += `</ul>`

            template += `</div>`
        }
        card.innerHTML = template;
        
        return card;
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
    }
}
