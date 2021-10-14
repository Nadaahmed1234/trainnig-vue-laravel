$(document).ready(function() {
$('#accept').on('click',function (e) {
    var formData = new FormData();

    formData.append('order_id', $('#order_id').val());


    axios({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        method: 'POST',
        url: apiDashboardURL + 'accept-order',
        responseType: 'json',
        data: formData
    })
        .then(function(response) {
            toastr['success'](response.data.success, 'Success!', {
                closeButton: true,
                tapToDismiss: false,
            });
            onFormSuccess(form, true);

        })
        .catch(function(error) {
            onFormErrors(form);

        });
    $('#control-order').remove();

});

$('#refuse').on('click',function (e) {
    var formData = new FormData();

    formData.append('order_id',$('#order_id').val());


    axios({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        method: 'POST',
        url: apiDashboardURL + 'refuse-order',
        responseType: 'json',
        data: formData
    })
        .then(function(response) {
            toastr['success'](response.data.success, 'Success!', {
                closeButton: true,
                tapToDismiss: false,
            });
            onFormSuccess(form, true);
        })
        .catch(function(error) {
            onFormErrors(form);

        });
    $('#control-order').remove();

});

});