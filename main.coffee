baiduWebMain = ()->
  wrapSel = 'span.s_btn_wr'
  iconSrc = chrome.extension.getURL('icons/baidu48.png')
  btnTemplate = "<img class='SEI_web_search' data_site='site' src=\"#{iconSrc}\" alt=\"baidu\">"
  $(wrapSel).empty()
  $(wrapSel).append(btnTemplate)

  $('.SEI_web_search').click  ()->
    inputText = $("input[name='wd']").val()
    window.location.href = "http://www.baidu.com/s?wd=" + inputText;

urlHandlers = {
  '.*www.baidu.com\/s?': baiduWebMain
}

main = ()->
  for m, handler of urlHandlers
    if location.href.match m
      handler.call(this)
  return

main()
