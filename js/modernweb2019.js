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
        SpeakerInner: {},
        sessionSortedByTime: {},
        JobList: []
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
                Enterprise: this.filter(sponsor, 'rank', 'F級', true),
                Promo: this.filter(sponsor, 'rank', '資安共同推廣單位', true),
                Special: this.filter(sponsor, 'rank', 'G級', true)
            }
        },
        sortSessions: function() {
            var session = this.Session;
            return _.orderBy(session, 'session_start')
        },
        sortSponsor: function() {
            var sponsor = this.Sponsor;

            var ss = _.sortBy(sponsor, function(element) {
                var rankSort = {
                    "主辦單位": 1,
                    "共同主辦單位": 2,
                    "鑽石級": 3,
                    "白金級": 4,
                    "黃金級": 5,
                    "銀級": 6,
                    "資安共同推廣單位": 7,
                    "G級": 8,
                    "F級": 9
                };
                return rankSort[element.rank]
            });
            return ss;
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
        ConvertEmptyArrayToString: function(rowData, arrayKey) {
            for (var i = 0; i < arrayKey.length; i++) {
                var key = arrayKey[i];
                rowData[key] = (rowData[key].length === 0) ? '' : rowData[key];
            }
            return rowData;
        },
        GoPreSpeaker: function() {
            var id = location.hash.replace(/#s/igm, '');
            var speakerArray = this.Speaker;
            speakerArray = this.filter(speakerArray, 'role', '司儀', false);
            // console.log(speakerArray);
            var thisSpeakerIndex = speakerArray.findIndex(function(spk) {
                return spk.target_id === id;
            });
            var preSpeaker = speakerArray.slice(thisSpeakerIndex - 1, thisSpeakerIndex);
            var preSpeakerId = preSpeaker[0].target_id;
            // console.log(preSpeakerId);
            window.location.href = 'speakers.html#s' + preSpeakerId;
            window.location.reload();
        },
        GoNextSpeaker: function() {
            var id = location.hash.replace(/#s/igm, '');
            var speakerArray = this.Speaker;
            speakerArray = this.filter(speakerArray, 'role', '司儀', false);
            var thisSpeakerIndex = speakerArray.findIndex(function(spk) {
                return spk.target_id === id;
            });
            var nextSpeaker = speakerArray.slice(thisSpeakerIndex + 1, thisSpeakerIndex + 2);
            // console.log(nextSpeaker);
            var nextSpeakerId = nextSpeaker[0].target_id;
            window.location.href = 'speakers.html#s' + nextSpeakerId;
            window.location.reload();
        },
        loadSpeakerInner: function() {
            var id = location.hash.replace(/#s/igm, '');
            if (!id) {
                return false;
            }
            for (var i = 0; i < this.Speaker.length; i++) {
                if (this.Speaker[i].target_id == id) {
                    modernweb2019.SpeakerInner = this.Speaker[i];
                    break;
                }
            }

            var self = this;
            $.getJSON('https://confapi.ithome.com.tw/api/v1.3/spk.jsonp?callback=?&nid=6270').then(function(speaker) {
                modernweb2019.Speaker = speaker;
                for (var i = 0; i < modernweb2019.Speaker.length; i++) {
                    if (modernweb2019.Speaker[i].target_id == id) {
                        modernweb2019.SpeakerInner['profile'] = modernweb2019.Speaker[i]['profile'];
                        break;
                    }
                }
            })
        },
        shareSpeakerInner: function() {
            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object: {
                        'og:url': location.href,
                        'og:title': this.SpeakerInner['speaker'],
                        'og:description': this.SpeakerInner['profile'],
                        'og:image': this.SpeakerInner['avatar']
                    }
                })
            }, function(response) {});
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
            confapi.getJobWithSponsor(),
            confapi.getSponsor()
        ).done(function(session, speaker, sponsor, jobs) {
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

            $.getJSON('https://confapi.ithome.com.tw/api/v1.3/job-list?confid=6344&callback=?').then(function(joblist) {
                $.map(joblist, function(jobs) {
                    $.map(sponsor, function(_sponsor) {
                        if (_sponsor.vendor_id == jobs.sponsor) {
                            jobs['name'] = _sponsor.title;
                            jobs['screen_name'] = _sponsor.alt_title;
                            jobs['sponsor_english_title'] = _sponsor.english_title;
                        }
                    });
                });
                modernweb2019.JobList = joblist;
            })

            var is_speaker_page = location.pathname.search(/speakers/igm) > -1;
            if (!!is_speaker_page) {
                modernweb2019.loadSpeakerInner();
            }

            modernweb2019.$nextTick(function() {
                $('div[data-toggle="modal"]').click(function(e) {
                    console.log('111');
                    $('.tabSession').removeClass('active');
                    $('.tabSpeaker').removeClass('active');
                    $('.tabSession').addClass('active');
                    e.preventDefault();
                });

                function goScroll(target) {
                    var $target = $(target);
                    var target_top = $target.offset().top;
                    var header_height = ($('html').width() <= 768) ? 0 : $('nav').height();
                    var sTop = (target_top - header_height);
                    $('html, body').stop().animate({
                        scrollTop: sTop
                    }, 500);
                }

                setTimeout(function() { location.hash && goScroll(location.hash); }, 500);

                $.when([
                    $.getScript('https://connect.facebook.net/zh_TW/all.js'),
                    // $.getScript('https://maps.googleapis.com/maps/api/js?sensor=false')
                ]).then(function() {
                    // $.getScript('js/app.js');
                });

                $('ul.nav-tabs').children('li').on('click', function() {
                    if ($(this).hasClass('active')) {
                        return false
                    } else {
                        $('li.tabSession').toggleClass('active');
                        $('li.tabSpeaker').toggleClass('active');
                    }
                });

            });
        });
    }
});
// test