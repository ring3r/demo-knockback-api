var app = app || {};

(function() {
    'use strict';

    app.PersonViewModel = kb.ViewModel.extend({
        constructor: function(model, options) {
            kb.ViewModel.prototype.constructor.call(this, model, { keys: ['id', 'name', 'address', 'email', 'phone', 'active'] }, options);
        }
    });
})();