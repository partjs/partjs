/* global app:true */

(function() {
  'use strict';

  var app = {};

  app.Contact = Backbone.Model.extend({
    url: '/1/member',
    defaults: {
      data : []
    }
  });

  app.ContactView = Backbone.View.extend({
    el: '#member',
    template: _.template( $('#tmpl-member').html() ),
    events: {
    },
    initialize: function() {
      this.model = new app.Contact();
      this.listenTo(this.model, 'sync', this.render);
      this.model.fetch();
    },
    render: function() {
      console.log(this.model.attributes)
      this.$el.html(this.template( this.model.attributes ));
    }
  });

  $(document).ready(function() {
    app.contactView = new app.ContactView();
  });
}());
