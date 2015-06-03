parseURL = (url)->
  if url
    parser = document.createElement('a')
    parser.href = url
  else
    parser = location

  searchObject = {}
  queries = parser.search.replace(/^\?/, '').split('&')
  for item in queries
    split = item.split('=')
    searchObject[split[0]] = split[1]

  return {
    origin: parser.origin
    protocol: parser.protocol
    host: parser.host
    hostname: parser.hostname
    port: parser.port
    pathname: parser.pathname
    search: parser.search
    searchObject: searchObject
    hash: parser.hash
  }

genURL = (url, pathname, searchObject)->
  obj = parseURL(url)
  if obj.pathname == pathname
    searchObject = $.extend {}, obj.searchObject or {}, searchObject or {}

  search = "?"
  for k, v of searchObject
    ser = "#{k}=#{v or ''}"
    search += ser + '&'
  search = search.replace(/[\?&]$/, '')
  return "#{obj.origin}/#{obj.pathname}#{search}"

bindSiteBtn = (wrapNode, engine, onclick)->
  site = engine.split('_')[0]
  iconSrc = chrome.extension.getURL("icons/#{site}48.png")
  btnTemplate = "<img class='SEI_web_search' data_site='#{site}' title='#{site}' src=\"#{iconSrc}\" alt=\"#{site}\">"
  wrapNode.append(btnTemplate)
  # wrapNode.children().last().click onclick
  $("img.SEI_web_search[data_site='#{site}']").click onclick


handleBaidu = (engines)->
  wrapSel = 'span.s_btn_wr, span.bdv-search-btns, span.input_span'
  $(wrapSel).hide()
  genClickFunc = (engine)->
    return ()->
      inputText = $("input[name='wd'], input[name='word']").val()
      window.location.href = searchUrlMapping[engine] + inputText

  for engine in engines
    bindSiteBtn $(wrapSel).parent(), engine, genClickFunc(engine)

handleGoogle = (engines)->


urlHandlers = {
  '.*www.baidu.com\/s?': ()->handleBaidu(['baidu', 'google'])
  '.*news.baidu.com\/': ()->handleBaidu(['baidu_news', 'google_news'])
  '.*image.baidu.com\/': ()->handleBaidu(['baidu_image', 'google_image'])
  '.*v(ideo)?.baidu.com\/': ()->handleBaidu(['baidu_video', 'google_video'])
  '.*map.baidu.com\/': ()->handleBaidu(['baidu_map', 'google_map'])
}

searchUrlMapping = {
  'baidu': "http://www.baidu.com/s?wd="
  'baidu_news': "http://news.baidu.com/ns?word="
  'google': "https://www.google.com/search?q="
  'google_news': 'https://www.google.com/search?tbm=nws&q='
  'baidu_image': 'http://image.baidu.com/i?word='
  'google_image': 'https://www.google.com/search?tbm=isch&q='
  'baidu_video': 'http://v.baidu.com/v?word='
  'google_video': 'https://www.google.com/search?tbm=vid&q='
  'baidu_map': 'http://map.baidu.com/m?word='
  'google_map': 'https://maps.google.com/maps?q='
}

main = ()->
  for m, handler of urlHandlers
    if location.href.match m
      handler.call(this)
  return

main()
