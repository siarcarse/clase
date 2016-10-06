$(document).ready(function() {
    $('#button').click(function(event) {
        $.ajax({
                url: '/api/users',
                type: 'GET'
            })
            .done(function(data) {
                console.log(data[0].name);
            });
    });
    $('#save').click(function(event) {
        var username = $('#username').val();
        var name = $('#name').val();
        var lastname = $('#lastname').val();
        var birthdate = $('#birthdate').val();
        var role = $('#role').val();
        var password = $('#password').val();
        var mail = $('#mail').val();
        var phone = $('#phone').val();
        console.log(username, name, lastname, birthdate, role, password, mail, phone);
        $.ajax({
                url: '/api/users',
                type: 'POST',
                dataType: 'json',
                data: { username, name, lastname, birthdate, role, password, mail, phone },
            })
            .done(function(response) {
                console.log(response);
            })
            .fail(function(err) {
                console.log(err);
            })
            .always(function(alw) {
                console.log(alw);
            })

    });
});
