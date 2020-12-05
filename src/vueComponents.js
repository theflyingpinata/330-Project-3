function wrapper() {
    Vue.component('last-searched', {
        props: ['searched'],
        template:
        `<ol>
            <li v-for="l in searched.slice().reverse()"> {{ l }} </li>
        </ol>`
    });

    
};

export { wrapper };
