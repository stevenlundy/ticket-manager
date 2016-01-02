module.exports = [
  {
    patron_number: 'A0001',
    order_type: 'online',
    date_purchased: new Date('Jan 1, 2016'),
    new: false,
    items: [
      {
        item_sku: '10506Adt',
        quantity: 2
      },
      {
        item_sku: '10506Stu',
        quantity: 1
      }
    ],
    donation: 24.50
  },
  {
    patron_number: 'A0002',
    order_type: 'online',
    date_purchased: new Date('Dec 29, 2015'),
    new: true,
    items: [
      {
        item_sku: '20506Sen',
        quantity: 1
      }
    ]
  },
  {
    patron_number: 'A0002',
    order_type: 'online',
    date_purchased: new Date('Dec 30, 2015'),
    new: true,
    donation: 500
  }
];
