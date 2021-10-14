$(document).ready(function() {
    var form = $('#update-slider-form');
    var desc_en = form.find('#desc_en');
    var desc_ar = form.find('#desc_ar');
    var title_en = form.find('#title_en');
    var title_ar = form.find('#title_ar');
    var image = form.find('#image');



    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('desc_en', desc_en.val());
        formData.append('desc_ar',desc_ar.val());
        formData.append('title_ar',title_ar.val());
        formData.append('title_en',title_en.val());

        ifFileFoundAppend('image', image[0], formData);
        formData.append('_method', 'PATCH');


        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'sliders/'+ document.location.href.split('/')[5],
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

                    textFieldError(desc_ar, error.response.data.errors.desc_ar);
                    textFieldError(desc_en, error.response.data.errors.desc_en);

                    fileFieldError(image, error.response.data.errors.image);

                    textFieldError(title_en, error.response.data.errors.title_en);
                    textFieldError(title_ar, error.response.data.errors.title_ar);

                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});