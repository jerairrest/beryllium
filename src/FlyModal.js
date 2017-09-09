import modalFactory from './modalFactory';
import appendVendorPrefix from 'domkit/appendVendorPrefix';
import { keyframes } from 'emotion';

const animation = {
    show: {
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-out',
    },
    hide: {
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-out',
    },
    showContentAnimation: keyframes`
        0% {
            opacity: 0;
            transform: translate3d(calc(-100vw - 50%), 0, 0);
        }
        50% {
            opacity: 1;
            transform: translate3d(100px, 0, 0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    `,
    hideContentAnimation: keyframes`
        0% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
        50% {
            opacity: 1;
            transform: translate3d(-100px, 0, 0) scale3d(1.1, 1.1, 1);
        }
        100% {
            opacity: 0;
            transform: translate3d(calc(100vw + 50%), 0, 0);
        }
    `,
    showBackdropAnimation: keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 0.9;
        }
    `,
    hideBackdropAnimation: keyframes`
        0% {
            opacity: 0.9;
        }
        100% {
            opacity: 0;
        }
    `,
};

const showAnimation = animation.show;
const hideAnimation = animation.hide;
const showContentAnimation = animation.showContentAnimation;
const hideContentAnimation = animation.hideContentAnimation;
const showBackdropAnimation = animation.showBackdropAnimation;
const hideBackdropAnimation = animation.hideBackdropAnimation;

export default modalFactory({
    getRef: (closing) => {
        return 'content';
    },
    getModalStyle: (closing) => {
        return appendVendorPrefix({
            zIndex: 1050,
            position: 'fixed',
            width: '500px',
            transform: 'translate3d(-50%, -50%, 0)',
            top: '50%',
            left: '50%',
        });
    },
    getBackdropStyle: (closing) => {
        return appendVendorPrefix({
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
            backgroundColor: '#373A47',
            animationFillMode: 'forwards',
            animationDuration: '0.3s',
            animationName: closing ? hideBackdropAnimation : showBackdropAnimation,
            animationTimingFunction: (closing ? hideAnimation : showAnimation).animationTimingFunction,
        });
    },
    getContentStyle: (closing) => {
        return appendVendorPrefix({
            margin: 0,
            backgroundColor: 'white',
            animationDuration: (closing ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: closing ? hideContentAnimation : showContentAnimation,
            animationTimingFunction: (closing ? hideAnimation : showAnimation).animationTimingFunction,
        });
    },
});
