$(document).ready(function() {

    $('#delegate_id').on('change',function () {

        axios.get(apiDashboardURL + 'property-delegate/'+$(this).val(), {
            params: {
                order_id:$('#order_id').val()
            }
        })
            .then(function(response) {
                $('.div-available-delegate').show();
                $('#is_available').text(response.data.is_available);
                $('.prop-delegate').html(response.data.output);
            })
            .catch(function(error) {
                onFormErrors(form);
            });
    });


    var form = $('#send-delegate-order-form');
    var delegate_id = form.find('#delegate_id');
    var order_id = form.find('#order_id');

    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('delegate_id', delegate_id.val());
        formData.append('order_id',order_id.val());


        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'send-delegate-order',
            responseType: 'json',
            data: formData
        })
            .then(function(response) {
                toastr['success'](response.data.success, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false,
                });
                $('#name_delegate').text(response.data.name_delegate)
                onFormSuccess(form, true);
                $('#send-delegate-order-form').html('')
            })
            .catch(function(error) {
                onFormErrors(form);
                if (error.response.status === 422) {

                    textFieldError(delegate_id, error.response.data.errors.delegate_id);
                    textFieldError(order_id, error.response.data.errors.order_id);



                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});