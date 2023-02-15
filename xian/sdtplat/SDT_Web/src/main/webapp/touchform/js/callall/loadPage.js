define(function (require, exports, module) {
    var Base = require('base')
    var $ = require('$')


    var LoadPage = Base.extend({
        element: null,
        attrs: {
            url: ''
        },
        initialize: function (config) {
            $.post(config.attrs.url + "?ajax=true", function (result) {

                $(config.element).html(result);
            });
        }
    })

    LoadPage.reset = function () {
        alert("ddddd0");
    }

    LoadPage.autoReaderAll = function (root, callback) {
        if (typeof root === 'function') {
            callback = root
            root = null
        }

        root = $(root || document.body)
        root.find('[data-loadpage]').each(function () {

            alert($(this).attr('data-loadpage'));
        })
    }

    module.exports = LoadPage
});