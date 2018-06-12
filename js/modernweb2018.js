var session_table = {

    "09:00": [
        '3382', // reception
    ],
    "09:30": [
        '3367', // opening welcome
    ],
    "09:40": [
        '3365' // Ali cloud
    ],
    "10:20": [
        '3366' // red hat
    ],
    "11:00": [
        '3368' // break
    ],
    "11:20": [
        '3369' // micro
    ],
    "12:00": [
        '3546' // lunch
    ],

    "12:30": [
        '3370' // lunch
    ],
    "13:30": [
        '3371', // track a 
        '3372' //track b 
    ],
    "14:10": [
        '3375' // break
    ],
    "14:20": [
        '3376', // a: vmware
        '3377', //b: microsoft
    ],
    "15:00": [
        '3380' // break
    ],
    "15:10": [
        '3373', // a: run 
        '3378' //b: ibm
    ],
    "15:35": [
        '3505' // break
    ],
    "15:45": [
        '3379', // a: deployment
        '3383' //open
    ],
    "16:20": [
        '3384', // a:
        '3374' //prometheus 
    ],
    "16:45": [
        '3385' // break
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
        session_table: session_table,
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
                Silver: this.filter(sponsor, 'rank', '銀級', true)
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
            $('a[href="#speakerModalAgenda"]').tab('show');
            $('#speakerModal').modal('show');
        },
        showModal: function(sponsor) {
            this.Modal_Sponsor = sponsor;
            $('a[href="#sponsorModal"]').tab('show');
            $('#sponsorModal').modal('show');
        },
        showModal2: function(session) {
            this.Modal_Session = session;
            if (!!session.speaker.length) {
                $('a[href="#sessionModalAgenda"]').tab('show');
                $('#sessionModal').modal('show');
            }
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

           function sortSessionByTime(){
                var sessionSortedByTime =[];
                var uniqueDates = [];
                session =  _.orderBy(session, 'session_start');
                for(var i in session){
                    if(!isDateInArray(session[i].start_Date, uniqueDates)){
                        uniqueDates.push(session[i].start_Date);
                        sessionSortedByTime.push({date: session[i].start_Date,sessionOfSameTime: [session[i]]});
                    }else{
                        for(var s = 0;s<sessionSortedByTime.length;s++){
                            if(session[i].start_Date.getTime() === sessionSortedByTime[s].date.getTime()){
                                sessionSortedByTime[s].sessionOfSameTime.push(session[i]);
                            }
                            if(sessionSortedByTime[s].sessionOfSameTime){
                                sessionSortedByTime[s].sessionOfSameTime = _.orderBy(sessionSortedByTime[s].sessionOfSameTime, ['track'],['asc']);
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