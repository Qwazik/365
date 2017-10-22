$(function(){
	$('.scrollto').click(function(){
		var selector = $(this).attr('href');
		if($(selector).length){
			var target = $(selector).offset().top;
			$('html, body').stop(true, true).animate({
				scrollTop: target
			},1000);
		}
		return false;
	});

	$('.features-circle .bar').each(function(){
		var c = calcDashOffset($(this).closest('.features-circle').data('percent'), $(this))[0]
		$(this).css('strokeDashoffset',c);
	});
	
	$('input[type="tel"], input[name="phone"]').inputmask('+7(999)999-99-99');
	$('.main-header').css('background','none');
	$('.mobile-menu-btn').click(openMobileNav);

	$('#reviewsCarousel').owlCarousel({
		items: 3,
		margin: 30,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		dots: true,
		responsive:{
			0: {
				items: 1
			},
			480:{
				items: 2
			},
			767: {
				items: 3
			}
		}
	});

	$('#partnersCarousel').owlCarousel({
		nav: true,
		items: 4,
		margin: 30,
		dots: false,
		responsive:{
			0: {
				items: 1
			},
			480:{
				items: 2
			},
			767: {
				items: 3
			},
			992: {
				items: 4
			}
		}
	});

	(function(){
		var tabs = $('.tabs'),
			tabsNav = tabs.find('.tabs-nav');
			tabsBody = tabs.find('.tabs-main');
		tabsNav.find('li').click(function(){
			$(this).siblings('li').removeClass('active');
			$(this).addClass('active');
			$(tabsBody).find('.tabs-body').removeClass('active');
			$(tabsBody).find('.tabs-body').eq($(this).index()).addClass('active');
		})
	}());

	(function(){
		$('.question').click(function(){
			$(this).closest('.questions__item').toggleClass('open');
			$(this).siblings('.answer').slideToggle();
		});
	}());

	

	(function(){
		var offset = 120;
		var needHeight = $(window).height() - offset;
		var maxHeight = 850;
	}());


	if($(".waypoint-circles").length){

		var waypoint = new Waypoint({
			element: $('.waypoint-circles')[0],
			handler: featuredCircle,
			offset: '50%'
		});
	}

	(function(){
		if($('#map').length){


			ymaps.ready(init);
	        var myMap, 
	            myPlacemark;
	        var center;
	        if($(window).outerWidth() <= 992){
	        	center = [53.31614907110899,34.27609999999998];
	        }else{
	        	center = [53.31614907110899,34.27318175659176]
	        }
	        function init(){ 
	            myMap = new ymaps.Map("map", {
	                center: center,
	                zoom: 17
	            }); 
	            
	            myPlacemark = new ymaps.Placemark([53.31614907110899,34.27609999999998], {
	                
	            });
	            
	            myMap.geoObjects.add(myPlacemark);
	        }
        }
	}());

	function openMobileNav(){
		$(this).toggleClass('active');
		$('.main-menu').toggleClass('active');
	}

	

	function featuredCircle(){
		$('.features-circle').each(function(){
			var val = $(this).data('percent');
			var circle = $(this).find('.bar');
			var color = circle.data('color');
			var data = calcDashOffset(val,circle);
			var dasharray = data[0];
			var pct = data[1];
		    
		    circle.css({ 
		    	strokeDasharray: dasharray,
		    	strokeDashoffset: dasharray,
		    	stroke: color,
		    	strokeDashoffset: pct
		    });

		});
		numberCount();
	    this.destroy();	    	   
	}

	function calcDashOffset(val, circle){
		var r = circle.attr('r');
	    var c = Math.PI*(r*2);
	    if (val < 0) { val = 0;}
	    if (val > 100) { val = 100;}
	    var pct = ((100-val)/100)*c;

	    return [c, pct];
	}

	function numberCount(){
		$('.count').each(function () {
		    $(this).prop('Counter',0).animate({
		        Counter: $(this).text().replace(/\s/g,'')
		    }, {
		        duration: 2000,
		        easing: 'swing',
		        step: function (now) {
		            $(this).text(digitSpace(Math.ceil(now)));
		        }
		    });
		});
	}
	
	function digitSpace(val){
		val = String(val);
		val = val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		return val;
	}
	
	$('.btn-sredstva-out').click(function() {
		var formArray = $(this).parents('form#vyvod-sredstv').serializeArray();
		// $.post("processForm.php", formArray)
		  // .done(function(data) {
			// console.log(data);
		  // }, "json"	);
		$.ajax({
			type: "POST",
			url: "processForm.php",
			data: formArray,
			//dataType: 'json',
			success: function(data){
				var parsedData = JSON.parse(data);
				if(parsedData.ok)
					location.href="/cabinet/vyvod-sredstv/";
				else
					$('div.msg').html(parsedData.error);
			},
			error: function(jqXhr, textStatus, errorThrown) {
				//console.log("Ошибка '" + jqXhr.status + "' (textStatus: '" + textStatus + "', errorThrown: '" + errorThrown + "')");
			},
			complete: function () {

			}
		});
	});
	
});




function create_deposit(){
	var error = true;
    var sum = $('#sum_deposit').val();
    var tariff = $('#dtariff').val();
    if (sum == '') {
            $('#sum_deposit').css('border', '1px solid red');
            error = true;
        }
        else {
             $('#sum_deposit').css('border', '1px solid #ccc');
            error = false;
        }
        if (tariff == 'disabled') {
            $('#dtariff').css('border', '1px solid red');
            error = true;
        }
        else {
            $('#dtariff').css('border', '1px solid #ccc');
            error = false;
        }
		if (error == false) {
		    $.ajax({
		        type: "POST",
		        url: "/local/templates/365/include/create_deposit.php",
		        data: {sum:sum,tariff:tariff}
		    }).done(function( result )
		        {	
		        	var deposit_id = result;
		        	$("#deposit_id").val(deposit_id)
		            //$("#msg").html(result);
		            $("#create_deposit").submit();
		        });
		}
}



