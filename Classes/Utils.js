const words = require('../config/words.json');

module.exports = class Utils {
    static generateString(count = 1) {
        let res = '';
        if (count === 1) {
            res += ' ' + words[Utils.rand(0, words.length)]
        } else {
            for (let i = 0; i < count; i++) {
                res += ' ' + words[Utils.rand(0, words.length)]
            }
        }
        return res;
    }

    static rand(min, max) {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }

    static fillData() {
        return "('" + Utils.generateString(1) + "','" +
            Utils.generateString(1) + "'," +
            "'" + '/images/' + Math.round(Math.random() * 1000) + '/' + Math.round(Math.random() * 10000) + '.jpg' +
            "','" + Utils.generateString(Utils.rand(1, 3)) + "'),";
    }

    static getWhereString(whereParams) {
        whereParams = whereParams?JSON.parse(whereParams):'';
        return typeof whereParams === 'object'?'WHERE '+Object
            .entries(whereParams)
            .map((el) => {
                if (el) {
                    let elArr = el[0].split(':');
                    elArr[1] = elArr[1].toUpperCase() || '=';
                    let operator = ['=','!=','LIKE','NOT LIKE'].indexOf(elArr[1]) >= 0? elArr[1]:'=';
                    return `${elArr[0]} ${operator} "${el[1]}"`;
                } else {
                    return '';
                }
            })
            .toString()
            .replace(/,/g, " AND "):'';
    }
    static getParamsString(params) {
        params = params?JSON.parse(params):'*';
        return typeof params === 'object'?
            params
                .map((el) => { return el?el:'';})
                .toString():
            params;

    }
};
