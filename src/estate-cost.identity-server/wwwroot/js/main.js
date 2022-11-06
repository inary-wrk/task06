
$(document).ready(function () {

    $('.show-password-button').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).siblings('input').attr('type', 'text');
        } else {
            $(this).siblings('input').attr('type', 'password');
        }
    });

});
