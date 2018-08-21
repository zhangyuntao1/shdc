import $ from '../buildSrc/js/jquery.min'

const utils = {
    data: null,
    _CURRENTID: null,
    articleList: [],
    articleDomain: null,
    getStorage(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([data], (result) => {
                resolve(result[data])//在异步操作成功时调用
            });
        });

    },

    setStorage(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(data, () => {
                resolve(data)//在异步操作成功时调用
            });

        });

    },
    spiderDetailStep() {
        if (utils.articleList.length == 0) return;
        let detail = utils.articleList[0].url;
        // console.log(detail,utils._CURRENTID)
        chrome.tabs.sendMessage(
            utils._CURRENTID,
            {
                channel: '_SPIDER_DETAIL_STEP',
                data: {
                    domain: utils.articleDomain,
                    detail: detail,
                }
            },
            (response) => {
                console.log(response);
            });
    },
    getConfigs() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://10.20.63.183:5000/cfg.json',
                headers: {},
                type: 'GET',
                success: (data) => {
                    resolve(data)
                },
                error: () => {
                    reject(null)

                }
            })
        })

    }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    switch (request.type) {
        case '_GET_CONFIGS':
            utils.getConfigs().then((data) => {
                utils.setStorage({
                    cfgs: data || null
                })
            });

            break;
        case '_SET_CURRENT':
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                (tabs) => {
                    utils._CURRENTID = tabs[0].id
                });

            break;


        case '_ARTICLE':
            utils.data = request.data;
            // console.log(utils.data);
            utils.articleList = utils.articleList.filter((m) => {
                console.log(request.src.indexOf(m.url))
                return request.src.indexOf(m.url) < 0
            });

            console.log(utils.articleList)
            utils.spiderDetailStep();


            break;

        case 'LIST_FINISH':

            // console.log(request.listUrlArr);

            let articleList = request.listUrlArr || []
            utils.articleList = articleList.length > 10 ? (articleList.slice(0, 10)) : articleList;
            console.log(utils.articleList)
            utils.articleDomain = request.domain;
            utils.spiderDetailStep();

            break;


    }

});


