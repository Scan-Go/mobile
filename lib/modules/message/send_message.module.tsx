import Button from '@lib/components/button';
import { QueryKeys } from '@lib/models/query_keys.model';
import { IMessage, IMessageWithProfiles } from '@lib/models/room.model';
import { IUser } from '@lib/models/user.model';
import { messagesService } from '@lib/services/message.service';
import { useAuthStore } from '@lib/store/auth.store';
import { PostgrestError } from '@supabase/supabase-js';
import { CheckCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'tamagui';

interface IProps {
  toUserUid: string;
  toUser: IUser;
}

interface SendMessageMutationVariables {
  fromId: string;
  toId: string;
  message: string;
}

interface IPredefinedMessages {
  id: number;
  name: string;
}

const messages: IPredefinedMessages[] = [
  {
    id: 1,
    name: 'Hej'
  },
  {
    id: 2,
    name: 'Hej, ditt fönster är öppet.'
  },
  {
    id: 3,
    name: 'Hej, du har parkerat fel.'
  }
];

export default function SendMessageModule(props: IProps) {
  const [selectedMessage, setSelectedMessage] = useState<IPredefinedMessages>();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const { show: showToast } = useToastController();
  const compareWith = useCallback(
    (o1: IPredefinedMessages, o2: IPredefinedMessages) => {
      return o1.id === o2.id;
    },
    []
  );

  const sendMessageMutation = useMutation<
    IMessageWithProfiles,
    PostgrestError,
    SendMessageMutationVariables
  >({
    mutationFn: ({ fromId, message, toId }) => {
      return messagesService.sendMessage(fromId, toId, message);
    },

    onSuccess(data) {
      queryClient.setQueryData<IMessage[]>(
        [QueryKeys.Chat, data.roomId],
        (v) => {
          const updatedState = produce(v, (draft) => {
            draft?.push(data);
          });

          return updatedState;
        }
      );
    }
  });

  const sendMessage = useCallback(async () => {
    sendMessageMutation
      .mutateAsync({
        fromId: user!.id,
        message: selectedMessage?.name ?? 'Hej!',
        toId: props.toUserUid
      })
      .then(onSuccess)
      .catch(onFailure);

    function onSuccess() {
      showToast('Skickat meddelande!', { toastType: 'success' });
    }

    function onFailure(e: unknown) {
      showToast('Fel!', { toastType: 'error' });
    }
  }, [selectedMessage]);

  const renderItem = useCallback(
    ({ item }: { item: IPredefinedMessages }) => {
      const isSelected = selectedMessage?.id === item.id;
      return (
        <ListItem
          icon={isSelected ? <CheckCircle /> : undefined}
          title={item.name}
          onPress={() => setSelectedMessage(item)}
          cursor="pointer"
          bg={isSelected ? '$backgroundStrong' : '$background'}
        />
      );
    },
    [selectedMessage]
  );

  const listFooter = useCallback(() => {
    return (
      <Button
        mt="$5"
        theme="active"
        onPress={sendMessage}
      >
        Skicka meddelande
      </Button>
    );
  }, []);

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      ListFooterComponent={listFooter}
    />
  );
}
