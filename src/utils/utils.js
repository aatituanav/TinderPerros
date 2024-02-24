export const encodePromise = (e, a, r, o, h) =>
  new Promise((n, l) => {
    n(encode(e, a, r, o, h));
  });

const encode = (t, e, a, o, l) => {
  if (o < 1 || o > 9 || l < 1 || l > 9)
    throw new Error("BlurHash must have between 1 and 9 components");
  if (e * a * 4 !== t.length)
    throw new Error("Width and height must match the pixels array");
  let s = [];
  for (let r = 0; r < l; r++)
    for (let h = 0; h < o; h++) {
      const o = 0 == h && 0 == r ? 1 : 2,
        n = c(
          t,
          e,
          a,
          (t, n) =>
            o *
            Math.cos((Math.PI * h * t) / e) *
            Math.cos((Math.PI * r * n) / a)
        );
      s.push(n);
    }
  const m = s[0],
    i = s.slice(1);
  let M,
    g = "";
  if (((g += r(o - 1 + 9 * (l - 1), 1)), i.length > 0)) {
    let t = Math.max(...i.map((t) => Math.max(...t))),
      e = Math.floor(Math.max(0, Math.min(82, Math.floor(166 * t - 0.5))));
    (M = (e + 1) / 166), (g += r(e, 1));
  } else (M = 1), (g += r(0, 1));
  return (
    (g += r(
      ((t) => {
        return (h(t[0]) << 16) + (h(t[1]) << 8) + h(t[2]);
      })(m),
      4
    )),
    i.forEach((t) => {
      g += r(
        ((t, e) => {
          return (
            19 *
              Math.floor(
                Math.max(
                  0,
                  Math.min(18, Math.floor(9 * n(t[0] / e, 0.5) + 9.5))
                )
              ) *
              19 +
            19 *
              Math.floor(
                Math.max(
                  0,
                  Math.min(18, Math.floor(9 * n(t[1] / e, 0.5) + 9.5))
                )
              ) +
            Math.floor(
              Math.max(0, Math.min(18, Math.floor(9 * n(t[2] / e, 0.5) + 9.5)))
            )
          );
        })(t, M),
        2
      );
    }),
    g
  );
};


export const getImageData = (t) => {
    const e = t.width,
      a = t.height,
      r = document.createElement("canvas"),
      o = r.getContext("2d");
    return (
      (r.width = e),
      (r.height = a),
      (o.width = e),
      (o.height = a),
      o.drawImage(t, 0, 0),
      o.getImageData(0, 0, e, a).data
    );
  }
