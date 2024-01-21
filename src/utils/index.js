export const isEmpty = (v) => {
  switch (typeof v) {
    case "undefined":
      return true;
    case "string":
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!v) return true;
      break;
    case "number":
      if (0 === v || isNaN(v)) return true;
      break;
    case "object":
      if (null === v || v.length === 0) return true;
      for (var _ in v) {
        return false;
      }
      return true;
  }
  return false;
};

export const formattingData = (arr, group_key) => {
  let map = {};
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let ai = arr[i];
    if (!map[ai[group_key]]) {
      map[ai[group_key]] = [ai];
    } else {
      map[ai[group_key]].push(ai);
    }
  }
  Object.keys(map).forEach((key) => {
    res.push({
      [group_key]: key,
      list: map[key],
    });
  });

  return res;
};

export const formatTime = (times) => {
  let time = new Date(times);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return (
    (h < 10 ? "0" + h : h) +
    ":" +
    (mm < 10 ? "0" + mm : mm) +
    " " +
    (d < 10 ? "0" + d : d) +
    "/" +
    (m < 10 ? "0" + m : m) +
    "/" +
    (y < 10 ? "0" + y : y)
  );
};

export const safeFormatTime = (times) => {
  let time = new Date(times);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  return (
    (d < 10 ? "0" + d : d) +
    ":" +
    (m < 10 ? "0" + m : m) +
    ":" +
    (y < 10 ? "0" + y : y)
  );
};
