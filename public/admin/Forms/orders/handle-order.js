$(document).ready(function() {

    $('.flatpickr-basic').on('change',function () {
        axios({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            method: 'POST',
            url: apiDashboardURL + 'times',
            responseType: 'json',
            data: {'date':$(this).val()}
        })
            .then(function(response) {

                onFormSuccess(form, true);
            })
            .catch(function(error) {
                onFormErrors(form);
                if (error.response.status === 422) {



                } else if (error.response.status !== 422) {
                    onFormFailure(form);
                }
            });
       console.log($(this).val())
    });
});