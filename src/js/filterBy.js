let categoryId = document.querySelector('#categoryFilterByMagnifier'),
    searchTerm = document.querySelector('#userSearch');

document.getElementById('submitButton').addEventListener('click', function() {
    categoryId = categoryId.value;
    searchTerm = searchTerm.value;
    
    const protocol = window.location.protocol;
    const host = window.location.host;

    let redirectURL = `${protocol}//${host}`;
    let endUrl = ''
    if(searchTerm == '' && categoryId != ''){
        endUrl = `category/${categoryId}`
    } else {
        endUrl = `searchEngine?categoryId=${categoryId}&searchTerm=${searchTerm}`
    }

    redirectURL = `${redirectURL}/${endUrl}`;
    
    window.location.href = redirectURL;
});