const dataSource = [
  {
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  },
];

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 200,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <a>Delete</a>,
  },
];

const menus = [
  {
    key: '/home',
    name: '首页',
    type: 'home'
  },
  {
    key: 'purchase',
    name: '采购',
    type: 'home',
    subData: [
      {
        key: '/purchase/order',
        name: '采购订单',
      }
    ]
  },
  {
    key: 'work',
    name: '加工',
    type: 'home',
    subData: [
      {
        key: 'finishedProduct',
        name: '成品委托生产',
        subData: [
          {
            key: '/FP/order',
            name: '成品委托生产订单',
          }
        ],
      }
    ]
  }
];

export {
  columns,
  dataSource,
  menus,
}