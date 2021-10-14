$(document).ready(function() {

    $('#type').on('change',function () {
        if($(this).val()=='delegate'){
            $('.div-start-work').css('display','');
            $('.div-end-work').css('display','');
            $('.div-duration-work').css('display','');
        }else{
            $('#duration_work').val(' ');
            $('#start_work').val(' ');
            $('#end_work').val(' ');
            $('.div-start-work').css('display','none');
            $('.div-end-work').css('display','none');
            $('.div-duration-work').css('display','none');
        }
    });
});