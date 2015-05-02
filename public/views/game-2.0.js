/* global app:true */

(function() {
  'use strict';

  var app = {};

  app.ContactView = Backbone.View.extend({
    el: '#game',
    count: 0,
    n: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    compute: [0, 0, 0, 0, 0, 0, 0, 0],
    events: {
      'click #get-weather': 'click',
      'click .cell': 'cell'
    },
    initialize: function() {
      this.render();
    },
    render: function() {
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

      if (this.compute.indexOf(3) !== -1)
        alert('You Win');

      if (this.compute.indexOf(-3) !== -1)
        alert('I Win');
    }
  });

  $(document).ready(function() {
    app.contactView = new app.ContactView();
  });
}());
