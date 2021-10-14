$(document).ready(function() {
    document.getElementById('create-user-form').reset();


    var form = $('#create-user-form');
    var name = form.find('#name');
    var email = form.find('#email');
    document.getElementById("email").value = null;
    var phone = form.find('#phone');
    var password = form.find('#password');
    document.getElementById("password").value = null;

    var confirm_password = form.find('#confirm_password');
    var type = form.find('#type');
    var start_work = form.find('#start_work');
    var end_work = form.find('#end_work');
    var duration_work = form.find('#duration_work');
    var image = form.find('#image');
    var searchInput = form.find('#searchInput');
    var address = form.find('#address');
    var latitude = form.find('#latitude');
    var longitude = form.find('#longitude');


    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('name', name.val());
        formData.append('email', email.val());
        formData.append('phone', phone.val());
        formData.append('password', password.val());
        formData.append('confirm_password', confirm_password.val());
        formData.append('type',type.val());
        if (start_work.val()!=undefined){

            formData.append('start_work', start_work.val());

        }

        if (end_work.val()!=undefined){

            formData.append('end_work',end_work.val());

        }

        formData.append('duration_work', duration_work.val());
        formData.append('searchInput', searchInput.val());
        formData.append('latitude', latitude.val());
        formData.append('longitude', longitude.val());
        ifFileFoundAppend('image', image[0], formData);


        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'users',
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

                    textFieldError(name, error.response.data.errors.name);
                    textFieldError(email, error.response.data.errors.email);
                    textFieldError(phone, error.response.data.errors.phone);
                    fileFieldError(image, error.response.data.errors.image);
                    textFieldError(type, error.response.data.errors.type);
                    textFieldError(password, error.response.data.errors.password);
                    textFieldError(confirm_password, error.response.data.errors.confirm_password);

                    textFieldError(start_work, error.response.data.errors.start_work);
                    textFieldError(end_work, error.response.data.errors.end_work);
                    textFieldError(duration_work, error.response.data.errors.duration_work);

                    textFieldError(address, error.response.data.errors.searchInput);


                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });
});