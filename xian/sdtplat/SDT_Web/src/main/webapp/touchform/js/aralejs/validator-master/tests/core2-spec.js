define(function(require) {
    var Core = require('../src/core'),
        Item = require('../src/item'),
        $ = require('$');

    describe('validator-core', function() {

        if (!$('#container').length) {
            $('<div id="container" style="display:none"><input name="email" id="email" /><input name="password" id="password" /></div>')
                .appendTo(document.body);
        }

        var validator;
        beforeEach(function() {
            validator = new Core({
                element: '#container'
            });
        });

        afterEach(function() {
            validator.destroy();
        });

        it('element', function() {
            expect(validator.element.is('#container')).to.be(true);
        });

        it('execute', function() {
            validator.addItem({
                element: '[name=email]',
                required: true
            });
            validator.execute(function(err, results, ele) {
                expect(err).to.be(true);
                expect(results instanceof Array).to.be(true);
                expect(results[0][0]).to.be('required');
                expect(results[0][1]).to.be('请输入email');
                expect(results[0][2].get(0)).to.be($('[name=email]').get(0));
                expect(ele.get(0)).to.be($('#container').get(0));
            });
        });

        it('events', function() {
            validator.addItem({
                element: '[name=email]',
                required: true
            });

            validator.on('formValidate', function(ele) {
                expect(ele.get(0)).to.be($('#container').get(0));
            });

            validator.on('formValidated', function(err, results, ele) {
                expect(err).to.be(true);
                expect(results instanceof Array).to.be(true);
                expect(results[0][0]).to.be('required');
                expect(results[0][1]).to.be('请输入email');
                expect(results[0][2].get(0)).to.be($('[name=email]').get(0));
                expect(ele.get(0)).to.be($('#container').get(0));
            });

            validator.execute();
        });


               
    });
});

