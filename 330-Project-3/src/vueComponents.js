function wrapper() {
    Vue.component('last-searched', {
        props: ['searched'],
        template:
        `<ol>
            <li v-for="l in searched.slice().reverse()"> {{ l }} </li>
        </ol>`
    });

    Vue.component('spell-info', {
        props: ['itemName', 'value'],
        template: `<b> {{itemName}} | {{value}} Games <b> <br>`
    });
};

export { wrapper };
