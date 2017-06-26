var modernweb2017 = new Vue({
    el: '#modernweb2017',
    data: {
        Session: {},
        Speaker: {},
        Sponsor: {},
        Modal_Speaker: {}
    },
    computed: {
        // ModalData: function () {
        //     var Modal_ID = this.Modal_ID;
        //     return this.Speaker[Modal_ID] || {}
        // },
        SpeakerFilter: function () {
            var speaker = this.Speaker;
            return {
                keynote: this.filter(speaker, 'session_type', 'keynote', true),
                session: this.filter(speaker, 'session_type', 'session', true),
                featured: this.filter(speaker, 'role', '關鍵講師', true),
                china: this.filter(speaker, 'tags', 'China', true),
                normal: this.filter(this.filter(speaker, 'role', '講師', true), 'tags', 'China', false)
            }
        }
    },
    methods: {
        filter: function (data, field, value, boolean) {
            return $.grep(data, function (obj) {
                if (typeof obj[field] === 'object') {
                    return (!!~$.inArray(value, obj[field]) == boolean) ? obj : null;
                } else {
                    return ((obj[field] == value) == boolean) ? obj : null;
                }
            });
        },
        showModal: function (speaker) {
            this.Modal_Speaker = speaker;
            $('a[href="#speakerModalAgenda"]').tab('show');
            $('#speakerModal').modal('show');
        },
        arcToSpan: function (str) {
            return str.replace(/\(/igm, '<span>(').replace(/\)/igm, ')</span>');
        }
    },
    filters: {
        time: function (date) {
            var leftPadZero = function (str, n) {
                str = ('' + str);
                return Array(n - str.length + 1).join('0') + str;
            }
            if (!!date) {
                return leftPadZero(date.getHours(), 2) + ':' + leftPadZero(date.getMinutes(), 2);
            }
            return '';
        }
    },
    beforeCreate: function () {
        $.when(
            confapi.getSessionWithSpeaker(),
            confapi.getSpeakerWithSession()
            // confapi.getSponsor()
        ).done(function (session, speaker, sponsor) {
            modernweb2017.Session = session;
            modernweb2017.Speaker = speaker;
            // modernweb2017.Sponsor = sponsor;

            modernweb2017.$nextTick(function () {
                $('body').addClass('is-active');
                setTimeout(function(){
                    $('#loading').remove();
                }, 500);
                $.when([
                    $.getScript('https://connect.facebook.net/zh_TW/all.js'),
                    $.getScript('https://maps.googleapis.com/maps/api/js?sensor=false')
                ]).done(function (script, textStatus) {
                    $.getScript('js/app.js');
                });
            });
        });
    }
});
