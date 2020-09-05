import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'
import moment from 'moment'

const doc = new GoogleSpreadsheet('10xIp8U0yNi04HMghklAyUUFMvOQquU3XmQIwvbnL8NQ')

const genCoupon = () =>{
    const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()

    return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8,4)
}

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[1]

        // Infos needed on google sheet: Nome	Email	Whatsapp	Cupom	Promo
        const data = JSON.parse(req.body)

        const configSheet = doc.sheetsByIndex[2]
        await configSheet.loadCells('C3:C4')
        
        const promoMessageCell = configSheet.getCell(3, 2)
        const activatePromoCell = configSheet.getCell(2, 2)

        let Coupon = ''
        let Promo = ''

        if(activatePromoCell.value === true){
            Coupon = genCoupon()
            Promo = promoMessageCell.value
        }

        await sheet.addRow({
            Name: data.Name,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Score: parseInt(data.Score),
            'Data Preenchimento' : moment().format('DD/MM/YYYY, HH:mm:ss'),
            Coupon,
            Promo
        })
        res.end(JSON.stringify({
            showCoupon: Coupon !== '',
            Coupon,
            Promo
        }))
    }
    catch (err) {
        console.log(err)
        res.end('error')

    }


}