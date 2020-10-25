import { useLocation, useParams, useHistory } from 'react-router-dom';
import { removeSlug } from './utils';
import { ROUTER_URL } from '../../../../common/Constant';
import { useMemo } from 'react';
import { useRecoilValueLoadable, atom } from 'recoil';
import { allMerchantsFetchingState } from '../states';

// MerchantDetail page is used for 2 types of page: DetailMerchant & AddMerchant
// The below hook allow to get the type of page:
export const useMerchantDetailType = () => {
  const { pathname } = useLocation();

  // DETAIL | ADD | ERROR
  const pageType = useMemo(() => {
    if (pathname.includes(removeSlug(ROUTER_URL.MERCHANT_DETAIL_PAGE))) {
      return 'DETAIL';
    } else if (pathname.includes(removeSlug(ROUTER_URL.MERCHANT_ADD_PAGE))) {
      return 'ADD';
    } else {
      return `Something's wrong`;
    }
  }, [pathname]);

  return pageType;
};

// When page type is DetailMerchant, not AddMerchant,
// The hook below allow to get the data detail of that merchant to display in MerchantDetail page
export const useMerchantDetailData = () => {
  const { id: merchantId } = useParams(); // get merchant-id from url's param
  const { state, contents: allMerchants } = useRecoilValueLoadable(allMerchantsFetchingState); // get all merchants

  // get the history of the merchant with id is equal to merchant-id
  const merchant = useMemo(() => {
    return state === 'hasValue' ? allMerchants?.find((it) => it.id == merchantId) : null;
  }, [allMerchants, merchantId, state]);

  const pageType = useMerchantDetailType();

  const history = useHistory();
  if (pageType === 'DETAIL' && !merchant) {
    // if in detail page but cannot find merchant detail data
    history.push(ROUTER_URL.MERCHANTS_PAGE); // then navigate to merchant-list page
    return {
      isDetail: false,
    };
  }

  return {
    isDetail: pageType === 'DETAIL', // whether page type is DETAIL, not ADD (If there is the 3rd type of page, then we need to rewrite these
    merchantData: merchant, // data of the merchant to display in detail page.
  };
};
