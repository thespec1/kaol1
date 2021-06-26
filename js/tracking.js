document.addEventListener('DOMContentLoaded', function () {
    // Tracking events
    // Trigger example: $(document).trigger("add_to_cart");
    $(document)
        //.on("add_to_cart", function(e, url) {
        //    trackEvent('AddToCart');
        //})
        .on("buy_one_click_pre", function() {
            trackEvent('InitiateCheckout', { content_name: 'buy_one_click' });
        })
        .on("buy_one_click_confirm", function() {
            trackEvent("Lead", { content_name: 'buy_one_click' });
        })
        .on("add_to_wishlist", function() {
            trackEvent('AddToWishlist');
        })
        .on("send_feedback", function() {
            trackEvent('Lead', { content_name: 'feedback' });
        })
        .on("send_preorder", function() {
            trackEvent('Lead', { content_name: 'preorder' });
        })
        .on("callback", function() {
            trackEvent('Lead', { content_name: 'callback', content_category: 'callback' });
        })
        .on("callback_request", function() {
            trackEvent('Lead', { content_name: 'callback_request', content_category: 'callback' });
        })
        .on("module_callback", function() {
            trackEvent('Lead', { content_name: 'module_callback', content_category: 'callback' });
        })
        .on("order_from_mobile", function() {
            trackEvent('Lead', { content_name: 'order_from_mobile' });
        });

    $(document).on("cart.add", function (e, offerId, productId, amount, attributesXml, cartId) {

        $.ajax({
            type: 'GET',
            async: false,
            dataType: 'json',
            url: 'facebookpixel/getproductinfo?offerId=' + offerId + "&productId=" + productId + "&cartId=" + (cartId || null),
            success: function (data) {
                if (data != null) {
                    trackEvent('AddToCart', data);
                }
            }
        });
    });

    // Send event
    function trackEvent(target, parameters) {
        try {
            if (fbq) {
                if (!parameters) {
                    fbq('track', target);
                } else {
                    fbq('track', target, parameters);
                }
            }
        } catch (err) {
        }
    }
});