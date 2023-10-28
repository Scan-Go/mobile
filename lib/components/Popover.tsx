import React from 'react';
import { Adapt, Popover } from 'tamagui';

interface IProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function PopOver(props: IProps) {
  return (
    <Popover
      size="$5"
      allowFlip
      {...props}
    >
      <Popover.Trigger asChild>{props.trigger}</Popover.Trigger>

      <Adapt
        when="sm"
        platform="touch"
      >
        <Popover.Sheet
          modal
          dismissOnSnapToBottom
        >
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true
            }
          }
        ]}
      >
        {props.children}
      </Popover.Content>
    </Popover>
  );
}
