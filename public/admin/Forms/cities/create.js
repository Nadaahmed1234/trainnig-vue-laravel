$(document).ready(function() {
    var form = $('#create-city-form');
    var name_ar = form.find('#name_ar');
    var name_en = form.find('#name_en');
    var searchInput = form.find('#searchInput');
    var latitude = form.find('#latitude');
    var longitude = form.find('#longitude');
    // var service_id = form.find('#service_id');
    var address = form.find('#address');

    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('name_ar', name_ar.val());
        formData.append('name_en', name_en.val());
        // formData.append('service_id', service_id.val());
        formData.append('address', searchInput.val());
        formData.append('latitude', latitude.val());
        formData.append('longitude', longitude.val());


        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'cities',
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
                if (error.response.status === 422) {

                    textFieldError(name_ar, error.response.data.errors.name_ar);
                    textFieldError(name_en, error.response.data.errors.name_en);
                    // textFieldError(service_id, error.response.data.errors.service_id);
                    textFieldError(address, error.response.data.errors.address);

                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});