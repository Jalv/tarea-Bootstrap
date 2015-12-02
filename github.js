/**
 * Created by Juan on 22/11/15.
 */
var API_BASE_URL = "https://api.github.com";


function validar_credenciales() {
    $.ajaxSetup({
        headers: { 'Authorization': "Basic "+ btoa($("#user").val() + ":" + $("#pasword").val()) }
    });
}

$("#button_get_repos").click(function(e){
    e.preventDefault();
    getRepos();
});

function getRepos() {
    var url = API_BASE_URL + '/users/' + $("#user").val() + '/repos';
    $("#res").text('');

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
    }).done(function (data, status, jqxhr) {
        var repos = data;

        $.each(repos, function (i, v) {
            var repo = v;
            $('<strong> Name: ' + repo.name + '<br>').appendTo($('#res'));
            $('<strong> Creation Date: </strong> ' + repo.creationdate + '<br>').appendTo($('#res'));
            $('<strong> URL: </strong> ' + repo.url + '<br>').appendTo($('#res'));
            $('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#res'));
            $('<strong> Size: </strong> ' + repo.size + '<br><br><br>').appendTo($('#res'));
        });
    }).fail(function() {
        $("#res").text("No repositories.");
    });
}

/*-------------------------------------------------------------------------------------------------------------*/

$("#button_get_repo").click(function(e){
    e.preventDefault();
    getRepo();
});

function getRepo() {
    var url = API_BASE_URL + '/repos/' + $("#user").val() + '/' + $("#repo").val();
    $("#res").text('');

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
    }).done(function (data, status, jqxhr) {
        var repo = data;
        $('<strong> Name: ' + repo.name + '<br>').appendTo($('#res'));
        $('<strong> Creation Date: </strong> ' + repo.creationdate + '<br>').appendTo($('#res'));
        $('<strong> URL: </strong> ' + repo.url + '<br>').appendTo($('#res'));
        $('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#res'));
        $('<strong> Size: </strong> ' + repo.size + '<br>').appendTo($('#res'));
    }).fail(function () {
        $("#res").text("No repositories.");
    });
}

/*-------------------------------------------------------------------------------------------------------------*/

$("#button_post").click(function(e){
    e.preventDefault();
    validar_credenciales();
    var repo = new Object();
    repo.name = $("#name").val();
    repo.description = $("#description").val();
    repo.homepage = "https://github.com";
    repo.private = false;
    repo.has_issues = true;
    repo.has_wiki = true;
    repo.has_downloads = true;
    postRepo(repo);
});

function postRepo(repo){
    var url = API_BASE_URL + '/user/repos';
    var data = JSON.stringify(repo);

    $("#res").text('');
    $.ajax({
        url : url,
        type : 'POST',
        crossDomain : true,
        dataType : 'json',
        data : data,
    }).done(function() {
        $('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($('#res'));
    }).fail(function() {
        $('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($('#res'));
    });
}

/*-------------------------------------------------------------------------------------------------------------*/

$("#button_delete").click(function(e){
    e.preventDefault();
    validar_credenciales();
    deleteRepo();
});

function deleteRepo(){
	var url = API_BASE_URL + '/repos/' + $("#user").val() + '/' + $("#repo").val();
	$("#res").text('');

	$.ajax({
        url: url,
        type: 'DELETE',
        crossDomain: true,
        dataType: 'json',
    }).done(function (data, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Ok!</strong> Repository Deleted</div>').appendTo($('#res'));
        
    }).fail(function () {
        $('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($('#res'));
    });
}

/*-------------------------------------------------------------------------------------------------------------*/

$("#button_update").click(function(e){
    e.preventDefault();
    validar_credenciales();
    var repo = new Object();
    repo.name = $("#name_m").val();
    repo.description = $("#description_m").val();
    repo.homepage = "https://github.com";
    repo.private = false;
    repo.has_issues = true;
    repo.has_wiki = true;
    repo.has_downloads = true;

    updateRepo(repo);
});

function updateRepo(repo) {
    var url = API_BASE_URL + '/repos/' + $("#user").val() + '/' + $("#name_a").val();
    var data = JSON.stringify(repo);

    $("#res").text('');
    $.ajax({
        url: url,
        type: 'PATCH',
        crossDomain: true,
        dataType: 'json',
        data: data,
    }).done(function (data, status, jqxhr) {
        var repo = data;
        $('<strong> DATOS ACTUALIZADOS: <br>').appendTo($('#res'));
        $('<strong> Name: ' + repo.name + '<br>').appendTo($('#res'));
        $('<strong> Creation Date: </strong> ' + repo.creationdate + '<br>').appendTo($('#res'));
        $('<strong> URL: </strong> ' + repo.url + '<br>').appendTo($('#res'));
        $('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#res'));
        $('<strong> Size: </strong> ' + repo.size + '<br>').appendTo($('#res'));
    }).fail(function () {
        $("#res").text("Error NO ACTUALIZADO!");
    });
}

/*-------------------------------------------------------------------------------------------------------------*/