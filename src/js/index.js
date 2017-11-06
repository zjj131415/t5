(function() {
    $(function() {
        // routers
        (function () {
            function showPage(dom) {
                $('.page').hide().css({"display":"none","opacity": "0"});
                $(dom).show().css({"display":"block","opacity": "1"});
            }
            Router.route('/', function() {
                showPage('.page1');
            });
            Router.route('/upload', function() {
                showPage('.page2');
            });
            Router.route('/rule', function() {
                showPage('.page3');
            });
            Router.route('/from', function() {
                showPage('.page4');
            });
            Router.route('/success', function() {
                showPage('.page5');
            });
            Router.route('/generate', function() {
                showPage('.page6');
            });
            Router.route('/success', function() {
                showPage('.page3');
            });
        })();
        (function() {
           console.log('jdqdwq')
        })();
    })
})();