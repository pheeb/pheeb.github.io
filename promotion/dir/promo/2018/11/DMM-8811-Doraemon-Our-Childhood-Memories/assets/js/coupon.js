$(function() {
// document
	'use strict';

	var coupon = $('div.fe-coupon');
	coupon.addClass('cm-align-center');

	//  Unique Id for each Coupon
	var idCoupon = 0;
	for (var i = 0; i < coupon.length; i++) 
	{
		idCoupon++;
		coupon[i].id = "cm_cp_" + idCoupon;
	}

	// Settings
	coupon.each(function() {
		var _coupon = $(this);
		var cpValue = _coupon.attr("data-value") + "";
		var cpPercent = _coupon.attr("data-percent") + "";
		var cpRm = _coupon.attr("data-rm") + "";
		var cpSub = _coupon.attr("data-condition") + "";
		
		// Different Data type
		if (_coupon.data('type') == "bonus") 
		{
			_coupon.addClass('bonus');
			_coupon.append(
				'<div class="cm-cp-title">' + 'Bonus Coupon' + '</div>' + '\n' + '<div class="cm-cp-value">' + '<span class="cp-rm">' + cpRm + '</span>' + cpValue + '<span class="cp-percent">' + cpPercent + '</span>' + '</div>' + '\n' + '<div class="cm-cp-sub">' + cpSub + '</div>'
				);
			$(_coupon.children()).wrapAll("<div class='cm-cp-container'/>");
		} 

		else if (_coupon.data('type') == "store") 
		{
			_coupon.addClass('store');
			_coupon.append(
				'<div class="cm-cp-title">' + 'Store Cart Coupon' + '</div>' + '\n' + '<div class="cm-cp-value">' + '<span class="cp-rm">' + cpRm + '</span>' + cpValue + '<span class="cp-percent">' + cpPercent + '</span>' + '</div>' + '\n' + '<div class="cm-cp-sub">' + cpSub + '</div>'
				);
			$(_coupon.children()).wrapAll("<div class='cm-cp-container'/>");
		} 

		else if (_coupon.data('type') == "shipping") 
		{
			_coupon.addClass('shipping');
			_coupon.append(
				'<div class="cm-cp-title">' + 'Shipping Fee Coupon' + '</div>' + '\n' + '<div class="cm-cp-value">' + '<span class="cp-rm">' + cpRm + '</span>' + cpValue + '<span class="cp-percent">' + cpPercent + '</span>' + '</div>' + '\n' + '<div class="cm-cp-sub">' + cpSub + '</div>'
				);
			$(_coupon.children()).wrapAll("<div class='cm-cp-container'/>");
		}
		else if (_coupon.data('type') == "shopping") 
		{
			_coupon.addClass('shopping');
			_coupon.append(
				'<div class="cm-cp-title">' + 'Shopping Cart Coupon' + '</div>' + '\n' + '<div class="cm-cp-value">' + '<span class="cp-rm">' + cpRm + '</span>' + cpValue + '<span class="cp-percent">' + cpPercent + '</span>' + '</div>' + '\n' + '<div class="cm-cp-sub">' + cpSub + '</div>'
				);
			$(_coupon.children()).wrapAll("<div class='cm-cp-container'/>");
		} else {
			return false;
		}
	});

	// alignment to middle
	$('.fe-coupon').on('resize',function() {
		$(".cm-cp-container").css('margin-top', function() {
			return($('.fe-coupon').height() - $(this).height()) / 2
		});
	}).resize();

	// font size
	// textfit();
	// $('.fe-coupon').on('resize',textfit);

	// function textfit() {
	// 	var v1 = $('.fe-coupon').width() - 10;
	// 	var v2 = $('.cm-cp-title').width();
	// 	var vRatio = Math.round(v1 / v2 * 20) / 10;
		
	// 	var h1 = $('.fe-coupon').height() - 10;
	// 	var h2 = $('.cm-cp-title').height();
	// 	var hRatio = Math.round(h1 / h2 * 20) / 10;

	// 	var final = Math.min(vRatio, hRatio);

	// 	$('.cm-cp-title').css('font-size', final + 'vw');
	// }
});//end

