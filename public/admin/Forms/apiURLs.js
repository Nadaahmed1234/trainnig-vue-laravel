/* -------------------------------------------------------------------------------
 * --------------------------------- API URL -------------------------------------
 * ------------------------------------------------------------------------------- */
// const apiDashboardURL = window.location.protocol + '//' + window.location.hostname + '/' + $('html').attr('lang') + '/dashboard/';
// const apiWebsiteURL = window.location.protocol + '//' + window.location.hostname + '/' + $('html').attr('lang') + '/';


 const apiWebsiteURL = 'http://127.0.0.1:8000/';

 const apiDashboardURL = 'http://127.0.0.1:8000/admin/';



$(document).ready(function() {

    $('.langauge-switcher').on('click', function(e) {
        var languageToSwitchTo = $(this).attr('switchToLang');
        var pathnameArray = document.location.href.split('/');
        var newPathNameURL = "/" + languageToSwitchTo + "";
        for (i = 4; i < pathnameArray.length; i++) {
            newPathNameURL += "/";
            newPathNameURL += pathnameArray[i];
        }
        document.location.href = newPathNameURL;
    });
});