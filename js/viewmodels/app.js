var app = app || {};

var AppViewModel = function(view_model, element) {
    // var knockback_model = { id: '0', name: 'name1', address: 'address1', email: 'email1', phone: 'phone1', active: '1' };
    var persons = new app.Persons();
    // var persons = new app.Persons();
    persons.fetch();

    var active_el = null;
    var loadPage = function(el) {
        if (active_el) ko.removeNode(active_el);
        return element.appendChild(active_el = el);
    };

    router = new Backbone.Router();
    console.log('router', router);
    router.route('*path', null, function() { _.defer(loadUrlFn('')); });
    router.route('', null, function() {
        return loadPage(kb.renderTemplate('list.html', new PersonListViewModel(persons)));
    });
    router.route('new', null, function() {
        var person = new app.Person();
        person.addNew = true;
        return loadPage(kb.renderTemplate('detail.html', new PersonViewModel(person, persons)));
    });
    router.route('edit/:id', null, function(id) {
        var person;
        if (!(person = persons.get(id))) { loadUrl(''); return; }
        person.addNew = false;
        return loadPage(kb.renderTemplate('detail.html', new PersonViewModel(person)));
    });
};

// start outside of the binding loop
var personAppStartRouting = function() {
    if (!Backbone.History.started) {
        Backbone.history.start({ pushState: true, root: window.location.pathname });
    }
};