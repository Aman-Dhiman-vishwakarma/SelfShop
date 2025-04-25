export function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  var stringarr = [];
  for (var i = 0; i < splitStr.length; i++) {
    stringarr.push(splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1));
  }

  return stringarr.join(" ");
}

export function skuGaneretor(tp, se, th) {
  var newString = tp + " " + se + " " + th;
  var splitStr = newString.toUpperCase().split(" ");
  var stringarr = [];
  for (var i = 0; i < splitStr.length; i++) {
    stringarr.push(
      splitStr[i].charAt(0) + splitStr[i].charAt(1) + splitStr[i].charAt(2)
    );
  }

  return stringarr.join("-");
}
