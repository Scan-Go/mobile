import React, {
  ReactElement,
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react';
import {
  AlertDialog,
  AlertDialogActionProps,
  Button,
  XStack,
  YStack
} from 'tamagui';

export interface IFireAlertDialog {
  title: string;
  desc?: string;
  actions: ReactElement<AlertDialogActionProps>[];
}

export interface IAlertDialogRef {
  fire: (options: IFireAlertDialog) => void;
  dismiss: () => void;
}

export const alertDialogRef = createRef<IAlertDialogRef>();

function _AlertDialog(_: any, ref: any) {
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string | undefined>();
  const [actions, setActions] =
    useState<ReactElement<AlertDialogActionProps>[]>();
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        fire: (options: IFireAlertDialog) => {
          setTitle(options.title);
          setDesc(options.desc);
          setActions(options.actions);
          setIsOpen(true);
        },
        dismiss: () => {
          setIsOpen(false);
        }
      }),
      []
    )
  );

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            aria-describedby={desc}
            bordered
            elevate
            key="content"
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
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack space>
              <AlertDialog.Title>{title}</AlertDialog.Title>
              <AlertDialog.Description>{desc}</AlertDialog.Description>

              <XStack
                space="$3"
                justifyContent="flex-end"
              >
                <AlertDialog.Cancel asChild>
                  <Button onPress={() => setIsOpen(false)}>Cancel</Button>
                </AlertDialog.Cancel>

                {actions?.map((Action, index) => Action)}
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  );
}

export default forwardRef(_AlertDialog);
