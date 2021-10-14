$(document).ready(function() {


    var form = $('#update-profile-form');
    var name = form.find('#name');
    var email = form.find('#email');
    var phone = form.find('#phone');
    var password = form.find('#password');
    var confirm_password = form.find('#confirm_password');
    var image = form.find('#image');


    form.submit(function(e) {

        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('name', name.val());
        formData.append('email', email.val());
        formData.append('phone', phone.val());
        formData.append('password', password.val());
        formData.append('confirm_password', confirm_password.val());
        ifFileFoundAppend('image', image[0], formData);

        formData.append('_method', 'PATCH');

        axios({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            method: 'POST',
            url: apiDashboardURL + 'editing-profile/'+$(this).data('user-id') ,
            responseType: 'json',
            data: formData
        })
            .then(function (response) {
                toastr['success'](response.data.success, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false,
                });
                onFormSuccess(form, false);
            })
            .catch(function (error) {
                onFormErrors(form);
                if (error.response.status === 422) {

                    textFieldError(name, error.response.data.errors.name);
                    textFieldError(email, error.response.data.errors.email);
                    textFieldError(phone, error.response.data.errors.phone);
                    fileFieldError(image, error.response.data.errors.image);
                    textFieldError(password, error.response.data.errors.password);
                    textFieldError(confirm_password, error.response.data.errors.confirm_password);



                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });

    });
});