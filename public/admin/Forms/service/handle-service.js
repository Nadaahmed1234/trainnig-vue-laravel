$(document).ready(function() {



// //repeat
    $(function () {
//         'use strict';
//
//         // form repeater jquery
        $(' .repeater').repeater({
            // (Optional)
            // start with an empty list of repeaters. Set your first (and only)
            // "data-repeater-item" with style="display:none;" and pass the
            // following configuration flag
            initEmpty: false,

            show: function () {
                $(this).slideDown();

                //service type
                $('.title_service_ar').each(function (i) {

                    $(this).attr('id', 'title_service_ar_' + i)

                });

                $('.title_service_ar:last').removeClass('first_title_service_ar');

                $('.title_service_en').each(function (i) {

                    $(this).attr('id', 'title_service_en_' + i)

                });

                $('.title_service_en:last').removeClass('first_title_service_en')   ;

                $('.price_type_service').each(function (i) {

                    $(this).attr('id', 'price_type_service_' + i)

                });

                $('.price_type_service:last').removeClass('first_price_type_service')
                //end


                //service prop
                $('.desc_en').each(function (i) {

                    $(this).attr('id', 'desc_en_' + i)

                });

                $('#service_prop').val(1);

                $('#service_prop').next().hide();
                $('#service_prop').next().find('span').html('');

                $('.desc_en:last').removeClass('first_desc_en_prop')

                $('.desc_ar').each(function (i) {
                    $(this).attr('id', 'desc_ar_' + i)
                });

                $('.desc_ar:last').removeClass('first_desc_ar_prop')


                $('.images').each(function (i) {
                    $(this).attr('id', 'image_prop_' + i)
                });

                $('.images:last').removeClass('first_images_prop')
              //end service prop

                //put id prev button and plus 1
                var first_id = $(this).prev().find('.delete-property').attr('id');
                var prev_id = '';
                if (first_id != undefined) {
                    prev_id += first_id;
                } else {
                    prev_id += $(this).find('.delete-property').attr('id');
                }

                if(prev_id !='undefined'){
                    var num_id = parseInt(prev_id.match(/\d+/)[0]) + 1;

                    $(this).find('.delete-property').attr('id', 'delete-property-' + num_id);
                }



                //put id prev service type button and plus 1
                var first_type_service_id = $(this).prev().find('.delete-service-type').attr('id');
                var prev_type_service_id = '';
                if (first_type_service_id != undefined) {
                    prev_type_service_id += first_type_service_id;
                } else {
                    prev_type_service_id += $(this).find('.delete-service-type').attr('id');
                }

                if(prev_type_service_id !='undefined'){
                    var num_service_type_id = parseInt(prev_type_service_id.match(/\d+/)[0]) + 1;

                    $(this).find('.delete-service-type').attr('id', 'delete-service-type-' + num_service_type_id);
                }



            },
            hide: function () {

            }

            ,
            // (Optional)
            // You can use this if you need to manually re-index the list
            // for example if you are using a drag and drop library to reorder
            // list items.
            ready: function (setIndexes) {
        },
        // (Optional)
        // Removes the delete button from the first list item,
        // defaults to false.
        isFirstItemUndeletable: true
        });
    });
// //end repeat






//start
//fill data delete model and open it
    $(document).on('click', '.delete-property', function () {

        var desc_ar = $(this).closest(".row").find('.desc_ar').val();
        if (desc_ar == undefined) {
            desc_ar = '';
            desc_ar += $(this).closest(".row").find('.edit_desc_ar').val();
        }
        $('#desc-show-ar').text(desc_ar);

        var desc_en = $(this).closest(".row").find('.desc_en').val();
        if (desc_en == undefined) {
            desc_en = '';
            desc_en += $(this).closest(".row").find('.edit_desc_en').val();
        }
        $('#desc-show-en').text(desc_en);

        var img_prop = $(this).closest(".row").find('.images').parent().prev().attr('src');

        if (img_prop == undefined) {
            img_prop = '';
            img_prop += $(this).closest(".row").find('.image-prop').attr('src');
        }
        $('#show-img').attr('src', img_prop);




        $('#div-repeat-prop-service').val($(this).attr('id'));

        var service_id = $(this).data('service-id');
        $('#service_id').val(service_id);

        $('#delete-property').modal('toggle');


    });

//end
//
//
// fill data delete service type model and open it
    $(document).on('click', '.delete-service-type', function () {
        var title_service_type_ar = $(this).closest(".row").find('.title_service_ar').val();
        if (title_service_type_ar == undefined) {
            title_service_type_ar = '';
            title_service_type_ar += $(this).closest(".row").find('.edit_title_service_ar').val();
        }
        $('#title-service-type-show-ar').text(title_service_type_ar);

        var title_service_type_en = $(this).closest(".row").find('.title_service_en').val();
        if (title_service_type_en == undefined) {
            title_service_type_en = '';
            title_service_type_en += $(this).closest(".row").find('.edit_title_service_en').val();
        }
        $('#title-service-type-show-en').text(title_service_type_en);

        var show_price_service_type = $(this).closest(".row").find('.price_type_service').val();
        if (show_price_service_type == undefined) {
            show_price_service_type = '';
            show_price_service_type += $(this).closest(".row").find('.edit_price_type_service').val();
        }
        $('#show-price-service-type').text(show_price_service_type);


        $('#div-repeat-service-type').val($(this).attr('id'));

        var service_type_id = $(this).data('service-type-id');
        $('#service_type_id').val(service_type_id);

        $('#delete-service-type').modal('toggle');


    });

//end

    function submit_deleted() {

        var div_repeat_property = $('#div-repeat-prop-service').val();
        $('#' + div_repeat_property).closest('.div-repeat').slideUp();
        $('#' + div_repeat_property).closest('.div-repeat').remove();
        $('#delete-property').modal('toggle');
        if (($('.edit_desc_ar').val()==undefined&&$("input").hasClass("first_desc_en_prop"))|| $('.desc_ar').val()==undefined){
            $('#service_prop').val('');

        }
    }

//submit delete property
    $('#del-property-form').on('submit', function (e) {
        e.preventDefault();
        var id = $('#service_id').val();
        if (id != undefined&&id !='') {
            axios({
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                method: 'DELETE',
                url: apiDashboardURL + 'del-property-service/' + id,
                responseType: 'json'
            })
                .then(function (response) {
                    toastr['success'](response.data.success, 'Success!', {
                        closeButton: true,
                        tapToDismiss: false,
                    });
                    submit_deleted()

                })
                .catch(function (error) {

                });
        } else {
            submit_deleted()
        }

    });

//end submit delete property



 function submit_deleted_service_type() {

        var div_repeat_service_type = $('#div-repeat-service-type').val();
        $('#' + div_repeat_service_type).closest('.div-repeat-service-type').slideUp();
        $('#' + div_repeat_service_type).closest('.div-repeat-service-type').remove();
        $('#delete-service-type').modal('toggle');
    }

//submit delete service type
    $('#del-service-type-form').on('submit', function (e) {
        e.preventDefault();
        var id = $('#service_type_id').val();
        if (id != undefined&&id !='') {
            axios({
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                method: 'DELETE',
                url: apiDashboardURL + 'del-service-type/' + id,
                responseType: 'json'
            })
                .then(function (response) {
                    toastr['success'](response.data.success, 'Success!', {
                        closeButton: true,
                        tapToDismiss: false,
                    });
                    submit_deleted_service_type()

                })
                .catch(function (error) {

                });
        } else {
            submit_deleted_service_type()
        }

    });

//end submit delete property

    $('#add_new').on('click', function () {
        if ($('.div_show_property').css('display') == 'none') {
            $('.div_show_property').css('display', '');
            document.getElementsByClassName('div_show_property')[0].innerHTML = '';
        }


        if ($('.div_show_service_type').css('display') == 'none') {
            $('.div_show_service_type').css('display', '');
            document.getElementsByClassName('div_show_service_type')[0].innerHTML = '';
        }

    });


});