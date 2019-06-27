var modernweb2019 = new Vue({
    el: '#modernweb2019',
    data: {
        Session: {
            title: '',
            summary: '',
            speaker: '',
            classroom: '',
            download_link: '',
        },
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
                Host: this.filter(sponsor, 'rank', '主辦單位', true),
                Diamond: this.filter(sponsor, 'rank', '鑽石級', true),
                Platinum: this.filter(sponsor, 'rank', '白金級', true),
                Gold: this.filter(sponsor, 'rank', '黃金級', true),
                Silver: this.filter(sponsor, 'rank', '銀級', true),
                Bronze: this.filter(sponsor, 'rank', '銅級', true),
                Entprise: this.filter(sponsor, 'rank', 'F級', true),
                Promo: this.filter(sponsor, 'rank', '資安共同推廣單位', true),
                Special: this.filter(sponsor, 'rank', 'G級', true)
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
                $('.active.tabSession').addClass('active');
                $('.active.tabSpeaker').removeClass('active');
                $('#sessionModalAgenda').addClass('active');
                $('#sessionModalIntro').removeClass('active');
            }
            $('#tabSpeaker').hide();
            if (!!session.speaker.length) {
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
        },
        findWhichDayOfEvent: function(dateObject, dayOfEvent) {
            if (dateObject.getDate() == dayOfEvent) {
                return true;
            } else {
                return false;
            }
        },
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
            modernweb2019.Session = session;
            modernweb2019.Speaker = speaker;
            modernweb2019.Sponsor = sponsor;
            modernweb2019.sessionSortedByTime = sortSessionByTime();

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
                        sessionSortedByTime.push({ date: session[i].start_Date, endDate: session[i].end_Date, sessionOfSameTime: [session[i]] });
                    } else {
                        for (var s = 0; s < sessionSortedByTime.length; s++) {
                            if (session[i].start_Date.getTime() === sessionSortedByTime[s].date.getTime()) {
                                sessionSortedByTime[s].sessionOfSameTime.push(session[i]);
                            }
                            if (sessionSortedByTime[s].sessionOfSameTime) {
                                sessionSortedByTime[s].sessionOfSameTime = _.orderBy(sessionSortedByTime[s].sessionOfSameTime, ['track'], ['asc']);
                            }

                        }

                    }


                }
                return sessionSortedByTime;
            }


            modernweb2019.$nextTick(function() {
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
// test