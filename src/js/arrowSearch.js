const arrowSearch = document.getElementById('arrow-search');
const containerHeader = document.getElementById('container-header');
const filterForm = document.getElementById('filterForm');
const filterCategory = document.getElementById('filterCategory-container');
const titleMain = document.getElementById('title-container');

arrowSearch.addEventListener('click', function () {
    containerHeader.classList.toggle('expanded');
    filterForm.classList.toggle('show-filter');
    filterForm.classList.toggle('filter-form');

    filterCategory.classList.toggle('hide-filter');
    arrowSearch.classList.toggle('arrow180');
    titleMain.classList.toggle('top12px');
});
