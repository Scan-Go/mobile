import EmptyFlatlist from '@lib/components/empty_flatlist';
import Screen from '@lib/components/screen';
import TagCard from '@lib/components/tags/tag_card.component';
import { QueryKeys } from '@lib/models/query_keys.model';
import { ITag } from '@lib/models/tag.model';
import { tagService } from '@lib/services/tag.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import React, { Suspense, useCallback } from 'react';
import { FlatList, Pressable, RefreshControl } from 'react-native';
import { Spinner, YStack } from 'tamagui';

export default function TagsScreen() {
  const user = useAuthStore((state) => state.user);

  const queryTags = useSuspenseQuery<ITag[], void>({
    queryKey: [QueryKeys.Tags, user?.id],
    queryFn: () => tagService.fetchTags(user!.id)
  });

  const renderItem = useCallback(({ item }: { item: ITag }) => {
    return (
      <Link
        asChild
        href={{
          pathname: '/(app)/tag/[id]/edit',
          params: {
            id: item.id
          }
        }}
      >
        <Pressable>
          <TagCard
            created_at={item.created_at}
            isActive={item.isActive}
            name={item.name!}
            note={item.note!}
            key={item.id}
          />
        </Pressable>
      </Link>
    );
  }, []);

  const emptyBlock = useCallback(() => {
    return (
      <EmptyFlatlist message="Det finns inga temporära anteckningar just nu." />
    );
  }, []);

  if (queryTags.isError) {
    return emptyBlock();
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Screen>
        <FlatList
          style={{ flex: 1, width: '100%' }}
          refreshControl={
            <RefreshControl
              refreshing={queryTags.isPending}
              onRefresh={queryTags.refetch}
            />
          }
          data={queryTags.data}
          ListEmptyComponent={emptyBlock}
          ItemSeparatorComponent={() => <YStack my="$2" />}
          renderItem={renderItem}
        />
      </Screen>
    </Suspense>
  );
}
