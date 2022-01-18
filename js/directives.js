(function() {
    Vue.directives = Vue.directives || [];

    const example = {
        name: 'example',
        mounted(el, {instance}) {
            el.addEventListener("click", ()=> {
                console.log("example directive clicked")
            })
        }
    }
    Vue.directives.push(example);
})();

// Vue.directives.forEach(dir => {
//   app.directive(dir.name, dir);
// });