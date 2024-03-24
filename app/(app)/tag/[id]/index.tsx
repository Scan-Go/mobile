import Button from '@lib/components/button';
import ProfileView from '@lib/components/profile_view';
import Screen from '@lib/components/screen';
import AppSheet from '@lib/components/sheet';
import { useAlertDialog } from '@lib/hooks/useAlertDialog';
import { QueryKeys } from '@lib/models/query_keys.model';
import SendMessageModule from '@lib/modules/message/send_message.module';
import { ITagWithRelations, tagService } from '@lib/services/tag.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, {
  Suspense,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { AlertDialog, Spinner } from 'tamagui';

export default function TagScreen() {
  const { id: tagUid } = useLocalSearchParams();
  const navigation = useNavigation();
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const { showAlertDialog, dismissDialog } = useAlertDialog();
  const tagQuery = useQuery<ITagWithRelations | null>({
    queryKey: [QueryKeys.Tag, tagUid],
    queryFn: () => tagService.fetchTag(tagUid as string)
  });

  useLayoutEffect(() => {
    if (tagQuery.isSuccess) {
      navigation.setOptions({
        title: `${tagQuery.data?.profiles?.firstName} ${tagQuery.data?.profiles?.lastName}`
      });
    }
  }, [tagQuery.data]);

  const [isSendMessageSheetOpen, setIsSendMessageSheetOpen] =
    useState<boolean>(false);

  const profileData = useMemo(() => tagQuery.data?.profiles, [tagQuery]);

  const sendMessage = useCallback(() => {
    setIsSendMessageSheetOpen((state) => !state);
  }, []);

  const userLatestNote = useMemo(() => {
    if (!tagQuery.isSuccess) return '';

    if (tagQuery.data && tagQuery.data?.notes.length > 0) {
      return tagQuery.data.notes[0].content;
    }

    return tagQuery.data?.note;
  }, [tagQuery]);

  const phoneData = useMemo(() => {
    return tagQuery.data?.profiles?.phone_numbers ?? undefined;
  }, [tagQuery]);

  const socialMediaAccountsData = useMemo(() => {
    return tagQuery.data?.profiles?.social_media_accounts ?? undefined;
  }, [tagQuery]);

  if (!tagQuery?.data) {
    showAlertDialog({
      title: 'Kunde inte hitta taggen!',
      actions: [
        <AlertDialog.Action asChild>
          <Button
            theme="active"
            onPress={() => {
              dismissDialog();
              router.push('/');
            }}
          >
            Gå tillbaka
          </Button>
        </AlertDialog.Action>
      ]
    });

    return;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Screen>
        <ProfileView
          bioContent={userLatestNote!}
          bioText="Anteckning"
          profileData={profileData!}
          onSendMessage={sendMessage}
          phoneData={phoneData}
          socialData={socialMediaAccountsData}
          isSignedIn={isSignedIn}
          showSendMessageBtn={profileData?.sendMessageAllowed}
        />

        <AppSheet
          isOpen={isSendMessageSheetOpen}
          onOpenChange={setIsSendMessageSheetOpen}
        >
          <SendMessageModule
            toUser={profileData!}
            toUserUid={profileData?.id!}
          />
        </AppSheet>
      </Screen>
    </Suspense>
  );
}
