import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShapes } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Contact from '~/components/Contact';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('fragment')}></div>
                <div className={cx('menu')}>
                    <ul className={cx('menu-list')}>
                        <li>
                            <a href="http://localhost:2002/lifestyle">LIFESTYLE</a>
                        </li>
                        <li>
                            <a href="http://localhost:2002/fashion">FASHION</a>
                        </li>
                        <li>
                            <a href="http://localhost:2002/cinema">CINEMA</a>
                        </li>
                        <li>
                            <a href="http://localhost:2002/grooming">GROOMING</a>
                        </li>
                    </ul>
                </div>
                <div className={cx('menu-contact')}>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <Tippy
                        render={(attrs) => (
                            <div className={cx('contact')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <Contact />
                                </PopperWrapper>
                            </div>
                        )}
                        placement="left-end"
                        interactive="true"
                    >
                        <button className={cx('bars')}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </Tippy>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
