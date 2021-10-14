$(document).ready(function() {
    var form = $('#update-bank-form');
    var name_ar = form.find('#name_ar');
    var name_en = form.find('#name_en');
    var name_account = form.find('#name_account');
    var account_number = form.find('#account_number');
    var ibn_number = form.find('#ibn_number');



    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('name_ar', name_ar.val());
        formData.append('name_en', name_en.val());
        formData.append('name_account', name_account.val());
        formData.append('account_number', account_number.val());
        formData.append('ibn_number', ibn_number.val());
        formData.append('_method', 'PATCH');



        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'banks/'+ document.location.href.split('/')[5],
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
                    textFieldError(name_account, error.response.data.errors.name_account);
                    textFieldError(account_number, error.response.data.errors.account_number);
                    textFieldError(ibn_number, error.response.data.errors.ibn_number);



                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});