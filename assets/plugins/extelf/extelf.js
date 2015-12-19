/*
 * Встраивание ElFinder
 * @author DonnaInsolita
 */
if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
RedactorPlugins.extelf = {
    init: function () {
        RLANG = $.extend({
            fm: 'Файловый Менеджер',
            elurl: 'Ссылка',
            insaslink: 'Вставить как ссылку',
            insasimg: 'Вставить как картинку',
            insasvid: 'Вставить как видео'
        });
        this.opts = $.extend({
            /*Это шаблон модального окна в которое передаётся ссылка на выбранный файл из elfinder*/
            // alert(RLANG.insaslink);
            modal_elf: String() +
            '<div id="redactor_modal_content">' +
            '<label>' + RLANG.elurl + '</label>' +
            '<input type="text" id="redactor_elfurl" class="redactor_input" /><br/>' +
            '<div>' +
            '<textarea  id="redactor_elfaslink" style="overflow:auto;width:250px;height:60px;"></textarea>' +
            ' <input type="button" id="redactor_insaslink" value="' + RLANG.insaslink + '"  class="redactor_modal_btn"/>' +
            '</div><br/>' +
            '<div>' +
            '<textarea id="redactor_elfasimg" style="overflow:auto;width:250px;height:60px;"></textarea>' +
            ' <input type="button" id="redactor_insasimg" value="' + RLANG.insasimg + '" class="redactor_modal_btn"/>' +
            '</div><br/>' +
                // '<textarea id="redactor_elfasvid" style="overflow:auto;width:250px;height:60px;"></textarea>' +
                // ' <input type="button" id="redactor_insasvid" value="'+RLANG.insasvid+'" class="redactor_modal_btn"/>'+
                // '</div>'+
            '</div>'
        }, this.opts);
        /*Добавление кнопкина тулбар редактора, по клику вызывается функция fmOpen, функкция Elfresp в качестве коллбека*/
        this.buttonAdd('elfinder', 'ElFinder', function (obj) {
            // obj.fmOpen(obj.Elfresp,obj);
            this.fmOpen(this.Elfresp, this);
        });
    },
    fmOpen: function (callback, obj) {
        // obj.saveSelection();
        // this.saveSelection();
        var dialog;
        if (!dialog) {
            /*Непосредственно вызов ElFinder*/
            dialog = $('<div id="file-uploader">').dialogelfinder({
                //Вот сюда мы так же можем вписать дополнительные нужные опции для Elfinder согласно мануалу на офф.сайте
                url: this.opts.fmUrl,
                lang: 'ru',
                commandsOptions: {
                    getfile: {
                        onlyURL: true,
                        multiple: false,
                        folders: false,
                        oncomplete: 'close' // close/hide elFinder
                    }
                },
                getFileCallback: function (file) {
                    callback(file, obj);
                }
            });

        } else {
            dialog.dialogelfinder('open')
        }
    },
    Elfresp: function (url, obj) {
        /*ElFinder нам возвращает url выбранного файла - с ним уже делаем чё душеньке угодно..
         *Тут мы вызываем модальное окно имперави*/
        obj.modalInit(RLANG.fm, obj.opts.modal_elf, 300, $.proxy(function () {
                // obj.restoreSelection();

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

                    obj.execCommand('inserthtml', $('#redactor_elfaslink').val());
                    // obj.syncCode();
                    obj.modalClose();
                }, obj));
                $('#redactor_insasimg').click($.proxy(function () {
                    obj.execCommand('inserthtml', $('#redactor_elfasimg').val());
                    // obj.syncCode();
                    obj.modalClose();
                }, obj));

                $('#redactor_insasvid').click($.proxy(function () {
                    obj.execCommand('inserthtml', $('#redactor_elfasvid').val());
                    // obj.syncCode();
                    obj.modalClose();
                }, obj));
            }, obj)
        );

    }

}
