var app = app || {};

var PersonViewModel = kb.ViewModel.extend({
    constructor: function(person, persons) {
        var _this = this;
        kb.ViewModel.prototype.constructor.call(this, person, { requires: ['id', 'name', 'address', 'email', 'phone', 'active'] });

        var start_attributes = _.clone(person.attributes);
        this.model_changed = kb.triggeredObservable(person, 'change');
        this.isClean = ko.computed(function() {
            _this.model_changed();
            return _.isEqual(start_attributes, person.attributes);
        });
        this.onDelete = function() {
            if (!person.addNew) person.destroy();
            loadUrl('');
            return false;
        };
        this.save = function() {
            if (person.addNew) persons.add(person);
            person.save();
            loadUrl('');
            return false;
        };
    }
});