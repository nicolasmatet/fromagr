
const https = require('https');
const WIKIDATA_URL = "https://www.wikidata.org/w/api.php"
const WIKIMEDIA_URL = "https://commons.wikimedia.org/w/thumb.php"
const Rx = require('rxjs');
const RxOp = require('rxjs/operators');

function getMainImageName(wikidata_id) {
    const subject = new Rx.Subject()
    let response = ''
    https.get(`${WIKIDATA_URL}?action=wbgetclaims&format=json&property=P18&entity=${wikidata_id}`, (res) => {
        res.on('data', (d) => {
            response += d
        });
        res.on('end', () => {
            let imageName = null;
            try {
                const json = JSON.parse(response)
                const p18 = json.claims.P18
                imageName = p18 ? p18[0]?.mainsnak.datavalue.value : null
            } catch (e) {
                console.error(e);
            }
            subject.next(imageName)
        });
    }).on('error', (e) => {
        console.error(e);
    })
    return subject
}

function getImageUrl(wikidata_id) {
    return getMainImageName(wikidata_id)
        .pipe(RxOp.map((imageName) => {
            if (!imageName) {
                return ''
            }
            try {
                const escapedImageName = imageName.replaceAll(' ', '_')
                return `${WIKIMEDIA_URL}?width=500&f=${escapedImageName}`
            } catch {
                return ''
            }
        }), RxOp.take(1))
}

exports.getImageUrl = getImageUrl
