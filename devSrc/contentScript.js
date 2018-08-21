/*
* 初始化cfg
*
* */
import $ from 'jquery';


class CrawlerCrowdSourcing {
    constructor() {
        this.listData = [];
        this.article = '';
        this.stepFinished = false;
        this.cfgs = null;
        this.initFrames();
    }

    //只在主域下执行
    initBindEvent(item) {
        let _this = this;
        _this.mainFrame();
        _this.detailFrame();

        $(document.body).on('click', item, (e) => {

            let domain = $(e.currentTarget).attr('data-domain');
            let src = $(e.currentTarget).attr('data-src');
            _this.mainFrame(src, domain)


        });

        chrome.runtime.sendMessage({type: '_SET_CURRENT'}, (response) => {

        });

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

            switch (request.channel) {

                case '_SPIDER_DETAIL_STEP':
                    let detail = request.data.detail;
                    let domain = request.data.domain;
                    // console.log(detail,domain)
                    _this.detailFrame(detail, domain);

                    break;


            }

        });
    };


    queryUrl(variable) {
        let url = location.search || location.hash; //获取url中"?"符后的字串
        // var theRequest = new Object();
        if (url.indexOf("?") > -1) {
            url = url.substr(1);
            let strs = url.split("&");
            for (let i = 0; i < strs.length; i++) {
                let pair = strs[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
        }
        return (false);


    }


    setStorage(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(data, () => {
                resolve(data)//在异步操作成功时调用
            });

        });
    };

    getStorage(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([data], (result) => {
                // console.log(result[data])
                resolve(result[data])//在异步操作成功时调用
            });
        });
    };

    initCfgs() {
        let _this = this;
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({type: '_GET_CONFIGS'}, (response) => {
                resolve(_this.getStorage('cfgs'))
            });

        });
    };


    mainFrame(src, domain) {

        if (src) {
            src = `${src}${src.indexOf('?') > -1 ? '&' : '?'}renderBy=ChormeExtMain&domain=${domain}`
        } else {
            src = '';
            domain = '';
        }

        if ($('#mainFrameMBChormeExt').length == 0) {
            let frames = document.createElement('iframe');

            $(frames)
                .css({
                    width: 0,
                    height: 0,
                    position: 'fixed',
                    top: '-999999px',
                    left: '-999999px',
                })
                .attr('src', src)
                .attr('data-domain', domain)
                .attr('id', 'mainFrameMBChormeExt')
                .attr('sandbox', "allow-scripts allow-same-origin")
                .appendTo($(document.body));
        } else {
            let iframe = $('#mainFrameMBChormeExt');
            iframe.attr('src', src);
        }


    };

    detailFrame(src, domain) {


        if (src) {
            src = `${src}${src.indexOf('?') > -1 ? '&' : '?'}renderBy=ChormeExtDetail&domain=${domain}`
        } else {
            src = '';
            domain = '';

        }

        if ($('#detailFrameMBChormeExt').length == 0) {
            let frames = document.createElement('iframe');

            $(frames)
                .css({
                    width: 0,
                    height: 0,
                    position: 'fixed',
                    top: '-999999px',
                    left: '-999999px',
                })
                .attr('src', src)
                .attr('data-domain', domain)
                .attr('id', 'detailFrameMBChormeExt')
                .attr('sandbox', "allow-scripts allow-same-origin")
                .appendTo($(document.body));
        } else {
            let iframe = $('#detailFrameMBChormeExt');
            // console.log(src);
            iframe.attr('src', src)
                .attr('data-domain', domain)

        }
    };


    mapDomList(cfg, src, domain) {


        let listArr = (cfg.list || []).filter((m) => {
            return src.indexOf(m.reg) > -1
        });

        let listUrlArr = [];
        for (let i = 0; i < listArr.length; i++) {
            let item = listArr[i];
            switch (item.type) {
                case 'dom':
                    // let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    // // 选择目标节点
                    // let target = $(item.container)[0];
                    // // 创建观察者对象
                    // let observer = new MutationObserver((mutations) => {
                    //     console.log(mutations);
                    // });
                    // // 配置观察选项:
                    // let config = {childList: true};
                    // // 传入目标节点和观察选项
                    // observer.observe(target, config);
                    // // 随后,你还可以停止观察
                    // observer.disconnect();
                    let url = $(item['url']);
                    // console.log(url);
                    for (let k = 0; k < url.length; k++) {
                        let data = {};
                        for (let j = 0; j < item['fields'].length; j++) {
                            let m = item['fields'][j];
                            data[m.name] = (m.matchType && m.match) ? ((m.matchType === 'attr' && m.typeName) ? $(m.match).eq(k).attr(m.typeName) : ($(m.match)[k] ? $(m.match)[k][m.matchType] : '')) : ''
                        }
                        listUrlArr.push(data);
                    }

                    // let url = $(item['url']);
                    // // console.log(url);
                    // for (let j = 0; j < url.length; j++) {
                    //     let m = $(url[j]).attr('href');
                    //     listUrlArr.push(m);
                    // }
                    break;
            }

        }
        if (listUrlArr.length > 0) {
            // console.log(domain)
            chrome.runtime.sendMessage({type: 'LIST_FINISH', listUrlArr: listUrlArr, domain: domain}, (response) => {

                console.log('---LIST_FINISH');
            });
        }


    };

    mapDomDetail(cfg, src) {

        let detailArr = (cfg.detail || []).filter((m) => {
            // console.log(location.href, m.reg)
            return src.indexOf(m.reg) > -1

        });
        // console.log(detailArr)
        for (let i = 0; i < detailArr.length; i++) {
            let item = detailArr[i];
            let data = {};
            switch (item.type) {
                case 'dom':

                    for (let j = 0; j < item['fields'].length; j++) {
                        let m = item['fields'][j];
                        data[m.name] = (m.matchType && m.match) ? ((m.matchType === 'attr' && m.typeName) ? $(m.match).attr(m.typeName) : ($(m.match)[0] ? $(m.match)[0][m.matchType] : '')) : ''
                    }

                    break;
            }
            console.log(data);
            chrome.runtime.sendMessage({type: '_ARTICLE', data: data, src: src}, (response) => {

            });
        }

    };

    async initFrames() {
        let _this = this;
        let cfgs = await this.initCfgs();

        if (!cfgs) return;
        if (cfgs.domain.name && location.href.indexOf(cfgs.domain.name) > -1) {

            this.initBindEvent(cfgs.domain.match);


        }
        let target_domain = this.queryUrl('domain');
        if (!target_domain) return;
        if (!cfgs[target_domain]) return;

        if ((location.search || '').indexOf('renderBy=ChormeExtMain') > -1 || (location.hash || '').indexOf('renderBy=ChormeExtMain') > -1) {
            setTimeout(() => {
                _this.mapDomList(cfgs[target_domain], location.href, target_domain);

            }, 2000)


        }
        if ((location.search || '').indexOf('renderBy=ChormeExtDetail') > -1 || (location.hash || '').indexOf('renderBy=ChormeExtDetail') > -1) {
            setTimeout(() => {
                _this.mapDomDetail(cfgs[target_domain], location.href, target_domain);

            }, 2000)

        }


    };
}


let crawlerCrowdSourcing = new CrawlerCrowdSourcing();


















