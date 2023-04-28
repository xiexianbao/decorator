test("html attr pattern", () => {
  const attrPattern = /^[a-zA-Z]="[a-zA-Z]"(\s+[a-zA-Z]="[a-zA-Z]")*$/

  expect(attrPattern.test('a="b"')).toBeTruthy()
  expect(attrPattern.test('a="b"  c="d"')).toBeTruthy()
  expect(attrPattern.test('a="b"a')).toBeFalsy()
})

test("html open tag", () => {
  const openTagPattern = /<\w+(\s+\w+="\w+")*>/i

  expect(openTagPattern.test("aaa")).toBeFalsy()
  expect(openTagPattern.test("<")).toBeFalsy()
  expect(openTagPattern.test(">")).toBeFalsy()
  expect(openTagPattern.test("<p>")).toBeTruthy()
  expect(openTagPattern.test('<p id="title">')).toBeTruthy()
  expect(openTagPattern.test('<p id="title" class="title">')).toBeTruthy()
})

test("html close tag", () => {
  const closeTagPattern = /<\/\w+>/i
  expect(closeTagPattern.test("<")).toBeFalsy()
  expect(closeTagPattern.test(">")).toBeFalsy()
  expect(closeTagPattern.test("<>")).toBeFalsy()
  expect(closeTagPattern.test("</>")).toBeFalsy()
  expect(closeTagPattern.test("</ >")).toBeFalsy()
  expect(closeTagPattern.test("</p>")).toBeTruthy()
})

test("escape html tag", () => {
  const escapePattern = /[^</>]/i
  expect(escapePattern.test("<")).toBeFalsy()
  expect(escapePattern.test(">")).toBeFalsy()
  expect(escapePattern.test("/")).toBeFalsy()
  expect(escapePattern.test(" ")).toBeTruthy()
  expect(escapePattern.test(" a")).toBeTruthy()
  expect(escapePattern.test("a")).toBeTruthy()
})

test("html open & close tag", () => {
  const tagPattern = /<\w+(\s+\w+="\w+")*>[^<>\/]*<\/\w+>/i
  expect(tagPattern.test('<p></p>')).toBeTruthy()
  expect(tagPattern.test('<p id="title" class="title"></p>')).toBeTruthy()
  expect(tagPattern.test('<p id="title" class="title">content</p>')).toBeTruthy()
})

test("html self close tag", () => {})