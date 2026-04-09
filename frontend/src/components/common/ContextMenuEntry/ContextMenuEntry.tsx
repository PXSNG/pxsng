import { useContextMenu } from '@providers/ContextMenuProvider';
import { memo, ReactNode, useCallback, useMemo } from 'react';

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: 'default' | 'danger' | 'separator';
  disabled?: boolean;
  className?: string;
  isMobile?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const ContextMenuEntry = ({
  label,
  onClick,
  icon,
  variant = 'default',
  disabled = false,
  isMobile = false,
  isFirst,
  isLast,
  className,
}: ContextMenuItem) => {
  const { closeContextMenu } = useContextMenu();

  const variantClasses = {
    default: 'text-white',
    danger: 'text-red-500 hover:bg-red-600/20',
    separator: '',
  };

  const styles = {
    mobile: {
      entry: 'px-4 py-3 flex items-center space-x-3 select-none transition-colors text-base',
    },
    desktop: {
      entry:
        'px-4 py-1.5 rounded-lg flex items-center space-x-2 select-none transition-colors text-sm',
    },
  };

  const getRoundingClasses = useMemo(() => {
    if (!isMobile) return 'hover:bg-lighter';

    // Single Item in a group
    if (isFirst && isLast) return 'rounded-xl';

    if (isFirst) return 'rounded-t-xl';
    // Border to continue legacy
    if (isLast) return 'rounded-b-xl border-t border-gray-500/50';

    // No rounding for middle items, but add a separator  ;)
    return 'border-t border-gray-500/50';
  }, [isFirst, isLast, isMobile]);

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
      closeContextMenu();
    }
  }, [disabled, onClick, closeContextMenu]);

  return (
    <div
      role="menuitem"
      className={`
        ${isMobile ? styles.mobile.entry : styles.desktop.entry}
        ${variantClasses[variant]}
        ${getRoundingClasses}
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer active:scale-[0.98] transition-transform'
        }
        ${className || ''}`}
      onClick={handleClick}
    >
      {icon && <div className="text-lg opacity-80">{icon}</div>}
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default memo(ContextMenuEntry);
