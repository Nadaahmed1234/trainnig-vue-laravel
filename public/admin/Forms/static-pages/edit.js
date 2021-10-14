$(document).ready(function() {
    var form = $('#update-static-page-form');

    var descr_en = CKEDITOR.instances.descr_en;
    var descr_ar = CKEDITOR.instances.descr_ar;
    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('descr_ar',CKEDITOR.instances.descr_ar.getData());
        formData.append('descr_en',CKEDITOR.instances.descr_en.getData());

        formData.append('_method', 'PATCH');

        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'static-pages/'+ document.location.href.split('/')[5],
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

                    ckEditorFieldError($('#descr_ar'), descr_ar, error.response.data.errors.descr_ar);
                    ckEditorFieldError($('#descr_en'), descr_en, error.response.data.errors.descr_en);

                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});