$( "#sum_deposit" ).change(function() {
	var sum = $('#sum_deposit').val();
	$.ajax({
	    type: "POST",
	    url: "/local/templates/365/include/tarrif.php",
	    data: {sum:sum}
	}).done(function( result )
	{	
		$("#dtariff").html(result);
		$("#dtariff").removeAttr("disabled");
	});
});


function reinvestirovat(data) {
	var id = $(data).attr("data-id");
		$.ajax({
	    type: "POST",
	    url: "/local/templates/365/include/reinvestirovat.php",
	    data: {id:id}
	}).done(function( result )
	{	
		$(".account-history__table").load(location.href + " .account-history__table");
		$('.account-history__table tr:empty').hide();
	});
}


//calc

// $(function(){
	var calc = (function($){
		var percentSelector = $('.calc .percent .val');
		var params = {};
		var sumValue = 0;
		var conditions = [
		{
			min: 10000,
			max: 99999,
			percent: 20,
			month: 0
		},
		{
			min: 100000,
			max: 999999,
			percent: 28,
			month: 2
		},
		{
			min: 1000000,
			max: 2999999,
			percent: 36,
			month: 2
		},
		{
			min: 3000000,
			max: 4999999,
			percent: 48,
			month: 3
		},
		{
			min: 5000000,
			max: Infinity,
			percent: 60,
			month: 4
		},
		];

		function getParams(value){
			for(i in conditions){

				if(value >= conditions[i]['min'] && value <= conditions[i]['max']){
					params = conditions[i];
				}
			}     
		}

		function digitSpace(val){
			val = String(val);
			val = val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
			return val;
		}

		function paramsRender(){
			percentSelector.text(params['percent']);

			$('.time-line label').each(function(i,e){
				if(params['month'] < i){
					$(e).find('input').attr('disabled','disabled');
					if($('input[name="time-line"]:checked').is('[disabled]')){
						$('input[disabled]:checked').prop('checked',false);
						$('input[name="time-line"]').not($('input[disabled]')).last().prop('checked',true);
					}
				}else{
					$(e).find('input').removeAttr('disabled');

				}
			});
		}

		return {

			setValue: function(value){
				value = value || 0;
				sumValue = Number(String(value).replace(/ /g, ''));
				calc.calculate();
			},
			calculate: function(){
				getParams(sumValue);
				paramsRender();
				sumValue = +sumValue;
				var sumSelector = $('#final-value .val');
				var incomeSelector = $('#income .val');
				var percent = +params['percent'] / 100;
				var month = +$('input[name="time-line"]:checked').val() / 12;
				var income = (percent * month) * sumValue;
				var sum = sumValue + income;
				// console.log(+$('input[name="time-line"]:checked').val());
				sumSelector.text(digitSpace(Math.round(sum)));
				incomeSelector.text(digitSpace(Math.round(income)));
			},
		}
	}(jQuery));


	(function(){
		var calcRangeSlider = $('#calcSliderInit')[0];
		if ($('#calcSliderInit').length) {
			var output = $(calcRangeSlider).closest('.calc-param').find('.slider-value');

			noUiSlider.create(calcRangeSlider, {
				start: 10000,
				step: 1000,
				connect: [true, false],
				range: {
					min: 10000,
					max: 10000000
				},
				format: wNumb({
					decimals: 0,
					thousand: ' '
				}),
				pips: {
					mode: 'count',
					values: '7',
					density: 1.5
				}
			});
			output.change(function(){
				calcRangeSlider.noUiSlider.set([this.value, null]);
			});
			calcRangeSlider.noUiSlider.on('update', function(values, handle){
				output.val(values[handle]);
				calc.setValue(values[handle]);
			});
		}
	}());

	
	$('input[name="time-line"]').change(calc.calculate);

	$('.modal-form form').submit(function(){
      var bodyForm = $(this).closest('.modal-form');
      var form = this;

      bodyForm.addClass('sending');

      ajaxSendForm(form, bodyForm);
      return false;
    });

    function ajaxSendForm(form, bodyForm){
      var method = form.method,
          url = form.action,
          data = $(form).serialize(),
          request = $.ajax({
            url: url,
            data: data,
            method: method
          });
      request.done(function(xhr){
         // console.log(xhr);
         bodyForm.removeClass('sending');
         bodyForm.addClass('sent');
      });
      
      request.fail(function(xhr){
        console.log(xhr.statusText);
      });

      return false;
    }



// });


$(document).ready(function(){
	$('[data-cut]').each(function(){
		var symbols = $(this).data('cut');
		var text = $(this).text().trim();
		if(text.length > symbols){
			// console.log(text);
			// console.log(symbols-1, text.lastIndexOf())
			text = text.substring(symbols-1, text.lastIndexOf());
			$(this).text(text+'...');
		}
	});
});

if(location.origin == 'https://qwazik.github.io'){
    $('body').append($('<script type="text/javascript" src="https://cdn.rawgit.com/Qwazik/scripts/master/navGit.js"></script>'));
    $(window).load(function(){
        navGit({
            'Главная':'index.html',
            'Кабинет':'cabinet.html',
            'О компании':'about.html',
            'Контакты':'contacts.html',
            'Faq':'faq.html'
        });
    });
}