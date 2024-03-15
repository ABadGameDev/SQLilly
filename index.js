const select0 = "Find ";
const select1 = ["all ", "the amount of "];
const select2 = ["car colors", "car VINs", "car brands", "cars", "blue cars", "red cars"];
const which0 = " that are ";
const which1 = ["registered in ", "from "]

const a_select0 = "SELECT ";
const a_select1 = ["", "COUNT(*)"];
const a_select2 = ["Cars.color", "Cars.VIN", "Cars.brand", "*"];
const a_from0 = " FROM Cars NATURAL JOIN Register";
const a_which0 = " WHERE ";
const a_which1 = ["Register.state ", "Register.date "];
const a_whichA = ["= ", "> ", "< "];
const a_group0 = " GROUP BY ";
const a_group1 = ["Cars.color", "Cars.vin", "Cars.brand"];


const states = ["Virginia", "Kentucky", "Oregon", "Mars"];
const times = ["", "after ", "before "]

const selectRandom = function (a) {
    return Math.floor(Math.random() * a.length);
}
const showSchema = function (s) {
    s.style.filter = 'opacity(1)';
    s.style.pointerEvents = 'all';
}
const hideSchema = function (s) {
    s.style.filter = 'opacity(0)';
    s.style.pointerEvents = 'none';
}

const buttons = {
    reveal() {
        document.getElementById('ans').style.transition = "0.2s";
        document.getElementById('ans').style.filter = 'blur(0)';
        hideSchema(schema);
    },
    next() {
        document.getElementById('ans').style.transition = "0s";
        document.getElementById('ans').style.filter = 'blur(10px)';

        let c = selectRandom(select1);

        let new_q = select0 + select1[c];
        let new_a = a_select0 + "";

        let v = selectRandom(select2);
        new_q += select2[v];

        if (v < 3) { //SELECTing some specific attribute
            new_a += a_select2[v];
            new_a += (c == 0 ? "" : ", ") + a_select1[c];
        }
        else { //SELECTing all car data
            if (c == 1) { //Getting COUNT doesn't also need *
                new_a += a_select1[c];
            }
            else {
                new_a += "*";
            }
        }
        new_a += a_from0;


        let where = v < 4 ? "" : " WHERE Car.color = " + (v == 4 ? "blue" : "red"); 

        let p = -1;
        for (let i = 0; i < 2; i++) {
            if (Math.random() > 0.15) {
                let w = selectRandom(which1);
                if (p == w) {
                    continue;
                }
                if (p != -1) {
                    new_q += " and "
                }
                p = w;
                new_q += which0 + which1[w];
                where += (where == "" ? a_which0 : " AND ") + a_which1[w];
                switch (w) {
                    case 0:
                        let s = states[selectRandom(states)];
                        new_q += s;
                        where += "= " + s;
                        break;
                    case 1:
                        let t = selectRandom(times);
                        let time = (2000 + Math.floor(Math.random() * 20));
                        new_q += times[t] + time;
                        where += a_whichA[t] + time;
                        break;
                }
            }
        }
        new_a += where;
        if (v < 3 & c == 1) {
            new_a += a_group0;
            new_a += a_group1[v];
        }
        new_q += ".";
        new_a += ";";

        hideSchema(schema);
        document.getElementById('qst').textContent = new_q;
        document.getElementById('ans').textContent = new_a;
    },
    schema() {
        let schema = document.getElementById('schema');
        if (schema.style.pointerEvents != 'all') {
            showSchema(schema);
        } else {
            hideSchema(schema);
        }

    }
};
