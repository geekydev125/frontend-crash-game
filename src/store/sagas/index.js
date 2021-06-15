import { all }                        from 'redux-saga/effects';
import { REHYDRATE }                  from 'redux-persist';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';

// Types
import { AuthenticationTypes } from '../actions/authentication';
import { EventTypes }          from '../actions/event';
import { BetTypes }            from '../actions/bet';
import { UserTypes }           from '../actions/user';

// Actions
import { EventActions } from '../actions/event';

// Sagas
import AuthenticationSagas       from './authentication';
import AlertSagas                from './alert';
import EventSagas                from './event';
import BetSagas                  from './bet';
import UserSagas                 from './user';
import { UserActions }           from '../actions/user';
import { AuthenticationActions } from '../actions/authentication';
import { BetActions }            from '../actions/bet';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([AuthenticationTypes.LOGOUT],                         AuthenticationSagas.logout),
        takeLatest([AuthenticationTypes.VERIFY_SMS],                     AuthenticationSagas.verifySms),
        takeLatest([AuthenticationTypes.REQUEST_SMS],                    AuthenticationSagas.requestSms),
        takeLatest([AuthenticationTypes.SET_EMAIL],                      AuthenticationSagas.setAdditionalInformation),
        takeLatest([AuthenticationTypes.FETCH_REFERRALS],                AuthenticationSagas.fetchReferrals),
        takeLatest([AuthenticationTypes.FETCH_REFERRALS_SUCCEEDED],      AuthenticationSagas.fetchReferralsSucceeded),
        takeLatest([
            AuthenticationTypes.VERIFY_SMS_SUCCEEDED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED,
        ],                                                                      AuthenticationSagas.authenticationSucceeded),
        takeLatest([
            AuthenticationTypes.REQUEST_SMS_FAILED,
            AuthenticationTypes.VERIFY_SMS_FAILED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED,
            AuthenticationTypes.FETCH_REFERRALS_FAILED,
            EventTypes.FETCH_ALL_FAILED,
            BetTypes.CREATE_FAILED,
            BetTypes.PLACE_FAILED,
            BetTypes.PULL_OUT_BET_FAILED,
        ],                                                                      AlertSagas.handleFail),
        takeLatest([
            BetTypes.CREATE_SUCCEEDED,
            BetTypes.PLACE_SUCCEEDED,
            BetTypes.PULL_OUT_BET_SUCCEEDED,
        ],                                                                      AlertSagas.handleSuccess),
        takeLatest([EventTypes.FETCH_ALL],                               EventSagas.fetchAll),
        takeLatest([EventTypes.FETCH_ALL_SUCCEEDED],                     EventSagas.fetchAllSucceeded),
        takeLatest([BetTypes.PLACE],                                     BetSagas.place),
        takeLatest([BetTypes.CREATE],                                    BetSagas.create),
        takeLatest([BetTypes.SET_COMMITMENT],                            BetSagas.setCommitment),
        takeEvery( [BetTypes.FETCH_OUTCOMES],                            BetSagas.fetchOutcomes),
        takeLatest([BetTypes.FETCH_OPEN_BETS],                           BetSagas.fetchOpenBets),
        takeLatest([BetTypes.FETCH_OPEN_BETS_SUCCEEDED],                 BetSagas.fetchOpenBetsSucceeded),
        takeEvery( [BetTypes.PULL_OUT_BET],                              BetSagas.pullOut),
        takeEvery( [UserTypes.FETCH],                                    UserSagas.fetch),
        takeEvery( [UserTypes.FETCH_SUCCEEDED],                          UserSagas.fetchSucceeded),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.restoreToken),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.refreshImportantData),
        takeLatest([REHYDRATE],                                          rehydrationDone),
        // @formatter:on
    ]);
};

const rehydrationDone = function* () {
    yield preLoading();
};

const preLoading = function* () {
    yield put(EventActions.fetchAll());
    yield put(AuthenticationActions.fetchReferrals());
    yield put(BetActions.fetchOpenBets());
};

export default {
    root,
};
