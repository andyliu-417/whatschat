export function compare() {
  return function(e1, e2) {
    const e1_last = e1[e1.length-1].create_time;
    const e2_last = e2[e2.length-1].create_time;
    return e2_last - e1_last;
  };
}
