const filters = {
    searchText: '',
    hideCompleted: false
}

const getFilters = () => filters


const setFilters = ({searchText, hideCompleted}) => {
    if (typeof searchText === 'string') {
        filters.searchText = updates.searchText
    }
    if (typeof hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted
    }
}


// Make sure to set up the exports
export { getFilters, setFilters }