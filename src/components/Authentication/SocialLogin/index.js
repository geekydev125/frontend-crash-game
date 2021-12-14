import Button from 'components/Button';
import HighlightTheme from 'components/Highlight/HighlightTheme';
import HighlightType from 'components/Highlight/HighlightType';
import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';
import AuthenticationType from '../AuthenticationType';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles }) => (
  <Button
    onClick={onClick}
    // withoutBackground={true}
    // highlightType={HighlightType.highlightModalButton}
    // highlightTheme={HighlightTheme.fillPink}
    className={styles.signInButton}
    disabledWithOverlay={true}
  >
    {children}
  </Button>
);

const SocialLogin = ({ styles, prepend = [], authenticationType }) => {
  const {
    initGoogleLogin,
    initFacebookLogin,
    initTwitchLogin,
    initDiscordLogin,
    isVisible
  } = useSocialLogins();

  const showNewFeatures =
    process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';
  const iconProps = {
    className: styles.buttonIcon,
  };

  const prefixText = authenticationType === AuthenticationType.register ? "Sign up" : "Login";

  return (
    <div className={styles.socialContainer}>
      {prepend.map(({ content, onClick }) => (
        <LoginButton styles={styles} onClick={onClick}>
          {content}
        </LoginButton>
      ))}
      {isVisible.google && 
        <LoginButton styles={styles} onClick={initGoogleLogin}>
          <Icon iconType={IconType.google} {...iconProps} />
          <p>Sign up with Google</p>
        </LoginButton>
      }
      {isVisible.twitch && 
        <LoginButton styles={styles} onClick={initTwitchLogin}>
          <Icon iconType={IconType.twitch} {...iconProps} />
          <p>Sign up with Twitch</p>
        </LoginButton>
      }
      {isVisible.discord &&
        <LoginButton styles={styles} onClick={initDiscordLogin}>
          <Icon iconType={IconType.discord} {...iconProps} />
          <p>Sign up with Discord</p>
        </LoginButton>
      }

      {/*
      showNewFeatures && <LoginButton styles={styles} onClick={initFacebookLogin}>
        <Icon iconType={IconType.facebook} {...iconProps} />
        <span>{prefixText} with Facebook</span>
      </LoginButton>
      */}
    </div>
  );
};

export default SocialLogin;
