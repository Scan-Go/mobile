import { X } from '@tamagui/lucide-icons';
import React, { PropsWithChildren } from 'react';
import { Adapt, Button, Dialog, Unspaced } from 'tamagui';
import AppSheet from './sheet';

interface IProps extends PropsWithChildren {
  title: string;
  description: string;
  trigger: React.ReactNode;
  snapPointsAsPercent?: number[];
}
export default function AppDialog({
  title,
  trigger,
  description,
  snapPointsAsPercent,
  children
}: IProps) {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Adapt
        when="sm"
        platform="touch"
      >
        <AppSheet snapPointsAsPercent={snapPointsAsPercent}>
          <Adapt.Contents />
        </AppSheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true
              }
            }
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>

          {children}

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
