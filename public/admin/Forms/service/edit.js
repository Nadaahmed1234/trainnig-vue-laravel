$(document).ready(function() {


//when click edit service type show data in model and show model
    $('.edit-service-type').on('click', function () {

        var service_type_id = $(this).data('service-type-id');
        $('#edit_service_type_id').val(service_type_id);

        var title_ar = $(this).closest(".row").find('.edit_title_service_ar').val();
        $('#edit-title-service-type-show-ar').val(title_ar);

        var title_en = $(this).closest(".row").find('.edit_title_service_en').val();
        $('#edit-title-service-type-show-en').val(title_en);

        var price = $(this).closest(".row").find('.edit_price_type_service').val();
        $('#edit-price-service-type-show').val(price);


        $('#edit-model-service-type').modal('toggle');
    });
//end


//submit form edit service type

    var formServiceType = $('#edit-service-type-form');

    var service_type_id = formServiceType.find('#edit_service_type_id');
    var title_service_type_ar = formServiceType.find('#edit-title-service-type-show-ar');
    var title_service_type_en = formServiceType.find('#edit-title-service-type-show-en');
    var price_service_type = formServiceType.find('#edit-price-service-type-show');


    formServiceType.submit(function (e) {
        e.preventDefault();
        var formDataEditServiceType = new FormData();
        formDataEditServiceType.append('title_en', title_service_type_en.val());
        formDataEditServiceType.append('title_ar', title_service_type_ar.val());
        formDataEditServiceType.append('price', price_service_type.val());

        formDataEditServiceType.append('_method', 'PATCH');
        $('#edit-model-service-type').modal('toggle');

        axios({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            method: 'POST',
            url: apiDashboardURL + 'update-service-type/' + service_type_id.val(),
            responseType: 'json',
            data: formDataEditServiceType
        })
            .then(function (response) {
                toastr['success'](response.data.success, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false,
                });
                onFormSuccess(formProp, false);
                $('#service-type' + response.data.service_type.id).closest(".row").find('.edit_title_service_ar').val(response.data.service_type.title_ar);
                $('#service-type' + response.data.service_type.id).closest(".row").find('.edit_title_service_en').val(response.data.service_type.title_en);
                $('#service-type' + response.data.service_type.id).closest(".row").find('.edit_price_type_service').val(response.data.service_type.price);

                $('#edit-model-service-type').modal('hide');
            })
            .catch(function (error) {
                onFormErrors(formProp);
                if (error.response.status === 422) {

                    $('#edit-model-service-type').modal('show');

                    textFieldError(title_service_type_en, error.response.data.errors.title_en);
                    textFieldError(title_service_type_ar, error.response.data.errors.title_ar);
                    textFieldError(price_service_type, error.response.data.errors.price);

                } else if (error.response.status !== 422) {
                    onFormFailure(formProp);
                }
            });

    });
//end


// when click edit property show data in model and show model
    $('.edit-property').on('click', function () {

        var service_id = $(this).data('service-id');
        $('#edit_service_id').val(service_id);

        var desc_ar = $(this).closest(".row").find('.edit_desc_ar').val();
        $('#edit-desc-show-ar').val(desc_ar);

        var desc_en = $(this).closest(".row").find('.edit_desc_en').val();
        $('#edit-desc-show-en').val(desc_en);

        var img_prop = $(this).closest(".row").find('.image-prop').attr('src');
        $('#edit-show-img').attr('src', img_prop);


        $('#edit-model-property').modal('toggle');
    });
//end


//submit form edit property

    var formProp = $('#edit-property-form');

    var service_id = formProp.find('#edit_service_id');
    var desc_en = formProp.find('#edit-desc-show-en');
    var desc_ar = formProp.find('#edit-desc-show-ar');
    var img_prop = formProp.find('#edit-img-prop');


    formProp.submit(function (e) {
        e.preventDefault();
        var formDataEditProperty = new FormData();
        ifFileFoundAppend('img_prop', img_prop[0], formDataEditProperty);
        formDataEditProperty.append('descr_en', desc_en.val());
        formDataEditProperty.append('descr_ar', desc_ar.val());

        formDataEditProperty.append('_method', 'PATCH');
        $('#edit-model-property').modal('toggle');

        axios({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            method: 'POST',
            url: apiDashboardURL + 'update-prop-service/' + service_id.val(),
            responseType: 'json',
            data: formDataEditProperty
        })
            .then(function (response) {
                toastr['success'](response.data.success, 'Success!', {
                    closeButton: true,
                    tapToDismiss: false,
                });
                onFormSuccess(formProp, false);
                $('#service' + response.data.attr.id).closest(".row").find('.edit_desc_ar').val(response.data.attr.descr_ar);
                $('#service' + response.data.attr.id).closest(".row").find('.edit_desc_en').val(response.data.attr.descr_en);
                $('#service' + response.data.attr.id).closest(".row").find('.image-prop').attr('src', 'http://127.0.0.1:8000/storage/' + response.data.attr.image);

                $('#edit-model-property').modal('hide');
            })
            .catch(function (error) {
                onFormErrors(formProp);
                if (error.response.status === 422) {

                    $('#edit-model-property').modal('show');

                    textFieldError(desc_en, error.response.data.errors.desc_en);
                    textFieldError(desc_ar, error.response.data.errors.desc_ar);
                    fileFieldError(image_prop, error.response.data.errors.image_prop)

                } else if (error.response.status !== 422) {
                    onFormFailure(formProp);
                }
            });

    });
//end


    var form = $('#update-service-form');
    var title_en = form.find('#title_en');
    var title_ar = form.find('#title_ar');
    var main_image = form.find('#main_image');
    var icon_image = form.find('#icon_image');
    var category_id = form.find('.category_id');
    var service_prop = form.find('#service_prop');


    form.submit(function (e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('name_en', title_en.val());
        formData.append('name_ar', title_ar.val());
        formData.append('service_prop', service_prop.val());
        ifFileFoundAppend('image', main_image[0], formData);
        ifFileFoundAppend('icon_image', icon_image[0], formData);


        //service type
        // $('.title_service_ar').each(function() {
        //     if (!$(this).hasClass('first_title_service_ar')) {
        //         formData.append('title_service_ar[]', $(this).val());
        //     }
        // });
        //
        // $('.title_service_en').each(function() {
        //     if (!$(this).hasClass('first_title_service_en')) {
        //         formData.append('title_service_en[]', $(this).val());
        //     }
        // });
        //
        //
        // $('.price_type_service').each(function() {
        //     if (!$(this).hasClass('first_price_type_service')) {
        //         formData.append('price_type_service[]', $(this).val());
        //     }
        // });

        //end

        //categories
        category_id.each(function() {
            if ($(this).is(':checked')){
                formData.append('category_id[]', $(this).val());
            }
        });

        //service prop
        $('.desc_ar').each(function() {
            if (!$(this).hasClass('first_desc_ar_prop')) {
                formData.append('desc_ar[]', $(this).val());
            }
        });

        $('.desc_en').each(function() {
            if (!$(this).hasClass('first_desc_en_prop')) {
                formData.append('desc_en[]', $(this).val());
            }
        });



        $('.images').each(function(i) {
            if (!$(this).hasClass('first_images_prop')) {
                var img_prop = $(this)[0].files.length;
                if (img_prop !== 0) {
                    for (var index = 0; index < img_prop; index++) {
                        formData.append('images[]', $(this)[0].files[index]);
                    }
                }
            }
        });
        //end

        formData.append('_method', 'PATCH');

        axios({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            method: 'POST',
            url: apiDashboardURL + 'services/'  + document.location.href.split('/')[5],
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
                    selectFieldError(category_id, error.response.data.errors.category_id);
                    textFieldError(title_en, error.response.data.errors.name_en);
                    textFieldError(service_prop, error.response.data.errors.service_prop);
                    textFieldError(title_ar, error.response.data.errors.name_ar);
                    fileFieldError(main_image, error.response.data.errors.image);
                    fileFieldError(icon_image, error.response.data.errors.icon_image);

                    form.find('.images').each(function(i) {
                        if ($(this).parent().prev().attr('src')==apiDashboardURL+'images/img-upload-placeholder.jpg'){
                            fileFieldError($(this), error.response.data.errors.images)

                        }
                    });

                    //  convert object to array
                    var obj = error.response.data.errors;
                    var result = Object.keys(obj).map(function(key) {
                        // Using Number() to convert key to number type
                        // Using obj[key] to retrieve key value
                        if (key.indexOf('desc_en') > -1 || key.indexOf('desc_ar') > -1
                            //|| key.indexOf('title_service_ar') > -1 || key.indexOf('title_service_en') > -1 ||
                            // key.indexOf('price_type_service') > -1

                        ) {
                            return [key, obj[key]];
                        }

                    });
                    //end

                    var arr = result.filter(Boolean);

                    if (arr.length > 1) {
                        for (const j in arr) {
                            var key = arr[j][0];
                            var num_key = key.match(/\d+/)[0];

                            // service type
                            // if (key.indexOf('title_service_ar') > -1) {
                            //     if ($('#title_service_ar_' + num_key).val() == undefined) {
                            //         textFieldError(form.find('.title_service_ar'), arr[j][1]);
                            //     }
                            //     textFieldError($('#title_service_ar_' + num_key), arr[j][1])
                            // }
                            //
                            // if (key.indexOf('title_service_en') > -1) {
                            //     if ($('#title_service_en_' + num_key).val() == undefined) {
                            //         textFieldError(form.find('.title_service_en'), arr[j][1]);
                            //     }
                            //     textFieldError($('#title_service_en_' + num_key), arr[j][1])
                            // }
                            //
                            //
                            // if (key.indexOf('price_type_service') > -1) {
                            //     if ($('#price_type_service_' + num_key).val() == undefined) {
                            //         textFieldError(form.find('.price_type_service'), arr[j][1]);
                            //     }
                            //     textFieldError($('#price_type_service_' + num_key), arr[j][1])
                            // }
                            //    end


                            //prop service
                            if (key.indexOf('desc_en') > -1) {
                                if ($('#desc_en_' + num_key).val() == undefined) {
                                    textFieldError(form.find('.desc_en'), arr[j][1]);
                                }
                                textFieldError($('#desc_en_' + num_key), arr[j][1])
                            }

                            if (key.indexOf('desc_ar') > -1) {
                                if ($('#desc_ar_' + num_key).val() == undefined) {
                                    textFieldError(form.find('.desc_ar'), arr[j][1]);
                                }
                                textFieldError($('#desc_ar_' + num_key), arr[j][1])
                            }
                            //    end


                        }
                    }


                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
    });

});