function beginAnimition() {
  uexWindow.beginAnimition()
}

function setAnimitionDelay(i) {
  uexWindow.setAnimitionDelay(i)
}

function setAnimitionDuration(i) {
  uexWindow.setAnimitionDuration(i)
}

function setAnimitionCurve(i) {
  uexWindow.setAnimitionCurve(i)
}

function setAnimitionRepeatCount(i) {
  uexWindow.setAnimitionRepeatCount(i)
}

function setAnimitionAutoReverse(i) {
  uexWindow.setAnimitionAutoReverse(i)
}

function makeTranslation(i, n, t) {
  uexWindow.makeTranslation(i, n, t)
}

function makeScale(i, n, t) {
  uexWindow.makeScale(i, n, t)
}

function makeRotate(i, n, t, o) {
  uexWindow.makeRotate(i, n, t, o)
}

function makeAlpha(i) {
  uexWindow.makeAlpha(i)
}

function commitAnimition() {
  uexWindow.commitAnimition()
}

function test() {
  beginAnimition(), setAnimitionDuration(260), makeTranslation(100, 0, 0), commitAnimition()
}