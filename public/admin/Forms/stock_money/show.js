$(document).ready(function() {
    var form = $('#update-stock-money');
    var send_money_delegate = form.find('.send_money_delegate');


    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('send_money_delegate', send_money_delegate.val());

        formData.append('_method', 'PATCH');

        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'orders-pull-stock/'+ document.location.href.split('/')[5],
            responseType: 'json',
            data: formData
        })
            .then(function(response) {
                toastr['success'](response.data.success, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false,
                });

                $('#order_status').text(response.data.order_status);
                $('#send_money').hide();
                $('.submit').hide();

                var count_orders_stock_money=parseInt($('#count_orders_stock_money').text());

                if (count_orders_stock_money-1==0){
                    $('#count_orders_stock_money').remove();
                }else{
                    $('#count_orders_stock_money').text(count_orders_stock_money-1);

                }

                onFormSuccess(form, false);
            })
            .catch(function(error) {
                onFormErrors(form);
                if (error.response.status === 422) {

                    textFieldError(send_money_delegate, error.response.data.errors.send_money_delegate);


                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });

});