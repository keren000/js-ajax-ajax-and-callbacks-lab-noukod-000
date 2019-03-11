function displayError() {

    $('#errors').html('An error has occured!');

}



function searchRepositories() {

    // The val() method returns or sets the value attribute of the selected elements

    let searchTerms = $('#searchTerms').val();



    // The $.get() method loads data from the server using a HTTP GET request

    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function (data) {

        // The html() method sets or returns the content (innerHTML) of the selected elements

        $('#results').html(displayRepositories(data));

        // The fail() method accepts one or more arguments, all of which can be either a single function or an array of functions

    }).fail(function error() {

        displayError();

    });

}



function showCommits(element) {

    $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, function (data) {

        $('#details').html(displayCommits(data));

    }).fail(function (error) {

        displayError();

    });

}



function displayRepositories(data) {

    return data.items.map(function (result) {

        let search =

            `<div>

                 <h2><a href="${result.html_url}">${result.name}</a></h2>

                 <img src="${result.owner.avatar_url}"><br>

                 <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a><br>

                 <p>Score: ${result.score}</p>

             </div>`;

        return search;

    });

}



function displayCommits(data) {

    let result = data.map(function (commit) {

        return `<li>${commit.sha}<br>${commit.commit.message}</li>`;

    }).join('');

    return `<ul>${result}</ul>`;

}