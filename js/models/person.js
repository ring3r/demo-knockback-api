var app = app || {};

(function() {
    'use strict';
    app.Person = Backbone.Model.extend({
        url: function() {
            var id = this.get('id');
            console.log("Id: ", id)
            return id ? "persons.php?id=" + id : "persons.php";
        },
        defaults: {
            name: "",
            address: "",
            email: "",
            phone: "",
            id: "",
            active: 0
        },
        validate: function(attrs) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var errors = {};
            if (!attrs.name) {
                errors.name = "name must be required";
            }
            if (!attrs.address) {
                errors.address = "address must be required";
            }
            if (!attrs.email) {
                errors.email = "email must be required";
            } else if (!attrs.email.match(mailformat)) {
                errors.email = "You have entered an invalid email address!";
            }
            if (!attrs.phone) {
                errors.phone = "phone must be required";
            } else if (isNaN(attrs.phone)) {
                errors.phone = "phone must be numeric";
            }
            if (!_.isEmpty(errors))
                return errors;
        }
    });
})();