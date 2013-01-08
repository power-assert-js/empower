var powerAssert = function powerAssert(expression, message) {
};

(function () {
    powerAssert.__current__ = [];

    powerAssert.__ident__ = function (name, value, start, end) {
        var idents = powerAssert.__current__;
        idents.push({
            name: name,
            value: value,
            start: start,
            end: end
        });
        return value;
    };

    var escapeLineEndings = function (str) {
        return str.replace(/(\r?\n)/g, '$&# ');
    };

    var note = function note (obj) {
        console.log(escapeLineEndings('# ' + obj));
    };

    var createBuffers = function (numRows, numCols) {
        var bufs = [], i, j;
        for(i = 0; i <= numRows; i += 1) {
            bufs.push([]);
        }
        bufs.push([]);
        for(j = 0; j < numCols; j += 1) {
            bufs.forEach(function (buffer) {
                buffer.push(' ');
            });
        }
        return bufs;
    };

    powerAssert.__assert__ = function (result, line) {
        if (result) {
            powerAssert.__current__ = [];
            return;
        }

        var idents = powerAssert.__current__;
        var buffers = createBuffers(idents.length, line.length);

        idents.sort(function (a, b) {
            return b.start - a.start;
        });

        idents.forEach(function (tok, index) {
            for(var j = tok.start; j < tok.end; j += 1) {
                buffers[0].splice(j, 1, '^');
            }
        });

        idents.forEach(function (tok, index) {
            //var val = q.tap.explain(tok.value),
            var val = String(tok.value),
                offset = index + 2;
            for(var i = 1; i < offset; i += 1) {
                buffers[i].splice(tok.start, 1, '|');
            }
            buffers[offset].splice(tok.start, val.length, val);
        });

        note(line);
        buffers.forEach(function (buffer, index) {
            note(buffer.join(''));
        });
        note('');

        powerAssert.__current__ = [];
    };
})();

/*global exports:false*/
if (typeof exports !== 'undefined') {
    module.exports = powerAssert;
}