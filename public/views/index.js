/* global app:true */

(function() {
  'use strict';

  var app = {};

  app.Contact = Backbone.Model.extend({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=Taipei',
    defaults: {
      main: {},
      weather: []
    }
  });

  app.ContactView = Backbone.View.extend({
    el: '#weather',
    template: _.template( $('#tmpl-weather').html() ),
    events: {
      'click #get-weather': 'click'
    },
    initialize: function() {
      this.model = new app.Contact();
      this.listenTo(this.model, 'sync', this.render);
      this.model.fetch();
    },
    render: function() {
      this.$el.html(this.template( this.model.attributes ));
    },
    click: function() {
      $('#weather-info').removeClass('hide');
      $('#get-weather').addClass('hide');
    }
  });

  $(document).ready(function() {
    app.contactView = new app.ContactView();
  });
}());
