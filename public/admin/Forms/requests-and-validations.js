/* ------------------------------------------------------------------------
 * ----------------- HIDE ALL ERRORS & SUCCESS MESSAGES -------------------
 * ------------------------------------------------------------------------ */
$('.alert.alert-danger, .processing-div, .success-div, .error-div').hide();

/* ------------------------------------------------------------------------
 * ----------------------- ON FORM SUBMIT FUNCTION ------------------------
 * ------------------------------------------------------------------------ */
function onFormSubmit(form) {
    form.find('button[type="submit"]').prop('disabled', true);
    form.find('.alert.alert-danger, .success-div, .error-div').hide();
    form.find('.processing-div').show();
    $('.tab-panes ul li i').removeClass('show-tab-error');
}

/* ------------------------------------------------------------------------
 * ------------------ ON FORM REQUEST SUCCESS FUNCTION --------------------
 * ------------------------------------------------------------------------ */
function onFormSuccess(form, resetform = false) {
    form.find('.processing-div').hide();
    form.find('.success-div').show();
    form.find('button[type="submit"]').prop('disabled', false);
    if (resetform !== false) {

        form[0].reset();
        if ($('input.upload-img')) {
            $('input.upload-img').next().html('');
            // $('input.custom-file-input').parent().prev().attr('src', window.location.protocol + '//' + window.location.hostname + '/dashboard/images/img-upload-placeholder.jpg');
            $('input.upload-img').parent().prev().attr('src', 'http://127.0.0.1:8000/admin/images/img-upload-placeholder.jpg');
            // $('input.custom-file-input').parent().prev().attr('src', 'http://127.0.0.1:8000/dashboard/images/img-upload-placeholder.jpg');
        }
    }
    setTimeout(function() {
        form.find('.success-div').fadeOut();
    }, 5000);
}

/* ------------------------------------------------------------------------
 * ------------------- FORM FILE IMPORT RESET FUNCTION --------------------
 * ------------------------------------------------------------------------ */
function resetFormFileImport(form) {
    form[0].reset();
    if ($('input.custom-file-input')) {
        $('input.custom-file-input').next().html('');
        $('input.custom-file-input').parent().prev().attr('src', window.location.protocol + '//' + window.location.hostname + '/dashboard/images/img-upload-placeholder.jpg');
    }


}

$(document).on('change', '.upload-img', function () {

    if (this.files && this.files[0]) {
        $(this).parent().prev().attr('src', window.URL.createObjectURL(this.files[0]));
    }else if(this.files[0]==undefined){
        $(this).parent().prev().attr('src',  'http://127.0.0.1:8000/admin/images/img-upload-placeholder.jpg');

    }

});

/* ------------------------------------------------------------------------
 * ----------------------- CKEDITOR RESET FUNCTION ------------------------
 * ------------------------------------------------------------------------ */
function resetCKEdtior(instances) {
    for (i = 0; i < instances.length; i++) {
        instances[i].setData('', function() {
            this.updateElement();
        });
    }
}

/* ------------------------------------------------------------------------
 * ----------------------- CHECKBOX RESET FUNCTION ------------------------
 * ------------------------------------------------------------------------ */
function resetCheckbox(field, value, hasExpandable = false, expandableState = false) {
    if (value === true) {
        field.prop('checked') === true;
        checkForExpandable(hasExpandable, expandableState);
        field.parent().addClass('on');
        field.prop('checked') === true;
    } else if (value === false) {
        field.prop('checked') === false;
        checkForExpandable(hasExpandable, expandableState);
        field.parent().removeClass('on');
        field.prop('checked') === false;
    }

    function checkForExpandable(expandableArea, expandableValue) {
        if (expandableArea) {
            if (expandableValue === true) {
                expandableArea.addClass('show_area');
            } else if (expandableValue === false) {
                expandableArea.removeClass('show_area');
            }
        }
    }
}

/* ------------------------------------------------------------------------
 * ------------------ ON FORM DELETION SUCCESS FUNCTION -------------------
 * ------------------------------------------------------------------------ */
function onFormDeletionSuccess(form) {
    form.find('.processing-div').hide();
    form.find('button[type="submit"]').prop('disabled', false);
}

/* ------------------------------------------------------------------------
 * ------------------- ON FORM REQUEST ERRORS FUNCTION --------------------
 * ------------------------------------------------------------------------ */
function onFormErrors(form) {
    form.find('.processing-div').hide();
    form.find('button[type="submit"]').prop('disabled', false);
    $('.import-from-excel-upload-field').show();
}

