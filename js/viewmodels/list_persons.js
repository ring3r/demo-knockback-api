var ko = kb.ko;

var PersonListViewModel = function(persons) {
    var _this = this;
    this.search = ko.observable('');
    this.persons = kb.collectionObservable(persons, {
        view_model: PersonViewModel,
        sort_attribute: 'name',
        filters: [function(model) {
            var search = _this.search();
            if (!search) return true;
            return model.get('name') && (model.get('name').search(search) >= 0);
        }]
    });
};