import { zodResolver } from '@hookform/resolvers/zod';
import { QueryKeys } from '@lib/models/query_keys.model';
import { IUserWithPhoneAndSocial } from '@lib/models/user.model';
import { profileService } from '@lib/services/profile.service';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  Fieldset,
  Form,
  Input,
  Label,
  Spinner,
  Text,
  TextArea,
  View
} from 'tamagui';
import { z } from 'zod';
import { ISectionProps } from '.';

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional()
});

type ProfileSchemaType = z.infer<typeof profileSchema>;

export default function ProfileSection({ user }: ISectionProps) {
  const queryClient = useQueryClient();
  const toast = useToastController();
  const mutation = useMutation<void, void, ProfileSchemaType>({
    mutationFn: (data) => profileService.updateProfile(user.id, data),
    onSuccess(_data, variables) {
      queryClient.setQueryData<IUserWithPhoneAndSocial>(
        [QueryKeys.ProfileWithRelations, user.id],
        (v) => {
          if (!v) return;

          return {
            ...v,
            ...variables
          };
        }
      );
    }
  });

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio ?? undefined
    }
  });

  const onSubmit = useCallback(async (input: ProfileSchemaType) => {
    try {
      await mutation.mutateAsync({
        ...input
      });

      toast.show('Sparat!', { toastType: 'success' });
    } catch (error) {
      toast.show('Error!', { toastType: 'error' });
    }
  }, []);

  return (
    <Card>
      <Card.Header padded>
        <Text>Profil</Text>
      </Card.Header>

      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <View p="$4">
          <Fieldset>
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <>
                  <Label htmlFor="firstName">Namn</Label>
                  <Input
                    id="firstName"
                    placeholder="Namn"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Fieldset>
          <Fieldset>
            <Controller
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <>
                  <Label htmlFor="lastName">Efternamn</Label>
                  <Input
                    id="lastName"
                    placeholder="Efternamn"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Fieldset>
          <Fieldset>
            <Controller
              control={form.control}
              name="bio"
              render={({ field }) => (
                <>
                  <Label htmlFor="bio">Biografi</Label>
                  <TextArea
                    id="bio"
                    placeholder="Biografi"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Fieldset>
        </View>

        <Card.Footer padded>
          <Form.Trigger
            asChild
            disabled={mutation.isPending}
          >
            <Button
              theme="active"
              icon={mutation.isPending ? <Spinner /> : undefined}
            >
              Spara
            </Button>
          </Form.Trigger>
        </Card.Footer>
      </Form>
    </Card>
  );
}
