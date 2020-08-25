var app = app || {};

(function() {
    'use strict';

    // The application View Model is created and bound from the HTML using kb-inject.
    window.AppViewModel = kb.ViewModel.extend({
        constructor: function() {
            var self = this;
            kb.ViewModel.prototype.constructor.call(this);

            // The function used for filtering is dynamically selected based on the filterMode.
            this.filterMode = ko.observable('');
            console.log('filterMode1', this.filterMode);
            var filterFn = ko.computed(function() {
                console.log('filterMode2', self.filterMode());
                switch (self.filterMode()) {
                    case 'active':
                        return (function(model) { return model.active.get(1); });
                    case 'disable':
                        return (function(model) { return model.active.get(0); });
                };
                return (function() { return true; });
            });

            // A collectionObservable can be used to hold the instance of the collection.
            this.persons = kb.collectionObservable(new app.Persons(), app.PersonViewModel, { filters: filterFn });


            // Fetch the todos and the collectionObservable will update once the models are loaded
            this.persons.collection().fetch();
            console.log('list persons', this.persons.collection().fetch());

            self.removePerson = function(person) { self.persons.remove(person) }

        },
    });
})();