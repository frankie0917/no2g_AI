"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var colIndicatorEl = document.getElementById("col-indicator");
var rowIndicatorEl = document.getElementById("row-indicator");
var contentEl = document.getElementById("content");
var successBoard = [
    ["O", "X", "O", "O", "X"],
    ["O", "O", "X", "O", "X"],
    ["X", "O", "O", "O", "X"],
    ["X", "O", "O", "O", "X"],
    ["X", "O", "O", "O", "X"],
];
var currentBoard = [];
var indicatorMap = {
    success: {
        row: [],
        col: [],
    },
    row: [],
    col: [],
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, colIndicator, rowIndicator;
    return __generator(this, function (_b) {
        _a = makeIndicators(successBoard), colIndicator = _a.colIndicator, rowIndicator = _a.rowIndicator;
        indicatorMap.success.row = rowIndicator;
        indicatorMap.success.col = colIndicator;
        currentBoard = Array(Object.keys(rowIndicator).length).fill(Array(Object.keys(colIndicator).length).fill("-"));
        renderIndicators(colIndicator, rowIndicator);
        makeContent();
        return [2 /*return*/];
    });
}); };
main();
function makeContent() {
    var e_1, _a;
    var _loop_1 = function (rowIndex, row) {
        var rowEl = createEl("div");
        rowEl.className =
            "flex flex-row justify-between border-b-2 border-gray-400";
        rowEl.style.height = 100 / currentBoard.length + "%";
        var _loop_2 = function (index) {
            var itemEl = createEl("div");
            itemEl.className =
                "border-gray-400 text-gray-700 flex justify-center items-center";
            itemEl.classList.add("border-r-2");
            itemEl.style.fontSize = "80px";
            itemEl.style.width = 100 / row.length + "%";
            itemEl.addEventListener("click", function () {
                setItemValue(rowIndex, index, itemEl);
            });
            rowEl.appendChild(itemEl);
        };
        for (var index = 0; index < row.length; index++) {
            _loop_2(index);
        }
        contentEl.appendChild(rowEl);
    };
    try {
        for (var _b = __values(currentBoard.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), rowIndex = _d[0], row = _d[1];
            _loop_1(rowIndex, row);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function setItemValue(rowIndex, cellIndex, itemEl) {
    var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
    var value = "-";
    switch (currentBoard[rowIndex][cellIndex]) {
        case "X":
            value = "-";
            itemEl.innerText = "";
            itemEl.classList.remove("bg-gray-700");
            break;
        case "O":
            itemEl.innerText = "X";
            itemEl.classList.remove("bg-gray-700");
            value = "X";
            break;
        default:
            itemEl.innerText = "";
            itemEl.classList.add("bg-gray-700");
            value = "O";
            break;
    }
    var copy = JSON.parse(JSON.stringify(currentBoard));
    copy[rowIndex][cellIndex] = value;
    currentBoard = copy;
    var valid = true;
    try {
        for (var _e = __values(currentBoard.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
            var _g = __read(_f.value, 2), rowIndex_1 = _g[0], row = _g[1];
            try {
                for (var _h = (e_3 = void 0, __values(row.entries())), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var _k = __read(_j.value, 2), cellIndex_1 = _k[0], cell = _k[1];
                    if ((successBoard[rowIndex_1][cellIndex_1] === "O" && cell !== "O") ||
                        (successBoard[rowIndex_1][cellIndex_1] !== "O" && cell === "O")) {
                        valid = false;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var _l = makeIndicators(currentBoard), rowIndicator = _l.rowIndicator, colIndicator = _l.colIndicator;
    try {
        for (var _m = __values(indicatorMap.success.row.entries()), _o = _m.next(); !_o.done; _o = _m.next()) {
            var _p = __read(_o.value, 2), rowIndex_2 = _p[0], row = _p[1];
            if (JSON.stringify(rowIndicator[rowIndex_2]) == JSON.stringify(row)) {
                indicatorMap.row[rowIndex_2].classList.remove("bg-gray-700");
                indicatorMap.row[rowIndex_2].classList.add("bg-gray-500");
            }
            else {
                indicatorMap.row[rowIndex_2].classList.remove("bg-gray-500");
                indicatorMap.row[rowIndex_2].classList.add("bg-gray-700");
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
        }
        finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var _q = __values(indicatorMap.success.col.entries()), _r = _q.next(); !_r.done; _r = _q.next()) {
            var _s = __read(_r.value, 2), colIndex = _s[0], col = _s[1];
            if (JSON.stringify(colIndicator[colIndex]) == JSON.stringify(col)) {
                indicatorMap.col[colIndex].classList.remove("bg-gray-700");
                indicatorMap.col[colIndex].classList.add("bg-gray-500");
            }
            else {
                indicatorMap.col[colIndex].classList.remove("bg-gray-500");
                indicatorMap.col[colIndex].classList.add("bg-gray-700");
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_r && !_r.done && (_d = _q.return)) _d.call(_q);
        }
        finally { if (e_5) throw e_5.error; }
    }
    if (valid) {
        setTimeout(function () {
            confirm("成功啦！");
        }, 0);
    }
}
function renderIndicators(colIndicator, rowIndicator) {
    var e_6, _a, e_7, _b, e_8, _c, e_9, _d;
    try {
        for (var _e = __values(colIndicator.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
            var _g = __read(_f.value, 2), colIndex = _g[0], currentCol = _g[1];
            var colEl = createEl("div");
            colEl.className = "mt-auto text-center h-full flex flex-col justify-end";
            if (colIndex !== colIndicator.length - 1) {
                colEl.classList.add("border-r-2");
            }
            colEl.style.width = 100 / colIndicator.length + "%";
            try {
                for (var currentCol_1 = (e_7 = void 0, __values(currentCol)), currentCol_1_1 = currentCol_1.next(); !currentCol_1_1.done; currentCol_1_1 = currentCol_1.next()) {
                    var i = currentCol_1_1.value;
                    var itEl = createEl("div");
                    itEl.className = "h-6";
                    itEl.innerText = i + "";
                    colEl.appendChild(itEl);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (currentCol_1_1 && !currentCol_1_1.done && (_b = currentCol_1.return)) _b.call(currentCol_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            indicatorMap.col.push(colEl);
            colIndicatorEl.appendChild(colEl);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
        }
        finally { if (e_6) throw e_6.error; }
    }
    try {
        for (var rowIndicator_1 = __values(rowIndicator), rowIndicator_1_1 = rowIndicator_1.next(); !rowIndicator_1_1.done; rowIndicator_1_1 = rowIndicator_1.next()) {
            var currentRow = rowIndicator_1_1.value;
            var rowEl = createEl("div");
            rowEl.className = "flex flex-row justify-end items-center border-b-2";
            rowEl.style.height = 100 / rowIndicator.length + "%";
            try {
                for (var currentRow_1 = (e_9 = void 0, __values(currentRow)), currentRow_1_1 = currentRow_1.next(); !currentRow_1_1.done; currentRow_1_1 = currentRow_1.next()) {
                    var i = currentRow_1_1.value;
                    var itEl = createEl("div");
                    itEl.className = "w-6";
                    itEl.innerText = i + "";
                    rowEl.appendChild(itEl);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (currentRow_1_1 && !currentRow_1_1.done && (_d = currentRow_1.return)) _d.call(currentRow_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
            indicatorMap.row.push(rowEl);
            rowIndicatorEl.appendChild(rowEl);
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (rowIndicator_1_1 && !rowIndicator_1_1.done && (_c = rowIndicator_1.return)) _c.call(rowIndicator_1);
        }
        finally { if (e_8) throw e_8.error; }
    }
}
function makeIndicators(board) {
    var e_10, _a, e_11, _b, e_12, _c, e_13, _d;
    var colIndicator = [];
    var rowIndicator = [];
    try {
        for (var _e = __values(board.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
            var _g = __read(_f.value, 2), rowIndex = _g[0], row = _g[1];
            try {
                for (var _h = (e_11 = void 0, __values(row.entries())), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var _k = __read(_j.value, 2), cellIndex = _k[0], cell = _k[1];
                    if (!colIndicator[cellIndex]) {
                        colIndicator[cellIndex] = [];
                    }
                    if (!rowIndicator[rowIndex]) {
                        rowIndicator[rowIndex] = [];
                    }
                    var currentCol = colIndicator[cellIndex];
                    var currentRow = rowIndicator[rowIndex];
                    if (cell === "O") {
                        if (rowIndex === 0) {
                            currentCol.push(1);
                        }
                        if (rowIndex > 0) {
                            currentCol[currentCol.length - 1] += 1;
                        }
                        if (cellIndex === 0) {
                            currentRow.push(1);
                        }
                        if (cellIndex > 0) {
                            currentRow[currentRow.length - 1] += 1;
                        }
                    }
                    else {
                        currentCol.push(0);
                        currentRow.push(0);
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
    }
    catch (e_10_1) { e_10 = { error: e_10_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
        }
        finally { if (e_10) throw e_10.error; }
    }
    try {
        for (var _l = __values(colIndicator.entries()), _m = _l.next(); !_m.done; _m = _l.next()) {
            var _o = __read(_m.value, 2), colIndex = _o[0], currentCol = _o[1];
            colIndicator[colIndex] = currentCol.filter(function (it) { return it !== 0; });
            if (colIndicator[colIndex].length === 0) {
                colIndicator[colIndex].push(0);
            }
        }
    }
    catch (e_12_1) { e_12 = { error: e_12_1 }; }
    finally {
        try {
            if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
        }
        finally { if (e_12) throw e_12.error; }
    }
    try {
        for (var _p = __values(rowIndicator.entries()), _q = _p.next(); !_q.done; _q = _p.next()) {
            var _r = __read(_q.value, 2), rowIndex = _r[0], currentRow = _r[1];
            rowIndicator[rowIndex] = currentRow.filter(function (it) { return it !== 0; });
            if (rowIndicator[rowIndex].length === 0) {
                rowIndicator[rowIndex].push(0);
            }
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (_q && !_q.done && (_d = _p.return)) _d.call(_p);
        }
        finally { if (e_13) throw e_13.error; }
    }
    return {
        rowIndicator: rowIndicator,
        colIndicator: colIndicator,
    };
}
function createEl(tag) {
    return document.createElement(tag);
}
