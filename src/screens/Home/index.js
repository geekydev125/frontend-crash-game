import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';

import styles from './styles.module.scss';
import GameCards from '../../components/GameCards';

import { useIsMount } from 'components/hoc/useIsMount';
import { useHistory, useLocation } from 'react-router-dom';
import useOAuthCallback from 'hooks/useOAuthCallback';
import { LOGGED_IN } from 'constants/AuthState';
import classNames from 'classnames';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import { Grid } from '@material-ui/core';
import { GeneralActions } from 'store/actions/general';
import { PopupActions } from 'store/actions/popup';
import { OnboardingActions } from 'store/actions/onboarding';
import { connect, useDispatch, useSelector } from 'react-redux';
import EventActivitiesTabs from 'components/EventActivitiesTabs';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import EventsCarouselContainer from 'components/EventsCarouselContainer';
import Routes from 'constants/Routes';

import PumpDumpBanner from 'data/backgrounds/home/pumpdump-banner.jpg';
import ElonBanner from 'data/backgrounds/home/elon-banner.jpg';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import { UserActions } from 'store/actions/user';
import { TOKEN_NAME } from 'constants/Token';
import { selectUser } from 'store/selectors/authentication';
import DiscordWidget from 'components/DiscordWidget';

const Home = (
  authState,
  showPopup,
  events,
  startOnboardingFlow,
  userId,
  updateUser,
) => {
  const history = useHistory();
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);

  useOAuthCallback();

  const isLoggedIn = useMemo(() => {
    return authState?.authState === LOGGED_IN;
  }, [authState]);

  

  // const showPopupForUnauthenticated = () => {
  //   if (!isLoggedIn()) {
  //     startOnboardingFlow();
  //   }
  // };

  useEffect(() => {
    if (isLoggedIn && !userState.phoneConfirmed) {
      dispatch(OnboardingActions.addPhoneNumber());
    }
  }, [isLoggedIn, userState.phoneConfirmed]);

  const renderGamesBanner = () => {
    return (

      <div className={styles.gameBannerContainer}>
        <div className={styles.title}>
          <h2>🎮 Discover our Games</h2>
        </div>
        <div className={styles.games}>
          <div onClick={() => history.push(Routes.elonGame)} className={styles.gameBanner}>
            <img src={ElonBanner} alt="Elon Game banner" />
            <span className={styles.bannerTitle}>Play the<br />Elon Game</span>
            <Button
              theme={ButtonTheme.primaryButtonM}
              className={styles.bannerButton}
            >
              Play now
            </Button>
          </div>
          <div onClick={() => history.push(Routes.pumpdumpGame)} className={styles.gameBanner}>
            <img src={PumpDumpBanner} alt="Pump Dump Game banner" />
            <span className={styles.bannerTitle}>Let's play<br />Pump &amp; Dump</span>
            <Button
              theme={ButtonTheme.primaryButtonM}
              className={styles.bannerButton}
            >
              Play now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderActivities = () => {
    return (
      <div className={styles.activities}>
        <div className={styles.title}>
          <h2>Activities</h2>
        </div>
        <Grid item xs={12}>
          <EventActivitiesTabs
            activitiesLimit={50}
            className={styles.activitiesTrackerGamesBlock}
            preselectedCategory={'game'}
            hideSecondaryColumns={true}
            hideFirstColumn={true}
            layout="wide"
          ></EventActivitiesTabs>
        </Grid>
      </div>
    );
  };


  return (
    <BaseContainerWithNavbar withPaddingTop={true} carouselType='landingpage'>
      <CustomCarousel carouselType={'landingpage'} />
      
      <div className={styles.container}>
        <DiscordWidget />
        <EventsCarouselContainer 
          title={'🔥 Most popular Events'}
          titleLink={'Show all events'}
          orderBy={'most_popular'}
          titleLinkTo={Routes.getRouteWithParameters(Routes.events, {category: 'all'})}
        />

        <EventsCarouselContainer 
          title={'✨ Latest Events Added'}
          titleLink={'Show all events'}
          category={'all'}
          titleLinkTo={Routes.getRouteWithParameters(Routes.events, {category: 'all'})}
        />

        <EventsCarouselContainer 
          title={'⏱️ Events ending soon'}
          titleLink={'Show all events'}
          category={'all'}
          orderBy={'bet_end_date'}
          order={'ASC'}
          titleLinkTo={Routes.getRouteWithParameters(Routes.events, {category: 'all'})}
        />

        {renderGamesBanner()}

        {renderActivities()}
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    tags: state.event.tags,
    events: state.event.events,
    userId: state.authentication.userId,
    phoneConfirmed: state.phoneConfirmed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    startOnboardingFlow: () => {
      dispatch(OnboardingActions.start());
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(Home);
export default memo(Connected);
