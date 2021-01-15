define(function () {
    function _(s) {
        for (var k in s) {
            s[k.toUpperCase()] = s[k];
        }
        return s;
    }

    return _({
        autoHeightEnabled:true,
        initialFrameWidth:700,
        minFrameWidth:700,
        initialFrameHeight:128,
        minFrameHeight:128
    })
})