import jester, asyncdispatch, htmlgen, strutils, json

proc get_noises(caw_count : int) : seq[string] =
  var noises : seq[string] = newSeq[string](caw_count)
  for i in 0..(caw_count - 1):
    noises[i] = "caw"
  return noises

routes:
  get "/caw/@caw_count":
    var caw_count : int = parseInt(@"caw_count")
    var noises : seq[string] = get_noises(caw_count)
    let json = %*{
      "noises": noises
    }
    resp "$#".format(json)

runForever()
