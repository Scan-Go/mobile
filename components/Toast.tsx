import { Toast as IToast, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui';

export const Toast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <IToast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <IToast.Title>{currentToast.title}</IToast.Title>
        {!!currentToast.message && (
          <IToast.Description>{currentToast.message}</IToast.Description>
        )}
      </YStack>
    </IToast>
  );
};
