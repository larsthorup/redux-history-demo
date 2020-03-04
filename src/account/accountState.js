export const initialState = {
  transaction: {
    '1': {
      id: '1',
      text: 'DK BlackSwan',
      amount: '-45.00',
      accountName: 'Lars'
    },
    '2': {
      id: '2',
      text: 'DK SuperB Gentofte B',
      amount: '-241.35',
      accountName: 'Sju'
    },
    '3': {
      id: '3',
      text: 'DK føtex food Gentoftegade',
      amount: '-31.95',
      accountName: 'Sju'
    },
    '4': {
      id: '4',
      text: 'DK emmerys (200)',
      amount: '-29.00',
      accountName: 'Lars'
    },
    '5': {
      id: '5',
      text: 'VDK GREENMOBILITY A/S',
      amount: '-20.00',
      accountName: 'Sju'
    }
  }
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
