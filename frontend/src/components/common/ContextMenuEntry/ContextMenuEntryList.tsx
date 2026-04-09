import { memo } from 'react';
import ContextMenuEntry, { type ContextMenuItem } from './ContextMenuEntry';

const ContextMenuList = ({
  items,
  isMobile = false,
}: {
  items: ContextMenuItem[];
  isMobile?: boolean;
}) => {
  const groupedItems = items.reduce<ContextMenuItem[][]>(
    (acc, item) => {
      if (item.variant === 'separator') {
        const lastGroup = acc[acc.length - 1];
        if (lastGroup && lastGroup.length > 0) {
          acc.push([]);
        }
      } else {
        const lastGroup = acc[acc.length - 1];
        if (lastGroup) {
          lastGroup.push(item);
        }
      }
      return acc;
    },
    [[]],
  );

  return (
    <div role="menu" className="flex flex-col">
      {groupedItems.map((group, groupIndex) => {
        if (group.length === 0) {
          return null;
        }

        return (
          <div
            key={group[0]?.label || groupIndex}
            className={isMobile ? 'mb-3 last:mb-0 shadow-sm' : 'border-b last:border-0'}
          >
            {group.map((item, itemIndex) => (
              <ContextMenuEntry
                key={item.label || itemIndex}
                isFirst={itemIndex === 0}
                isLast={itemIndex === group.length - 1}
                isMobile={isMobile}
                {...item}
              />
            ))}
            {groupIndex < groupedItems.length - 1 && <div className="my-1" />}
          </div>
        );
      })}
    </div>
  );
};

export default memo(ContextMenuList);
