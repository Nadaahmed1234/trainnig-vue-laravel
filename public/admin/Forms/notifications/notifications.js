$(document).ready(function() {

    $('.read_go_notify').on('click',function () {
        var link=$(this).data('link');

        axios.get(apiDashboardURL + 'read-notify/'+$(this).data('notify-id'), {
            params: {

            }
        })
            .then(function(response) {
                if (response.data.count_notify_unread>0){
                    $('.notify-unread').text(response.data.count_notify_unread);
                }else{
                    $('.notify-unread').remove();
                }
                window.location.href=link;
            })
            .catch(function(error) {
                onFormErrors(form);
            });


    });


    $('.remove-notify').on('click',function () {
        $(this).parent().parent().remove();

        axios.delete(apiDashboardURL + 'remove-notify/'+$(this).data('notify-id'), {
            params: {

            }
        })
            .then(function(response) {
                if (response.data.count_notify_unread>0){
                    $('.notify-unread').text(response.data.count_notify_unread);
                }else{
                    $('.notify-unread').remove();
                }
            })
            .catch(function(error) {
                onFormErrors(form);
            });


    });
});