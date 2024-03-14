import Button from '@lib/components/button';
import EmptyFlatlist from '@lib/components/empty_flatlist';
import NoteCard from '@lib/components/home/note_card';
import { INoteWithTagName } from '@lib/models/note.model';
import { QueryKeys } from '@lib/models/query_keys.model';
import { noteService } from '@lib/services/note.service';
import { useAuthStore } from '@lib/store/auth.store';
import { PostgrestError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Spinner, YStack } from 'tamagui';

export default function HomeNotesModule() {
  const user = useAuthStore((state) => state.user);

  const notesQuery = useQuery<INoteWithTagName[], PostgrestError>({
    queryKey: [QueryKeys.Notes],
    queryFn: () => noteService.fetchLatestNotes(user!.id)
  });

  const renderItem = useCallback(({ item }: { item: INoteWithTagName }) => {
    return (
      <NoteCard
        content={item.content}
        tag={item.tag}
        expire_at={item.expire_at}
      />
    );
  }, []);

  const seperatorRenderer = useCallback(() => {
    return <YStack my="$2" />;
  }, []);

  const emptyBlock = useCallback(() => {
    return (
      <EmptyFlatlist
        message="Det finns inga temporära anteckningar just nu."
        extra={<Button> Lägg till nytt anteckning</Button>}
      />
    );
  }, []);

  if (notesQuery.isPending) {
    return <Spinner size="large" />;
  }

  if (notesQuery.isError) {
    return emptyBlock;
  }

  return (
    <FlatList
      data={notesQuery.data}
      ListEmptyComponent={emptyBlock}
      renderItem={renderItem}
      ItemSeparatorComponent={seperatorRenderer}
    />
  );
}
