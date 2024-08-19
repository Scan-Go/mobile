import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@lib/components/button';
import TagCard from '@lib/components/tags/tag_card.component';
import { useAlertDialog } from '@lib/hooks/useAlertDialog';
import { ICreateNewNote, INote } from '@lib/models/note.model';
import { QueryKeys } from '@lib/models/query_keys.model';
import { ITag } from '@lib/models/tag.model';
import { queryClient } from '@lib/providers';
import { noteService } from '@lib/services/note.service';
import { tagService } from '@lib/services/tag.service';
import { useAuthStore } from '@lib/store/auth.store';
import { PostgrestError } from '@supabase/supabase-js';
import { useToastController } from '@tamagui/toast';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { produce } from 'immer';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useWindowDimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Carousel from 'react-native-reanimated-carousel';
import { Fieldset, Input, Label, Sheet, Spinner, View, YStack } from 'tamagui';
import { z } from 'zod';

interface ITagSelectProps {
  onSelect: (id: string) => void;
  data: ITag[];
}

interface IInnerFrameProps {
  dismissDialog: () => void;
}

const newNoteSchema = z.object({
  expire_at: z.date(),
  note: z.string(),
  tagId: z.string().uuid()
});

type NewNoteSchemaTypes = z.infer<typeof newNoteSchema>;

function TagSelect({ onSelect, data }: ITagSelectProps) {
  const { width } = useWindowDimensions();

  if (data.length === 1) {
    onSelect(data[0].id);
  }

  return (
    <Suspense fallback={<Spinner />}>
      <View flex={1}>
        <Carousel
          loop={false}
          width={width}
          height={200}
          mode="parallax"
          data={data}
          scrollAnimationDuration={1000}
          snapEnabled
          defaultIndex={0}
          onSnapToItem={(index) => onSelect(data[index].id)}
          renderItem={({ item }) => (
            <TagCard
              key={item.id}
              name={item.name!}
              created_at={item.created_at}
              isActive={item.isActive}
              note={item.note!}
            />
          )}
        />
      </View>
    </Suspense>
  );
}

function InnerFrame({ dismissDialog }: IInnerFrameProps) {
  const user = useAuthStore((state) => state.user);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { show } = useToastController();
  const { control, handleSubmit } = useForm<NewNoteSchemaTypes>({
    resolver: zodResolver(newNoteSchema)
  });

  const tagQuery = useSuspenseQuery<ITag[], PostgrestError>({
    queryKey: [QueryKeys.Tags, user!.id],
    queryFn: () => tagService.fetchTags(user!.id)
  });

  useEffect(() => {
    if (tagQuery.data && tagQuery.data.length < 1) {
      dismissDialog();
    }
  }, [tagQuery.data]);

  const noteMutation = useMutation<INote, void, ICreateNewNote>({
    mutationFn: (data) => noteService.addNewNote(data),
    onSuccess(data) {
      show('Nytt meddelande har skapats, och är aktiv.', {
        toastType: 'success'
      });

      queryClient.setQueryData<INote[]>([QueryKeys.Notes, user?.id], (v) => {
        const updatedState = produce(v, (draft) => {
          draft?.push(data);
        });

        return updatedState;
      });
    }
  });

  const toggleDateVisibilty = useCallback(() => {
    setDatePickerVisibility((state) => !state);
  }, []);

  const onSubmit = useCallback(async (data: NewNoteSchemaTypes) => {
    await noteMutation.mutateAsync({
      content: data.note,
      expire_at: data.expire_at.toISOString(),
      userId: user!.id,
      tagId: data.tagId
    });
  }, []);

  return (
    <View
      p="$5"
      flex={1}
    >
      <Suspense fallback={<Spinner />}>
        <Controller
          control={control}
          name="tagId"
          render={({ field: { onChange } }) => (
            <TagSelect
              data={tagQuery.data!}
              onSelect={onChange}
            />
          )}
        />
      </Suspense>

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

        <Button onPress={handleSubmit(onSubmit)}>Skapa nytt meddelande</Button>
      </YStack>
    </View>
  );
}

export default function NewNoteModule() {
  const [open, setOpen] = useState(false);
  const { showAlertDialog } = useAlertDialog();

  const dismissDialog = useCallback(() => {
    setOpen(false);

    showAlertDialog({
      title: 'Du har inga registrerade etiketter.',
      desc: 'Var snäll prova igen senare.'
    });
  }, []);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Lägg till nytt anteckning</Button>
      <Sheet
        open={open}
        modal
        snapPoints={[50, 75, 100]}
        snapPointsMode="percent"
        dismissOnSnapToBottom
        zIndex={100_000}
        onOpenChange={(state: boolean) => setOpen(state)}
        forceRemoveScrollEnabled={open}
        position={0}
        animation="medium"
        unmountChildrenWhenHidden
      >
        <Sheet.Overlay
          backgroundColor="$backgroundTransparent"
          animation="medium"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame bg="$navigationCardBg">
          <InnerFrame dismissDialog={dismissDialog} />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
