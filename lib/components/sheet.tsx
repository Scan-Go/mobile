import { PropsWithChildren } from 'react';
import { Sheet } from 'tamagui';

interface IProps extends PropsWithChildren {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  snapPointsAsPercent?: number[];
}
export default function AppSheet({
  isOpen,
  onOpenChange,
  snapPointsAsPercent,
  children
}: IProps) {
  return (
    <Sheet
      forceRemoveScrollEnabled={isOpen}
      modal
      open={isOpen}
      onOpenChange={onOpenChange}
      snapPoints={snapPointsAsPercent ?? [50, 75]}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="medium"
      unmountChildrenWhenHidden
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        bg="$backgroundTransparent"
      />
      <Sheet.Handle />
      <Sheet.Frame
        padding="$4"
        space="$5"
      >
        {children}
      </Sheet.Frame>
    </Sheet>
  );
}
