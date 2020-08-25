var app = app || {};

(function() {
    'use strict';
    app.Persons = Backbone.Collection.extend({
        // name: 'personCollection',
        model: app.Person,
        url: 'persons.php',
    });
})();