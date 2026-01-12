customElements.define('kiss-accordion', class extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();
    }

    connectedCallback() {


        this.addEventListener('click', e => {

            let trigger = e.target.matches('kiss-accordion-trigger') ? e.target : e.target.closest('kiss-accordion-trigger');

            // Only handle if trigger is a direct child of this accordion (not nested)
            if (trigger && trigger.parentElement === this) {
                e.preventDefault();
                e.stopPropagation();
                this.toggle(this.triggerElements().indexOf(trigger));
            }
        })
    }

    triggerElements() {

        return Array.from(this.children).filter(c => {
            return c.matches('kiss-accordion-trigger');
        });
    }

    toggle(index = 0) {

        let triggers = this.triggerElements(),
            multiple = this.getAttribute('multiple') !== null;

        triggers.forEach((t, idx) => {

            if (idx == index) {
                t.setAttribute('active', (!t.getAttribute('active') || t.getAttribute('active') == 'false') ? 'true' : 'false');
            } else if(!multiple) {
                t.setAttribute('active', 'false');
            }
        });
    }
});