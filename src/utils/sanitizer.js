function sanitizer(content) {
  let result = content.replaceAll('"', "");
  result = result.replaceAll("\n", "");
  result = result.replaceAll(" ", "");
  return result;
}

module.exports = { sanitizer };