/* ------------------------------------------------------------------------
 * ------------------ ON FORM REQUEST FAILURE FUNCTION --------------------
 * ------------------------------------------------------------------------ */
function onFormFailure(form) {
    form.find('.error-div, .error-div .alert-danger').show();
    form.find('button[type="submit"]').prop('disabled', false);
    $('.import-from-excel-upload-field').show();
    setTimeout(function() {
        form.find('.error-div, .error-div .alert-danger').fadeOut();
    }, 5000);
}

/* ------------------------------------------------------------------------
 * ------------------------ REINITALIZE SELECT2 ---------------------------
 * ------------------------------------------------------------------------ */
function select2Init(field, options, destroySelect2 = false) {
    if (destroySelect2 !== false) {
        field.select2("destroy");
    }
    field.select2(options);
}

function clearDuplicateSelect2Values(field) {
    var map = {};
    $(field).find('option').each(function() {
        if (map[this.value]) {
            $(this).remove()
        }
        map[this.value] = true;
    })
}

/* ------------------------------------------------------------------------
 * ------------------------ DATATABLE FUNCTIONS ---------------------------
 * ------------------------------------------------------------------------ */
function clearTable(table_id) {
    table_id.DataTable().clear().draw();
}

function removeRow(table_id, currentRow) {
    table_id.DataTable().row(currentRow).remove().draw();
}

/* ------------------------------------------------------------------------
 * ---------------------- FORM VALIDATION FUNCTIONS -----------------------
 * ------------------------------------------------------------------------ */
function showError(form, error) {
    form.find('.errors-div').find('span').html(error);
    form.find('.errors-div, .errors-div .alert-danger').show();
    setTimeout(function() {
        form.find('.errors-div').fadeOut();
    }, 5000);
}

function textFieldError(field_id, error) {
    if (error && error.length > 0) {
        field_id.next().find('span').html(error[0]);
        field_id.next().show();
        field_id.focus();
        field_id.keydown(function() {
            field_id.next().hide();
            field_id.next().find('span').html('');
        });
        showTabPaneError(field_id);
    }
}

function selectFieldError(field_id, error) {
    if (error && error.length > 0) {
        field_id.parents(".demo-inline-spacing").find('.alert').html(error[0]);
        field_id.parents(".demo-inline-spacing").find('.alert').show();
        field_id.focus();
        field_id.on('change', function() {
            field_id.parents(".demo-inline-spacing").find('.alert').hide();
            field_id.parents(".demo-inline-spacing").find('.alert').html('');
        });
        showTabPaneError(field_id);
    }
}

function fileFieldError(field_id, error) {
    if (error && error.length > 0) {
        field_id.parent().next().find('span').html(error[0]);
        field_id.parent().next().show();
        field_id.focus();
        field_id.on('change', function() {
            field_id.parent().next().hide();
            field_id.parent().next().find('span').html('');
        });
        showTabPaneError(field_id);
    }
}


function ckEditorFieldError(field_id, instance, error) {
    if (error && error.length > 0) {
        field_id.parent().next().find('span').html(error[0]);
        field_id.parent().next().show();
        instance.focus();
        window.scrollTo(0, field_id.next().offset().top - 200);
        instance.on('change', function() {
            field_id.parent().next().hide();
            field_id.parent().next().find('span').html('');
        });
        showTabPaneError(field_id);
    }
}

/* ------------------------------------------------------------------------
 * ----------------------------- FILE UPLOAD ------------------------------
 * ------------------------------------------------------------------------ */
$(document).on('change','input.custom-file-input', function() {
    if (this.files.length == 0) {
        this.nextElementSibling.innerHTML = "Choose File to Upload ...";
        this.parentElement.previousElementSibling.setAttribute('src', window.location.protocol + '//' + window.location.hostname + '/dashboard/images/img-upload-placeholder.jpg');
    } else if (this.files.length !== 0) {
        var filePath = this.value;
        var fileName = filePath.split(/(\\|\/)/g).pop();
        this.nextElementSibling.innerHTML = fileName;
        var previewImage = this.parentElement.previousElementSibling;
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            previewImage.setAttribute('src', e.target.result);
        }
        fileReader.readAsDataURL(this.files[0]);
    }
});

function ifFileFoundAppend(name, file_field, formData) {
    if (file_field.files.length !== 0) {
        return formData.append(name, file_field.files[0]);
    }
}

/* ------------------------------------------------------------------------
 * --------------------------- TAB PANE ERRORS ----------------------------
 * ------------------------------------------------------------------------ */
function showTabPaneError(field_id) {
    field_id.next().find("span").addClass('show-tab-error');
}