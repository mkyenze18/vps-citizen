// TODO https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
export function updateQueryStringParameter(uri, key, value) {
    // var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    // var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    // if (uri.match(re)) {
    //   return uri.replace(re, '$1' + key + "=" + value + '$2');
    // }
    // else {
    //   return uri + separator + key + "=" + value;
    // }

    // if ('URLSearchParams' in window) {
    //   var searchParams = new URLSearchParams(window.location.search);
    //   searchParams.set("foo", "bar");
    //   window.location.search = searchParams.toString();
    // }

    var searchParams = new URLSearchParams(uri);
    searchParams.set(key, value);
    return searchParams.toString();
  }