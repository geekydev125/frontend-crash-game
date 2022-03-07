import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import Highlight from "../../components/Highlight";
import HighlightType from '../../components/Highlight/HighlightType';
import styles from './styles.module.scss';
import Image1 from '../../data/images/how-it-works/group-1.png'
import Image2 from '../../data/images/how-it-works/group-2.png';
import Image3 from '../../data/images/how-it-works/group-3.png';
import Medal from '../../data/images/how-it-works/medal.png';
import classNames from "classnames";
import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import { Link, useHistory } from "react-router-dom";
import LeaderboardJackpot from "../../components/LeaderboardJackpot";

const HowItWorks = () => {
  const history = useHistory();

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.howItWorks}>
        <h4 className={styles.supTitle}>JOIN THE RIDE.</h4>
        <h1 className={styles.title}>
          How it works
          <Highlight highlightType={HighlightType.highlightTitleUnderline} />
        </h1>
        {/* <div className={styles.video}>
          <video width="800" height="440" controls>
            <source
              src="https://files.wallfair.io/video-help/howto-playmoney.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div> */}
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.content}>
              <div className={styles.number}>01</div>
              <h1 className={styles.title}>
                Create your Account and get
                <span className={styles.highlighted}> 100 PFAIR for free</span>
              </h1>
              <div className={styles.description}>
                You get 100 PFAIR for free and have the chance to win 150USD
                every day keep in mind u can claim 100 PFAIR per day !
              </div>
            </div>
            <div>
              <img src={Image1} className={styles.image} alt="Group 1" />
            </div>
          </div>

          <div className={styles.step}>
            <div>
              <img src={Image2} className={styles.image} alt="Group 2" />
            </div>
            <div className={classNames(styles.content, styles.right)}>
              <div className={styles.number}>02</div>
              <h1 className={styles.title}>
                Create an event and
                <span className={styles.highlighted}>
                  {' '}
                  share with your friends & community
                </span>
              </h1>
              <div className={styles.description}>
                Create a fun event on which you would like to have people
                betting on, and share it with your family, friends and community
                to start a fun competition. Besides the betting competition, you
                as an event creator can profit from the volume of trading, while
                your friends could bet on the correct outcome to make a profit
                in PFAIR and maybe reaching the highest cash-out to earn the
                daily prize.
              </div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.content}>
              <div className={styles.number}>03</div>
              <h1 className={styles.title}>
                You can win
                <span className={styles.highlighted}>
                  {' '}
                  1 out of 3 prices per week
                </span>
              </h1>
              <div className={styles.description}>
                Wallfair will grant daily prizes worth US$ 150 (in ETH) for
                winners of our daily competition. Users who reach the 1st place
                in the following leaderboards will earn $50 each.
              </div>
              <div className={styles.ranking}>
                <div className={styles.item}>
                  <img src={Medal} alt="Medal" />
                  Highest multiplier cashed out in an Event
                </div>
                <div className={styles.item}>
                  <img src={Medal} alt="Medal" />
                  Highest cashout value from Elon Game and Pump & Dump
                </div>
                <div className={styles.item}>
                  <img src={Medal} alt="Medal" />
                  Creator of the event with highest volume
                </div>
              </div>
              <Button
                className={styles.button}
                theme={ButtonTheme.primaryButtonM}
                onClick={() => history.push('/events')}
              >
                Create Event now
              </Button>
            </div>
            <div>
              <img src={Image3} className={styles.image} alt="Group 3" />
            </div>
          </div>
        </div>

        <div className={styles.leaderboard}>
          <LeaderboardJackpot fetch={true} />
        </div>

        <a href={'/#leaderboard'} className={styles.leaderboardLink}>
          Go to daily leaderboard
        </a>
      </div>
    </BaseContainerWithNavbar>
  );
};

export default HowItWorks;