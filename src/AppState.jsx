import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  AtomEffect
} from 'recoil';
import { recoilPersist } from 'recoil-persist'
import {
    DEFAULT_CLIENT_LIST_SORT_BY_VALUE,
    DEFAULT_ASSOCIATE_LIST_SORT_BY_VALUE,
    DEFAULT_CLIENT_STATUS_FILTER_OPTION,
    DEFAULT_ORDER_LIST_SORT_BY_VALUE
} from "./Constants/App";


// Control whether the hamburer menu icon was clicked or not. This state is
// needed by 'TopNavigation' an 'SideNavigation' components.
export const onHamburgerClickedState = atom({
  key: 'onHamburgerClicked', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Control what message to display at the top as a banner in the app.
export const topAlertMessageState = atom({
  key: 'topBannerAlertMessage',
  default: "",
});

// Control what type of message to display at the top as a banner in the app.
export const topAlertStatusState = atom({
  key: 'topBannerAlertStatus',
  default: "success",
});

// https://github.com/polemius/recoil-persist
const { persistAtom } = recoilPersist()

export const currentUserState = atom({
  key: 'currentUser',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const clientFilterJoinDatetState = atom({
    key: 'clientFilterJoinDatetState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const clientFilterStatusState = atom({
    key: 'clientFilterStatusState',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const clientFilterTypeState = atom({
    key: 'clientFilterTypeState',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const clientFilterSortState = atom({
    key: 'clientFilterSortState',
    default: "last_name,ASC",
    effects_UNSTABLE: [persistAtom],
});

// Control whether to show filters for the list.
export const clientFilterShowState = atom({
    key: 'clientFilterShowState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const clientFilterTemporarySearchTextState = atom({
    key: 'clientFilterTemporarySearchTextState',
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const clientFilterActualSearchTextState = atom({
    key: 'clientFilterActualSearchTextState',
    default: "",
    effects_UNSTABLE: [persistAtom],
});
