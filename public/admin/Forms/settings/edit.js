$(document).ready(function() {

    var form = $('#update-setting-form');
    var link_snapchat = form.find('#link_snapchat');
    var link_instagram = form.find('#link_instagram');
    var link_twitter = form.find('#link_twitter');
    var link_facebook = form.find('#link_facebook');
    var differ_created_at_and_create_order = form.find('#differ_created_at_and_create_order');
    var logo = form.find('#logo');



    form.submit(function (e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('link_snapchat', link_snapchat.val());
        formData.append('link_instagram', link_instagram.val());
        formData.append('link_twitter', link_twitter.val());
        formData.append('link_facebook', link_facebook.val());
        formData.append('differ_created_at_and_create_order', differ_created_at_and_create_order.val());
        ifFileFoundAppend('logo', logo[0], formData);


        axios({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            method: 'POST',
            url: apiDashboardURL + 'settings'  ,
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
                    textFieldError(link_snapchat, error.response.data.errors.link_snapchat);
                    textFieldError(link_instagram, error.response.data.errors.link_instagram);
                    textFieldError(link_twitter, error.response.data.errors.link_twitter);
                    textFieldError(link_facebook, error.response.data.errors.link_facebook);
                    textFieldError(differ_created_at_and_create_order, error.response.data.errors.differ_created_at_and_create_order);
                    fileFieldError(logo, error.response.data.errors.logo);

                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });

});