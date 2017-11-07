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
        (function () {
            document.getElementById('uploadImagee').onchange = function (e) {
                var u = navigator.userAgent;
                if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
                    var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
                    for (var i = 0, len = files.length; i < len; ++i) {
                        var file = files[i];
                        if (url) {
                            src = url.createObjectURL(file);
                        } else {
                            src = e.target.result;
                        }
                    }
                    $('.uploadShow').attr('src', src);
                    $('.uploadShow').show();
                    $('.uploadBg').hide();
                    return false;
                };
                var loadindex = layer.open({ type: 2, content: '记载中', shadeClose: false });
                var file = e.target.files[0];
                var Orientation = null;
                EXIF.getData(file, function () {
                    EXIF.getAllTags(this);
                    Orientation = EXIF.getTag(this, 'Orientation');
                });
                var src = '';
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var canvas = document.createElement("canvas");
                        canvas.width = this.naturalWidth;
                        canvas.height = this.naturalHeight;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);
                        var base64 = null;
                        if (Orientation != "" && Orientation != 1 && Orientation != undefined) {
                            var width = this.naturalWidth;
                            var height = this.naturalHeight;
                            switch (Orientation) {
                                case 6://需要顺时针90度旋转
                                    canvas.width = height;
                                    canvas.height = width;
                                    ctx.rotate(90 * Math.PI / 180);
                                    ctx.drawImage(this, 0, -height);
                                    break;
                                case 8://需要逆时针90度旋转
                                    canvas.width = height;
                                    canvas.height = width;
                                    ctx.rotate(-90 * Math.PI / 180);
                                    ctx.drawImage(this, -width, 0);
                                    break;
                                case 3://需要180度旋转
                                    ctx.rotate(180 * Math.PI / 180);
                                    ctx.drawImage(this, -width, -height);
                                    break;
                            }
                        }
                        src = canvas.toDataURL("image/jpg",0.8);
                        layer.close(loadindex);
                        $('.uploadShow').attr('src', src);
                        $('.uploadShow').show();
                        $('.uploadBg').hide();
                    };
                };
            }
        })();
    })
})();