import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('10xIp8U0yNi04HMghklAyUUFMvOQquU3XmQIwvbnL8NQ')

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()

        const configSheet = doc.sheetsByIndex[2]
        await configSheet.loadCells('C3:C4')

        const ativarPromoCell = configSheet.getCell(2, 2)
        const textoPromoCell = configSheet.getCell(3, 2)

        res.end(JSON.stringify({
            showCoupon: ativarPromoCell.value === true,
            message: textoPromoCell.value
        }))
    } catch (err) {
        res.end(JSON.stringify({
            showCoupon: false,
            message: ''
        }))
    }




}