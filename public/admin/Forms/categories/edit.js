$(document).ready(function() {
    var form = $('#update-category-form');
    var name_ar = form.find('#name_ar');
    var name_en = form.find('#name_en');
    var price = form.find('#price');
    var image = form.find('#image');
    // var parent_id = form.find('#parent_id');

    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('name_ar', name_ar.val());
        formData.append('name_en', name_en.val());
        formData.append('price', price.val());
        ifFileFoundAppend('image', image[0], formData);
        // formData.append('parent_id', parent_id.val());
        formData.append('_method', 'PATCH');


        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'categories/'+ document.location.href.split('/')[5],
            responseType: 'json',
            data: formData
        })
            .then(function(response) {
                toastr['success'](response.data.success, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false,
                });
                onFormSuccess(form, false);
            })
            .catch(function(error) {
                onFormErrors(form);
                if (error.response.status === 422) {

                    textFieldError(name_ar, error.response.data.errors.name_ar);
                    textFieldError(name_en, error.response.data.errors.name_en);
                    // textFieldError(parent_id, error.response.data.errors.parent_id);
                    textFieldError(price, error.response.data.errors.price);
                    fileFieldError(image, error.response.data.errors.image);
                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});