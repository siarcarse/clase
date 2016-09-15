$(document).ready(function() {
    $('#button').click(function(event) {
        $.ajax({
            url: '/api/users',
            type: 'GET'
        })
        .done(function(data) {
            console.log( data[0].name );
        });
    });
});