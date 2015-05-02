/* global app:true */

(function() {
  'use strict';

  var app = {};

  app.Contact = Backbone.Model.extend({
    url: '/1/game',
    defaults: {
      you: 0,
      me: 0
    }
  });

  app.ContactView = Backbone.View.extend({
    el: '#game',
    template: _.template( $('#tmpl-score').html() ),
    count: 0,
    n: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    compute: [0, 0, 0, 0, 0, 0, 0, 0],
    events: {
      'click #get-weather': 'click',
      'click .cell': 'cell'
    },
    initialize: function() {
      this.model = new app.Contact();
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'change', this.render);
      this.model.fetch();
    },
    render: function() {
      this.$el.append(this.template( this.model.attributes ));

      var self = this;
      setInterval(function() {
        // 0 to 8
        var item = Math.floor(Math.random() * 9);
        var me = $("[data-num=" + item + "]");

        me.removeClass('fa-times-circle');
        me.removeClass('fa-circle-o');

        self.n[item] = 0;
      }, 1000);
    },
    click: function() {
      $('#weather-info').removeClass('hide');
      $('#get-weather').addClass('hide');
    },
    cell: function(event) {
      var me = $(event.target);
      var idx = me.data('num');

      if (me.hasClass('fa-times-circle') 
          || me.hasClass('fa-circle-o'))
        return;

      if (this.count % 2)
        me.addClass('fa-times-circle');
      else
        me.addClass('fa-circle-o');

      this.count++;

      this.n[idx] = (this.count % 2) ? 1 : -1;

      this.compute[0] = this.n[0] + this.n[1] + this.n[2];  
      this.compute[1] = this.n[3] + this.n[4] + this.n[5];
      this.compute[2] = this.n[6] + this.n[7] + this.n[8];
      this.compute[3] = this.n[0] + this.n[3] + this.n[6];
      this.compute[4] = this.n[1] + this.n[4] + this.n[7];
      this.compute[5] = this.n[2] + this.n[5] + this.n[8];
      this.compute[6] = this.n[2] + this.n[4] + this.n[6];
      this.compute[7] = this.n[0] + this.n[4] + this.n[8];

      if (this.compute.indexOf(3) !== -1) {
        var you = this.model.get('you');

        this.model.set('you', you + 1);
        this.model.save(); // POST
        
        this.$el.html("");
      }

      if (this.compute.indexOf(-3) !== -1) {
        var me = this.model.get('me');
        
        this.model.set('me', me + 1);
        this.model.save();

        this.$el.html("");
      }
    }
  });

  $(document).ready(function() {
    app.contactView = new app.ContactView();
  });
}());
