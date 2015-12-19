/**
 * Встраивание ElFinder
 * @author Alex Bond
 */
if (!RedactorPlugins) var RedactorPlugins = {};

(function ($) {
    RedactorPlugins.elfinder = function () {

        var opts = {};
        var obj;

        var fmOpen = function () {
            var dialog;
            if (!dialog) {
                /*Непосредственно вызов ElFinder*/
                var options = $.extend({
                    commandsOptions: {
                        getfile: {
                            onlyURL: true,
                            multiple: false,
                            folders: false,
                            oncomplete: 'close' // close/hide elFinder
                        }
                    },
                    getFileCallback: function (file) {
                        callback(file);
                    }
                }, opts.elfinder);
                dialog = $('<div id="file-uploader">').dialogelfinder(options);

            } else {
                dialog.dialogelfinder('open')
            }
        };

        var callback = function (url) {
            obj.modal.load('modal_elf', 'Insert File', 600);
            obj.modal.show();

            var flink = '<a href="' + url + '" title="" class="">' + url + '</a>';
            var img = '<img src="' + url + '" alt="" class="">';
            var vid = '<video controls preload>' +
                '<source src="' + url + '" />' +
                '</video>';

            $('#redactor_elfurl').val(url);
            $('#redactor_elfaslink').val(flink);
            $('#redactor_elfasimg').val(img);
            $('#redactor_elfasvid').val(vid);
            $('#redactor_insaslink').click($.proxy(function () {
                obj.insert.html($('#redactor_elfaslink').val());
                obj.modal.close();
            }, obj));
            $('#redactor_insasimg').click($.proxy(function () {
                obj.insert.html($('#redactor_elfasimg').val());
                obj.modal.close();
            }, obj));

            $('#redactor_insasvid').click($.proxy(function () {
                obj.insert.html($('#redactor_elfasvid').val());
                obj.modal.close();
            }, obj));
        };

        return {
            init: function () {
                opts = this.opts;
                this.modal.addTemplate('modal_elf', '' +
                    '<div id="redactor-modal-body">' +
                    '<section id="redactor-modal-link-insert">' +
                    '<label>Link</label>' +
                    '<input type="text" id="redactor_elfurl" class="redactor_input" /><br/>' +
                    '<textarea  id="redactor_elfaslink" style="display: none;"></textarea>' +
                    '<textarea id="redactor_elfasimg" style="display: none;"></textarea>' +
                    '</div>' +
                    '<footer>' +
                    '<button id="redactor_insaslink" class="redactor-modal-btn redactor-modal-action-btn" style="width: 49.8%;">Insert as link</button>' +
                    '<button id="redactor_insasimg" class="redactor-modal-btn redactor-modal-action-btn" style="width: 49.8%;float: right;">Insert as image</button>' +
                    '</footer>' +
                    '');
                /*Добавление кнопкина тулбар редактора, по клику вызывается функция fmOpen, функкция Elfresp в качестве коллбека*/
                var button = this.button.addAfter('image', 'elfinder', 'ElFinder');
                this.button.addCallback(button, fmOpen);

                obj = this;
            }
        }
    }
})(jQuery);