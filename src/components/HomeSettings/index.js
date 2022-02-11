import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from '../Icon';

const HomeSettings = ({
  loggedIn,
  profilePic,
  onWalletClick,
  onEventsClick,
  onActivitiesClick,
  onLeaderboardClick,
  onEditClick,
  onReferralsClick,
  onEmailNotificationClick,
  onLogoutClick,
  onCloseProfile,
  onKycInfoClick,
  onProfileClick,
}) => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingContainer}>
        {loggedIn && (
          <>
            <div
              onClick={onProfileClick}
              className={classNames(styles.singleSettingHolder)}
            >
              <Icon className={styles.referralIcon} iconType={'userProfile'} />
              <p className={styles.settingTitle}>My Profile</p>
            </div>
          </>
        )}
        <div
          onClick={onEventsClick}
          className={classNames(styles.singleSettingHolder)}
        >
          <Icon className={styles.referralIcon} iconType={'game'} />
          <p className={styles.settingTitle}>Events</p>
        </div>
        {loggedIn && (
          <div
            onClick={onWalletClick}
            className={classNames(styles.singleSettingHolder)}
          >
            <Icon className={styles.referralIcon} iconType={'wallet3'} />
            <p className={styles.settingTitle}>Wallet</p>
          </div>
        )}
        <div
          onClick={onActivitiesClick}
          className={classNames(styles.singleSettingHolder)}
        >
          <Icon className={styles.referralIcon} iconType={'activities'} />
          <p className={styles.settingTitle}>Activities</p>
        </div>
        <div
          onClick={onLeaderboardClick}
          className={classNames(styles.singleSettingHolder)}
        >
          <Icon className={styles.referralIcon} iconType={'leaderboard'} />
          <p className={styles.settingTitle}>Leaderboard</p>
        </div>
        {loggedIn && (

        <>
          <div
            onClick={onEditClick}
            className={classNames(
              styles.singleSettingHolder
            )}
          >
            <Icon className={styles.referralIcon} iconType={'profile'} />
            <p className={styles.settingTitle}>Edit my Profile</p>
          </div>
          <div
            onClick={() => onKycInfoClick()}
            className={classNames(
              styles.singleSettingHolder
            )}
          >
            <Icon className={styles.referralIcon} iconType={'question'} />
            <p className={styles.settingTitle}>KYC Verification</p>
          </div>
          <div
            className={classNames(
              styles.singleSettingHolder
            )}
            onClick={() => onReferralsClick()}
          >
            <Icon className={styles.referralIcon} iconType={'referral'} />
            <p className={styles.settingTitle}>Referrals</p>
          </div>

            <div
              className={classNames(styles.singleSettingHolder)}
              onClick={onLogoutClick}
            >
              <Icon className={styles.referralIcon} iconType={'logout'} />
              <p className={styles.settingTitle}>Logout</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeSettings;
