import { atom, selector, selectorFamily } from 'recoil';
import { getAllMerchants } from './data';

// Conventions:
// - Normal atom state: myState
// - Asynchronous state: myFetchingState
// - Derived state (selector) from other states: mySelector

export const representativeModalState = atom({
  key: 'MerchantList/representativeModalState',
  default: {
    isShow: false,
    merchantToShow: null,
  },
});

export const confirmDecisionModalState = atom({
  key: 'MerchantList/confirmDecisionModalState',
  default: {
    isShow: false,
    type: null, // APPROVE | REJECT | SUSPEND
    merchantToShow: null,
  },
});

export const searchKeywordState = atom({
  key: 'MerchantList/searchKeywordState',
  default: '',
});

export const currentTabState = atom({
  key: 'MerchantList/currentTabState',
  default: 'ALL', // ALL | PENDING | ACTIVE | SUSPENDED
});

// How to refresh an asynchronous selector: https://github.com/facebookexperimental/Recoil/issues/85
export const forceUpdateAllMerchantsFetchingState = atom({
  key: 'Merchants/forceUpdateAllMerchantsFetchingState',
  default: 0,
});

export const allMerchantsFetchingState = selector({
  key: 'Merchants/allMerchantsFetchingState',
  get: ({ get }) => {
    get(forceUpdateAllMerchantsFetchingState);
    console.log('abc')
    return getAllMerchants();
  },
});

export const merchantsByTabsSelector = selector({
  key: 'MerchantList/merchantsByTabSelector',
  get: ({ get }) => {
    const allMerchants = get(allMerchantsFetchingState);
    return {
      allMerchants,
      pendingMerchants: allMerchants.filter((it) => it.acceptStatus === 'PENDING'),
      activeMerchants: allMerchants.filter((it) => it.acceptStatus === 'ACTIVE'),
      suspendedMerchants: allMerchants.filter((it) => it.acceptStatus === 'SUSPENDED'),
    };
  },
});

export const merchantsAfterFiltersSelector = selector({
  key: 'MerchantList/merchantsAfterFiltersSelector',
  get: ({ get }) => {
    const currentTab = get(currentTabState);
    const searchKeyword = get(searchKeywordState);
    const merchants = get(merchantsByTabsSelector);

    // Pipeline: All(Pre-filter) -> FilterByTab -> FilterByKeyword

    // Step 1: FilterByTab:
    let filteredByTab;
    switch (currentTab) {
      case 'ALL':
        filteredByTab = merchants.allMerchants;
        break;
      case 'PENDING':
        filteredByTab = merchants.pendingMerchants;
        break;
      case 'ACTIVE':
        filteredByTab = merchants.activeMerchants;
        break;
      case 'SUSPENDED':
        filteredByTab = merchants.suspendedMerchants;
        break;
      default:
        throw Error('unreachable');
    }

    // Step 2: FilterByKeyword:
    if (!searchKeyword) return filteredByTab;

    // copied from: https://github.com/loia5tqd001/Phonee/blob/f6861fec6d9399f1437248be0143376d3ed8b507/src/components/atoms/search-suggestion.utils.js
    const searchRegex = new RegExp(searchKeyword?.trim(), 'i');

    const filteredByKeyword = filteredByTab.filter(
      (merchant) =>
        searchRegex.test(merchant.shop.brand) || // search by brand name
        merchant.shop.categories.some((it) => searchRegex.test(it.name)), // search by categories
    );

    // Step 3: return result:
    return filteredByKeyword;
  },
});
