import { useActionSheet } from '@expo/react-native-action-sheet';
import EmptyFlatlist from '@lib/components/empty_flatlist';
import NoteCard from '@lib/components/home/note_card';
import { INoteWithTagName } from '@lib/models/note.model';
import { QueryKeys } from '@lib/models/query_keys.model';
import { queryClient } from '@lib/providers';
import { noteService } from '@lib/services/note.service';
import { useAuthStore } from '@lib/store/auth.store';
import { ActionSheetStyles } from '@lib/styles/ActionSheetStyles';
import { PostgrestError } from '@supabase/supabase-js';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { produce } from 'immer';
import { Suspense, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner, View, YStack, useTheme } from 'tamagui';
import { DeleteMutationVariables } from './home_notes.types';
import NewNoteDialogModule from './new_note_dialog.module';

export default function HomeNotesModule() {
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const { show } = useToastController();

  const notesQuery = useQuery<INoteWithTagName[], PostgrestError>({
    queryKey: [QueryKeys.Notes, user?.id],
    queryFn: () => noteService.fetchLatestNotes(user!.id)
  });

  const deleteNoteMutation = useMutation<void, void, DeleteMutationVariables>({
    mutationFn: ({ noteUid }) => noteService.deleteNote(noteUid),
    onSuccess(data, variables, context) {
      show('Raderat brakam', { toastType: 'success' });

      queryClient.setQueryData<INoteWithTagName[]>(
        [QueryKeys.Notes, user?.id],
        () => {
          const notes = queryClient.getQueryData<INoteWithTagName[]>([
            QueryKeys.Notes,
            user?.id
          ]);

          if (notes) {
            const updatedNotes = produce(notes, (draftData) => {
              const index = draftData.findIndex(
                (v) => v.id === variables.noteUid
              );

              if (index !== -1) {
                draftData.splice(index, 1);
              }
            });

            return updatedNotes;
          }

          return notes;
        }
      );
    }
  });

  const onPressItem = useCallback((item: INoteWithTagName) => {
    const options = ['Redigera', 'Radera', 'Avbryt'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;
    const editButtonIndex = 0;

    showActionSheetWithOptions(
      {
        title: item.content,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        ...ActionSheetStyles(theme)
      },
      async (selectedIndex) => {
        switch (selectedIndex) {
          case editButtonIndex:
            router.push({
              pathname: '/(app)/note/[id]/edit',
              params: { id: item.id }
            });
            break;

          case destructiveButtonIndex:
            await deleteNoteMutation.mutateAsync({
              noteUid: item.id
            });
            break;

          default:
            break;
        }
      }
    );
  }, []);

  const renderItem = useCallback(({ item }: { item: INoteWithTagName }) => {
    return (
      <NoteCard
        content={item.content}
        tag={item.tag}
        expire_at={item.expire_at}
        onPress={() => onPressItem(item)}
      />
    );
  }, []);

  const seperatorRenderer = useCallback(() => {
    return <YStack my="$2" />;
  }, []);

  const emptyBlock = useCallback(() => {
    return (
      <EmptyFlatlist message="Det finns inga temporära anteckningar just nu." />
    );
  }, []);

  if (notesQuery.isError) {
    return emptyBlock();
  }

  return (
    <Suspense fallback={<Spinner size="large" />}>
      <FlatList
        data={notesQuery.data}
        refreshControl={
          <RefreshControl
            refreshing={notesQuery.isPending}
            onRefresh={notesQuery.refetch}
          />
        }
        ListEmptyComponent={emptyBlock}
        renderItem={renderItem}
        ItemSeparatorComponent={seperatorRenderer}
        ListFooterComponent={
          <>
            <View mt="$5">
              <NewNoteDialogModule />
            </View>
          </>
        }
      />
    </Suspense>
  );
}
