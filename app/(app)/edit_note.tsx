import { zodResolver } from '@hookform/resolvers/zod';
import Screen from '@lib/components/screen';
import { INote, IUpdateNote } from '@lib/models/note.model';
import { QueryKeys } from '@lib/models/query_keys.model';
import { queryClient } from '@lib/providers';
import { noteService } from '@lib/services/note.service';
import { tagService } from '@lib/services/tag.service';
import { useAuthStore } from '@lib/store/auth.store';
import { Picker } from '@react-native-picker/picker';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { produce } from 'immer';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  Button,
  Fieldset,
  Input,
  Label,
  Spinner,
  XStack,
  YStack,
  useTheme
} from 'tamagui';
import { z } from 'zod';
const updateNoteSchema = z.object({
  expire_at: z.date().optional(),
  note: z.string().optional(),
  tagId: z.string().uuid().optional()
});

type UpdateNoteSchemaTypes = z.infer<typeof updateNoteSchema>;

export default function EditNotePage() {
  const theme = useTheme();
  const { noteId } = useLocalSearchParams<{ noteId: string }>();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const user = useAuthStore((state) => state.user);

  const noteQuery = useSuspenseQuery({
    queryKey: [QueryKeys.Notes, noteId],
    queryFn: () => noteService.fetchNote(noteId)
  });

  const tagsQuery = useSuspenseQuery({
    queryKey: [QueryKeys.Tags, user!.id],
    queryFn: () => tagService.fetchTags(user!.id)
  });

  const updateMutation = useMutation<void, void, IUpdateNote>({
    mutationFn: (data) => noteService.updateNote(noteId, data),
    onSuccess(_, variables) {
      queryClient.setQueryData<INote>([QueryKeys.Notes, noteId], (updater) => {
        return {
          ...updater!,
          ...variables
        };
      });

      queryClient.setQueryData<INote[]>([QueryKeys.Notes, user?.id], (v) => {
        if (v) {
          const updatedState = produce(v, (draft) => {
            const index = draft.findIndex((e) => e.id === noteId);

            if (index !== -1) {
              draft[index] = { ...draft[index], ...variables };
            }
          });

          return updatedState;
        }
      });
    }
  });

  const { control, handleSubmit, setValue } = useForm<UpdateNoteSchemaTypes>({
    resolver: zodResolver(updateNoteSchema)
  });

  const toggleDateVisibilty = useCallback(() => {
    setDatePickerVisibility((state) => !state);
  }, []);

  const onSubmit = useCallback(async (data: UpdateNoteSchemaTypes) => {
    await updateMutation.mutateAsync({
      content: data.note,
      expire_at: data.expire_at?.toISOString(),
      tagId: data.tagId
    });
  }, []);

  useEffect(() => {
    if (noteQuery.isSuccess) {
      navigation.setOptions({
        title: noteQuery.data.content
      });

      setValue('note', noteQuery.data.content);
      setValue('expire_at', new Date(noteQuery.data.expire_at));
      setValue('tagId', noteQuery.data.tagId!);
    }
  }, [noteQuery]);

  useLayoutEffect(() => {
    if (noteQuery.isSuccess) {
      navigation.setOptions({
        title: noteQuery.data.content
      });
    }
  }, [noteQuery]);

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
              name="note"
              render={({ field: { onBlur, onChange, value } }) => (
                <>
                  <Label htmlFor="note">Meddelande</Label>
                  <Input
                    placeholder="Kommer om 10 min!"
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
              name="expire_at"
              render={({ field: { onChange, value } }) => (
                <>
                  <Label htmlFor="date">Date</Label>
                  <Button onPress={toggleDateVisibilty}>
                    {value ? format(value, 'HH:mm') : 'Select date'}
                  </Button>
                  <DateTimePickerModal
                    id="date"
                    isVisible={isDatePickerVisible}
                    mode="time"
                    is24Hour
                    date={value}
                    onCancel={toggleDateVisibilty}
                    onConfirm={(date) => {
                      onChange(date);
                      toggleDateVisibilty();
                    }}
                    display="inline"
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
              name="tagId"
              render={({ field: { onChange, value, onBlur } }) => (
                <XStack
                  alignItems="center"
                  flexWrap="wrap"
                  gap="$5"
                >
                  <Label htmlFor="date">Etikett</Label>
                  <Picker
                    style={{
                      width: '90%',
                      color: theme.color.val
                    }}
                    dropdownIconColor={theme.color.val}
                    id="date"
                    selectedValue={value}
                    onBlur={onBlur}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                    mode="dropdown"
                  >
                    {tagsQuery.data?.map((tag) => (
                      <Picker.Item
                        key={tag.id}
                        label={tag.name!}
                        value={tag.id}
                      />
                    ))}
                  </Picker>
                </XStack>
              )}
            />
          </Fieldset>
          <Button onPress={handleSubmit(onSubmit)}>Uppdatera meddelande</Button>
        </YStack>
      </Screen>
    </Suspense>
  );
}
