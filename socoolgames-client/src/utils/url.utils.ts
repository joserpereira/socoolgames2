const formatUrl = (url: string) =>  {
  console.log("url", url, process.env.NODE_ENV)
  if (url && url.startsWith("./public")) {
    //TODO: review in production
    if (process.env.NODE_ENV === 'development')
      url = url.replaceAll('./public/', "http://" + window.location.hostname + ":3000/")
    else 
      url = url.replaceAll('./public/', "/")
  }
  console.log("url2", url)
  return url;
}

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function addUTMParams(url, source = "linksdigest.com", medium = "ugc", utm_campaign = "community_links") {
  if (url.indexOf("?") >= 0) {
    url += "&"
  } else  {
    url += "?"
  }

  url += `utm_source=${source}&utm_medium=${medium}&utm_campaign=${utm_campaign}`;
  return url;
}

export { formatUrl, isValidHttpUrl, addUTMParams };