 interface UloDineModal {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children?: React.ReactNode;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    centered?: boolean;
    overlayClassName?: string;
    modalClassName?: string;
    animation?: 'fade' | 'slide' | 'scale';
    duration?: number;
    preventScroll?: boolean;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    zIndex?: number;
    maxWidth?: string | number;
    maxHeight?: string | number;
    closeOnEsc?: boolean;
    initialFocusRef?: React.RefObject<HTMLElement>;
    finalFocusRef?: React.RefObject<HTMLElement>;
    returnFocusOnClose?: boolean;
    isCentered?: boolean;
    scrollBehavior?: 'inside' | 'outside';
    blockScrollOnMount?: boolean;
    motionPreset?: 'slideInBottom' | 'slideInRight' | 'scale' | 'none';
    // Action button props
    showActions?: boolean;
    cancelButtonText?: string;
    actionButtonText?: string;
    onAction?: () => void;
    actionButtonDisabled?: boolean;
    cancelButtonDisabled?: boolean;
    actionButtonLoading?: boolean;
}