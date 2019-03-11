function displayError() {
    $('#errors').html('An error has occured!');
}

function searchRepositories() {
    let searchTerms = $('#searchTerms').val();
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function (data) {
        $('#results').html(displayRepositories(data));
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

function displayRepositories() {
    return data.items.map(function (resultat) {
        let search =
            `<div>
                 <h2><a href="${resultat.html_url}">${resultat.name}</a></h2>
                 <img src="${resultat.owner.avatar_url}"><br>
                 <a href="#" data-repository="${resultat.name}" data-owner="${resultat.owner.login}" onclick="showCommits(this)">Show Commits</a><br>
                 <p>Score: ${resultat.score}</p>
             </div>`;
        return search;
    });
}

function displayCommits(data) {
    let resultat = data.map(function (commit) {
        return `<li>${commit.sha}<br>${commit.commit.message}</li>`;
    }).join('');
    return `<ul>${resultat}</ul>`;
}
