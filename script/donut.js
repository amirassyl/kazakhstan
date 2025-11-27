import {j as R} from "./jsx-runtime.7faW4zRM.js";
import {c as D} from "./clsx.B-dksMZM.js";
import {r as T} from "./index.DhYZZe0J.js";
const q = ({className: y}) => {
    const m = T.useRef(null);
    return T.useEffect( () => {
        let A, f = 1, l = 1;
        const B = () => {
            const u = []
              , h = [];
            f += .07 * .5,
            l += .03 * .5;
            const e = Math.cos(f)
              , s = Math.sin(f)
              , p = Math.cos(l)
              , x = Math.sin(l);
            for (let t = 0; t < 1760; t++)
                u[t] = t % 80 === 79 ? `
` : " ",
                h[t] = 0;
            for (let t = 0; t < 6.28; t += .07) {
                const o = Math.cos(t)
                  , r = Math.sin(t);
                for (let n = 0; n < 6.28; n += .02) {
                    const c = Math.sin(n)
                      , M = Math.cos(n)
                      , i = o + 2
                      , a = 1 / (c * i * s + r * e + 5)
                      , E = c * i * e - r * s
                      , j = 0 | 40 + 30 * a * (M * i * p - E * x)
                      , d = 0 | 12 + 15 * a * (M * i * x + E * p)
                      , w = j + 80 * d
                      , N = 0 | 8 * ((r * s - c * o * e) * p - c * o * s - r * e - M * o * x);
                    d < 22 && d >= 0 && j >= 0 && j < 79 && a > h[w] && (h[w] = a,
                    u[w] = ".,-~:;=!*#$@"[N > 0 ? N : 0])
                }
            }
            m.current && (m.current.innerHTML = u.join("")),
            A = window.setTimeout( () => {
                requestAnimationFrame(B)
            }
            , 50)
        }
        ;
        return B(),
        () => {
            clearTimeout(A)
        }
    }
    , []),
    R.jsx("div", {
        className: D("flex items-center justify-center", y),
        children: R.jsx("pre", {
            ref: m,
            className: "font-mono text-xs text-white whitespace-pre"
        })
    })
}
;
export {q as Donut};