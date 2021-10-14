$(document).ready(function() {

    var form = $('#create-service-form');
    var title_en = form.find('#title_en');
    var title_ar = form.find('#title_ar');
    var price = form.find('#price');
    var main_image = form.find('#main_image');
    var icon_image = form.find('#icon_image');
    var category_id = form.find('.category_id');



    form.submit(function(e) {
        e.preventDefault();
        onFormSubmit(form);
        var formData = new FormData();

        formData.append('name_en', title_en.val());
        formData.append('name_ar', title_ar.val());
        ifFileFoundAppend('image', main_image[0], formData);
        ifFileFoundAppend('icon_image', icon_image[0], formData);

        //categories
        category_id.each(function() {
            if ($(this).is(':checked')){
                formData.append('category_id[]', $(this).val());
            }
        });


    //service type
    //     $('.title_service_ar').each(function() {
    //         formData.append('title_service_ar[]', $(this).val());
    //     });
    //
    //     $('.title_service_en').each(function() {
    //         formData.append('title_service_en[]', $(this).val());
    //     });
    //
    //
    //     $('.price_type_service').each(function() {
    //         formData.append('price_type_service[]', $(this).val());
    //     });
        //end

        //prop service
        $('.desc_ar').each(function() {
            formData.append('desc_ar[]', $(this).val());
        });

        $('.desc_en').each(function() {
            formData.append('desc_en[]', $(this).val());
        });

        $('.images').each(function(i) {

            var images = $(this)[0].files.length;

            if (images !== 0) {
                for (var index = 0; index < images; index++) {
                    formData.append('images[]', $(this)[0].files[index]);
                }
            }
        });

        //end
        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'services',
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

                    selectFieldError(category_id, error.response.data.errors.category_id);
                    textFieldError(title_en, error.response.data.errors.name_en);
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

                            // ||key.indexOf('title_service_ar') > -1 || key.indexOf('title_service_en') > -1 ||
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
                            //prop service
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