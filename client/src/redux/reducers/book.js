const books = (
    state = {
      loading: false,
      books: [],
    },
    action
  ) => {
    switch (action.type) {
      case "FETCH_BOOKS_REQUEST":
        return { ...state, loading: true };
      case "FETCH_BOOKS_SUCCESS":
        return {
          loading: false,
          books: action.books,
        };
      case "FETCH_BOOKS_FAILURE":
        return {
          loading: false,
          books: [],
        };
      default:
        return state;
    }
  };
  
  export default books;
  
  export const getBooks = state => state.books;
  