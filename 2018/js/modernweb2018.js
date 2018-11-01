var session_table_D1 = {
    "9:00": [
        '3583', // 報到
    ],
    "9:30": [
        '3584', // Opening
    ],
    "9:40": [
        '3585', // keynote1
    ],
    "10:20": [
        '3586', // break
    ],
    "10:30": [
        '3587', // keynote2
    ],
    "11:10": [
        '3588', // break
    ],
    "11:20": [
        '3647', // keynote3
    ],
    "12:00": [
        '3590', // lunch
    ],
    "13:30": [
        '3614',
        '3630',
        '3613',
        '3606'
    ],
    "14:20": [
        '3638',
        '3594',
        '3604',
        '3608'
    ],
    "15:10": [
        '3637',
        '3592',
        '3595',
        '3610'
    ],
    "16:00": [
        '3605',
        '3612',
        '3607',
        '3601'
    ],
    "16:50": [
        '3593',
        '3639',
        '3591',
        '3600'
    ],
}

var session_table_D2 = {
    "9:00": [
        '3615', // 報到
    ],
    "9:30": [
        '3616', // Opening
    ],
    "9:40": [
        '3589', // keynote4
    ],
    "10:20": [
        '3618', // break
    ],
    "10:30": [
        '3619', // keynote5
    ],
    "11:10": [
        '3620', // break
    ],
    "11:20": [
        '3627',
        '3623',
        '3626',
        '3625'
    ],
    "11:45": [
        '3621',
        '3622',
        '3624',
        '3648'
    ],
    "12:10": [
        '3628', // lunch
    ],
    "13:30": [
        '3645',
        '3636',
        '3629',
        '3609'
    ],
    "14:20": [
        '3644',
        '3603',
        '3641',
        '3640'
    ],
    "15:10": [
        '3617',
        '3602',
        '3611'
    ],
    "15:50": [
        '3634'
    ],
    "16:00": [
        '3685'
    ],
    "16:40": [
        '3653'
    ],
    "16:50": [
        '3635'
    ],
}

var modernweb2018 = new Vue({
    el: '#modernweb2018',
    data: {
        Session: {
            title: '',
            summary: '',
            speaker: '',
            classroom: '',
            download_link: '',
        },
        session_table_D1: session_table_D1,
        session_table_D2: session_table_D2,
        Speaker: {},
        Sponsor: {},
        Modal_Speaker: {},
        Modal_Session: {},
        Modal_Sponsor: {},
        Test: {},
        sessionSortedByTime: {}
    },
    computed: {
        ModalData: function() {
            var Modal_ID = this.Modal_ID;
            return this.Speaker[Modal_ID] || {}
        },
        SpeakerFilter: function() {
            var speaker = this.Speaker;
            return {
                keynote: this.filter(speaker, 'session_type', 'keynote', true),
                session: this.filter(speaker, 'session_type', 'session', true),
                featured: this.filter(speaker, 'role', '關鍵講師', true),
                china: this.filter(speaker, 'tags', 'China', true),
                normal: this.filter(this.filter(speaker, 'role', '講師', true), 'tags', 'China', false)
            }
        },
        SponsorFilter: function() {
            var sponsor = this.Sponsor;
            return {
                Coorganizer: this.filter(sponsor, 'rank', '天龍級', true),
                Diamond: this.filter(sponsor, 'rank', '鑽石級', true),
                Platinum: this.filter(sponsor, 'rank', '白金級', true),
                Gold: this.filter(sponsor, 'rank', '黃金級', true),
                Silver: this.filter(sponsor, 'rank', '銀級', true),
                Promote: this.filter(sponsor, 'rank', '資安共同推廣單位', true),
            }
        },
        sortSessions: function() {
            var session = this.Session;
            return _.orderBy(session, 'session_start')
        }
    },
    methods: {
        filter: function(data, field, value, boolean) {
            return $.grep(data, function(obj) {
                if (typeof obj[field] === 'object') {
                    return (!!~$.inArray(value, obj[field]) == boolean) ? obj : null;
                } else {
                    return ((obj[field] == value) == boolean) ? obj : null;
                }
            });
        },
        showModal: function(speaker) {
            this.Modal_Speaker = speaker;
            $('a[href="#speakerModalIntro"]').tab('show');
            $('#speakerModal').modal('show');
            $('#tabSession').removeClass('active');
            $('#tabSpeaker').addClass('active');
            $('#speakerModalAgenda').removeClass('active');
            $('#speakerModalIntro').addClass('active');
        },
        showModal2: function(session) {
            this.Modal_Session = session;
            if (!!session.summary.length) {
                $('a[href="#sessionModalAgenda"]').tab('show');
                $('#sessionModal').modal('show');
                $('#tabSession').addClass('active');
                $('#tabSpeaker').removeClass('active');
                $('#sessionModalAgenda').addClass('active');
                $('#sessionModalIntro').removeClass('active');
            }
            $('#tabSpeaker').hide();
            if(!!session.speaker.length){
                $('#tabSpeaker').show();

            }
        },
        showModal3: function(sponsor) {
            this.Modal_Sponsor = sponsor;
            $('a[href="#sponsorModal"]').tab('show');
            $('#sponsorModal').modal('show');
        },
        arcToSpan: function(str) {
            return str.replace(/\(/igm, '<span>(').replace(/\)/igm, ')</span>');
        }
    },
    filters: {
        time: function(date) {
            var leftPadZero = function(str, n) {
                str = ('' + str);
                return Array(n - str.length + 1).join('0') + str;
            }
            if (!!date) {
                return leftPadZero(date.getHours(), 2) + ':' + leftPadZero(date.getMinutes(), 2);
            }
            return '';
        }
    },
    beforeCreate: function() {
        $.when(
            confapi.getSessionWithSpeaker(),
            confapi.getSpeakerWithSession(),
            confapi.getSponsor()
        ).done(function(session, speaker, sponsor) {
            modernweb2018.Session = session;
            modernweb2018.Speaker = speaker;
            modernweb2018.Sponsor = sponsor;
            modernweb2018.sessionSortedByTime = sortSessionByTime();

            function isDateInArray(needle, haystack) {
                for (var i = 0; i < haystack.length; i++) {
                    if (needle.getTime() == haystack[i].getTime()) {
                        return true;
                    }
                }
                return false;
            }

            function sortSessionByTime() {
                var sessionSortedByTime = [];
                var uniqueDates = [];
                session = _.orderBy(session, 'session_start');
                for (var i in session) {
                    if (!isDateInArray(session[i].start_Date, uniqueDates)) {
                        uniqueDates.push(session[i].start_Date);
                        sessionSortedByTime.push({ date: session[i].start_Date, sessionOfSameTime: [session[i]] });
                    } else {
                        for (var s = 0; s < sessionSortedByTime.length; s++) {
                            if (session[i].start_Date.getTime() === sessionSortedByTime[s].date.getTime()) {
                                sessionSortedByTime[s].sessionOfSameTime.push(session[i]);
                            }
                        }
                    }
                }
                return sessionSortedByTime;
            }


            modernweb2018.$nextTick(function() {
                $('button[data-toggle="modal"]').click(function(e) {
                    e.preventDefault();
                });
                $.when([
                    $.getScript('https://connect.facebook.net/zh_TW/all.js'),
                    // $.getScript('https://maps.googleapis.com/maps/api/js?sensor=false')
                ]).then(function() {
                    // $.getScript('js/app.js');
                });
            });
        });
    }
});