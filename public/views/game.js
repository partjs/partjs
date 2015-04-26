(function($) {

	var count = 0;
	var n = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	var compute = [0, 0, 0, 0, 0, 0, 0, 0];

	var cells = $('.cell');

	$.fn.invalidate = function(item) {
		var me = $(this);
		me.find('i').removeClass('fa-times-circle');
		me.find('i').removeClass('fa-circle-o');

		n[item] = 0;
	};

	setInterval(function() {
		// 0 to 8
		var item = Math.floor(Math.random() * 9); 
		var cell = $(cells[item]);
		cell.invalidate(item);
	}, 1000);

	cells.each(function(idx) {
		var me = $(this);
		this.idx = idx;
		me.on('click', function() {
			if (me.find('i').hasClass('fa-times-circle') 
					|| me.find('i').hasClass('fa-circle-o'))
				return;

			if (count % 2)
				me.find('i').addClass('fa-times-circle');
			else
				me.find('i').addClass('fa-circle-o');

			count++;

			n[idx] = (count % 2) ? 1 : -1;

			compute[0] = n[0] + n[1] + n[2];	
			compute[1] = n[3] + n[4] + n[5];
			compute[2] = n[6] + n[7] + n[8];
			compute[3] = n[0] + n[3] + n[6];
			compute[4] = n[1] + n[4] + n[7];
			compute[5] = n[2] + n[5] + n[8];
			compute[6] = n[2] + n[4] + n[6];
			compute[7] = n[0] + n[4] + n[8];

			if (compute.indexOf(3) !== -1)
				alert('You Win');

			if (compute.indexOf(-3)	!== -1)
				alert('I Win');
		});
	});

}) ($);

