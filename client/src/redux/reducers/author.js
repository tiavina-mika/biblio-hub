const authors = (
    state = {
      loading: false,
      authors: [],
    },
    action
  ) => {
    switch (action.type) {
      case "FETCH_AUTHORS_REQUEST":
        return { ...state, loading: true };
      case "FETCH_AUTHORS_SUCCESS":
        return {
          loading: false,
          authors: action.authors,
        };
      case "FETCH_AUTHORS_FAILURE":
        return {
          loading: false,
          authors: [],
        };
      default:
        return state;
    }
  };
  
  export default authors;
  
  export const getAuthors = state => state.authors;
  