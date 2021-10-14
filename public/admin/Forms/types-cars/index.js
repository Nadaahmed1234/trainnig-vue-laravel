$(document).ready(function() {

    var table = $('#types-cars-table');
    var delete_form = $('#delete-type-car-form');
    var delete_msg = delete_form.find('.delete-msg');

    let currentRow = null,
        title = null;


    function deleteBtnClick() {
        var delete_btn = table.find('.table-action-delete');
        delete_btn.on('click', function() {
            currentRow = $(this).closest('tr');
            rowData = (table.DataTable().row(currentRow).data());
            title = rowData[1];
            delete_msg.html(title);
            setTimeout(function() {
                $('#delete-type-car').modal('toggle');
            }, 200);
        });
    }


    table.on('draw.dt', function() {
        deleteBtnClick();

    })
        .on('order.dt', function() {
            deleteBtnClick();

        })
        .on('search.dt', function() {
            deleteBtnClick();

        })
        .on('page.dt', function() {
            deleteBtnClick();

        })
        .on('responsive-resize.dt', function() {
            deleteBtnClick();

        })
        .on('responsive-display.dt', function() {
            deleteBtnClick();

        })
        .on('length.dt', function() {
            deleteBtnClick();

        }).dataTable();
    deleteBtnClick();


    delete_form.submit(function(e) {
        let id = currentRow.attr('data-id');
        e.preventDefault();
        onFormSubmit(delete_form);
        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'DELETE',
            url: apiDashboardURL + 'types-cars/' + id,
            responseType: 'json'
        })

            .then(function(response) {
                removeRow(table, currentRow);
                onFormDeletionSuccess(delete_form);
                $('#delete-type-car').modal('toggle');
                currentRow = null;
            })
            .catch(function(error) {
                onFormErrors(delete_form);
                if (error.response.status === 422) {
                    showError(delete_form, error.response.data.error);
                } else if (error.response.status !== 422) {
                    onFormFailure(delete_form);
                }
            });
    });


});