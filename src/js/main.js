
$(function(){
	$('.features-circle .bar').each(function(){
		var c = calcDashOffset($(this).closest('.features-circle').data('percent'), $(this))[0]
		$(this).css('strokeDashoffset',c);
	});
	$('.fancybox').fancybox();
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
		var calcRangeSlider = $('#calcSliderInit')[0];
		if ($('#calcSliderInit').length) {
			var output = $(calcRangeSlider).closest('.calc-param').find('.slider-value');

			noUiSlider.create(calcRangeSlider, {
				start: 10000,
				step: 1000,
				connect: [true, false],
				range: {
					min: 10000,
					max: 80000
				},
				pips: {
					mode: 'count',
					values: '8',
					density: 1.5
				}
			});
			output.change(function(){
				calcRangeSlider.noUiSlider.set([this.value, null])
			});
			calcRangeSlider.noUiSlider.on('update', function(values, handle){
				output.val(values[handle]);
			});
		}
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
	
});

