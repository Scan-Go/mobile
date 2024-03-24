import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@lib/components/button';
import Screen from '@lib/components/screen';
import Switch from '@lib/components/switch';
import { QueryKeys } from '@lib/models/query_keys.model';
import { ITag } from '@lib/models/tag.model';
import { tagService } from '@lib/services/tag.service';
import { useAuthStore } from '@lib/store/auth.store';
import { PostgrestError } from '@supabase/supabase-js';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import { produce } from 'immer';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Fieldset, Input, Label, Spinner, YStack } from 'tamagui';
import { z } from 'zod';

interface IProps {
  tagUid: string;
}

const editTagFormSchema = z.object({
  name: z.string().optional(),
  note: z.string().optional(),
  isActive: z.boolean().optional()
});

type EditTagFormTypes = z.infer<typeof editTagFormSchema>;

export default function EditTagModule({ tagUid }: IProps) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const navigation = useNavigation();
  const { show: showToast } = useToastController();

  const tagQuery = useQuery<ITag>({
    queryKey: [QueryKeys.TagCore, tagUid],
    queryFn: () => tagService.fetchTagCore(tagUid)
  });

  const tagsMutation = useMutation<void, PostgrestError, Partial<ITag>>({
    mutationFn: (tag) => {
      return tagService.updateTag(tagUid, tag);
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<ITag>([QueryKeys.Tag, user?.id], (v) => {
        if (v) {
          return { ...v, ...variables };
        }
      });

      queryClient.setQueryData<ITag[]>([QueryKeys.Tags, user?.id], (v) => {
        console.log(v);
        if (v && v.length > 0) {
          const updatedState = produce(v, (draft) => {
            const index = draft.findIndex((e) => e.id === tagUid);

            if (index !== -1) {
              draft[index] = { ...draft[index], ...variables };
            }
          });

          return updatedState;
        }
      });
    }
  });

  const { handleSubmit, control, setValue } = useForm<EditTagFormTypes>({
    resolver: zodResolver(editTagFormSchema)
  });

  useEffect(() => {
    if (tagQuery.isSuccess) {
      setValue('name', tagQuery.data?.name ?? undefined);
      setValue('isActive', tagQuery.data?.isActive ?? undefined);
      setValue('note', tagQuery.data?.note ?? undefined);
    }
  }, [tagQuery.data]);

  useLayoutEffect(() => {
    if (tagQuery.isSuccess) {
      navigation.setOptions({
        title: tagQuery.data!.name
      });
    }
  }, [tagQuery.data]);

  const onSubmitForm = useCallback(async (inputs: EditTagFormTypes) => {
    try {
      await tagsMutation.mutateAsync({
        isActive: inputs.isActive,
        name: inputs.name,
        note: inputs.note
      });

      showToast('Etiketten har redigerats framgångsrikt', {
        toastType: 'success'
      });
    } catch (error) {
      showToast('Kunde inte redigera, var snäll prova igen senare.', {
        toastType: 'error'
      });
    }
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Screen>
        <YStack gap="$5">
          <Fieldset
            gap="$4"
            horizontal
            alignItems="center"
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { onBlur, onChange, value } }) => (
                <>
                  <Label htmlFor="note">Namn</Label>
                  <Input
                    id="note"
                    w="$12"
                    flex={1}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </>
              )}
            />
          </Fieldset>
          <Fieldset
            gap="$4"
            horizontal
            alignItems="center"
          >
            <Controller
              control={control}
              name="note"
              render={({ field: { onBlur, onChange, value } }) => (
                <>
                  <Label htmlFor="note">Meddelande</Label>
                  <Input
                    id="note"
                    placeholder="Kommer om 10 min!"
                    w="$12"
                    flex={1}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </>
              )}
            />
          </Fieldset>
          <Fieldset
            gap="$4"
            horizontal
            alignItems="center"
          >
            <Controller
              control={control}
              name="isActive"
              render={({ field: { onBlur, onChange, value } }) => (
                <>
                  <Label htmlFor="note">Aktiv</Label>
                  <Switch
                    checked={value}
                    onCheckedChange={onChange}
                    onBlur={onBlur}
                  >
                    <Switch.Thumb />
                  </Switch>
                </>
              )}
            />
          </Fieldset>
          <Button onPress={handleSubmit(onSubmitForm)}>
            Uppdatera etikett
          </Button>
        </YStack>
      </Screen>
    </Suspense>
  );
}
