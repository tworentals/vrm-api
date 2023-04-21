const { serialize } = require('../../../../services/serializers')

exports.PERMITED_COLLECTION_PARAMS = [
  'id',
  'isPaid',
  'invoiceId',
  'invoiceNo',
  'status',
  'invoiceType',
  'invoiceTitle',
  'invoiceDate',
  'invoiceDueDate',
  'buyerName',
  'currency',
  'subtotalAmount',
  'totalAmount',
  'createdAt',
  'updatedAt',
]

exports.PERMITED_ITEM_PARAMS = [
  'id',
  'status',
  'invoiceId',
  'invoiceNo',
  'invoiceType',
  'invoiceTitle',
  'invoiceDate',
  'invoiceDueDate',
  'sellerName',
  'sellerAddress',
  'sellerZip',
  'sellerCity',
  'sellerCountry',
  'sellerTaxId',
  'buyerName',
  'buyerAddress',
  'buyerZip',
  'buyerCity',
  'buyerCountry',
  'buyerTaxId',
  'paymentType',
  'taxNotation',
  'invoiceNote',
  'invoiceItems',
  'currency',
  'subtotalAmount',
  'totalAmount',
  'isPaid',
  's3InvoicePath',
  'logoBase64',
  'createdAt',
  'updatedAt',
]

exports.serialize = serialize

exports.toPdf = (invoice) => ({
  documentTitle: invoice.invoiceTitle,
  currency: invoice.currency,
  taxNotation: invoice.taxNotation,
  logo: invoice.logoBase64,
  invoiceNumber: invoice.invoiceNo,
  invoiceDate: invoice.invoiceDate,
  bottomNotice: invoice.invoiceNote,
  subtotalAmount: invoice.subtotalAmount,
  totalAmount: invoice.totalAmount,
  sender: {
    company: invoice.sellerName || '',
    address: invoice.sellerAddress || '',
    zip: invoice.sellerZip || '',
    city: invoice.sellerCity || '',
    country: invoice.sellerCountry || '',
    vatId: invoice.sellerTaxId || '',
  },
  client: {
    company: invoice.buyerName || '',
    address: invoice.buyerAddress || '',
    zip: invoice.buyerZip || '',
    city: invoice.buyerCity || '',
    country: invoice.buyerCountry || '',
    vatId: invoice.buyerTaxId || '',
  },
  products: invoice.invoiceItems.map((item) => ({
    quantity: item.quantity,
    name: item.name,
    tax: item.tax,
    price: item.price,
    discount: item.discount,
    net: item.net,
    gross: item.gross,
  })),
})