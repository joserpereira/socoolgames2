const formatUrl = (url: string) =>  {
  if (url) {

    if (url.startsWith("./public")) {
      //TODO: review in production
      if (import.meta.env.MODE === 'development')
        url = url.replaceAll('./public/', "http://" + window.location.hostname + ":"+ import.meta.env.VUE_APP_API_PORT + "/")
      else 
        url = url.replaceAll('./public/', "/")
    }
    else if (url.startsWith("/uploads") && (import.meta.env.MODE === 'development')) {
      console.log("formatUrl", url) 
        url = import.meta.env.VITE_APP_API_URL + url;
    }
  }
  console.log(url, import.meta.env.MODE);
  return url;
}

function isValidHttpUrl(string: string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function addUTMParams(url: string, source = "linksdigest.com", medium = "ugc", utm_campaign = "community_links") {
  if (url.indexOf("?") >= 0) {
    url += "&"
  } else  {
    url += "?"
  }

  url += `utm_source=${source}&utm_medium=${medium}&utm_campaign=${utm_campaign}`;
  return url;
}

export { formatUrl, isValidHttpUrl, addUTMParams };