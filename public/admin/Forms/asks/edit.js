$(document).ready(function() {
    var form = $('#update-general-questions-form');
    var ask_ar = form.find('#ask_ar');
    var ask_en = form.find('#ask_en');
    var answer_ar = form.find('#answer_ar');
    var answer_en = form.find('#answer_en');

    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('ask_ar', ask_ar.val());
        formData.append('ask_en', ask_en.val());
        formData.append('answer_ar', answer_ar.val());
        formData.append('answer_en', answer_en.val());
        formData.append('_method', 'PATCH');


        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'general-questions/'+ document.location.href.split('/')[5],
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

                    textFieldError(ask_ar, error.response.data.errors.ask_ar);
                    textFieldError(ask_en, error.response.data.errors.ask_en);
                    textFieldError(answer_ar, error.response.data.errors.answer_ar);
                    textFieldError(answer_en, error.response.data.errors.answer_en);

                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});