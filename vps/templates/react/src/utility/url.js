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

// TODO https://stackoverflow.com/a/2091331/10401826
export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
}

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}