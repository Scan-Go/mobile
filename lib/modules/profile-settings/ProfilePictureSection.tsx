import NO_AVATAR from '@assets/images/no_avatar.svg';
import Button from '@lib/components/button';
import { QueryKeys } from '@lib/models/query_keys.model';
import { IUserWithPhoneAndSocial } from '@lib/models/user.model';
import { profileService } from '@lib/services/profile.service';
import { storageService } from '@lib/services/storage.service';
import { config } from '@tamagui/config/v2-reanimated';
import { Edit3 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useMemo, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Avatar, Card, Spinner, Text, View, XStack, YStack } from 'tamagui';
import { ISectionProps } from '.';

interface IUpdateMutation {
  profileImageUrl: string | null;
}

export default function ProfilePictureSection({ user }: ISectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToastController();
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset>();

  const mutation = useMutation<void, void, IUpdateMutation>({
    mutationFn: ({ profileImageUrl }) =>
      profileService.updateProfile(user.id, { profileImageUrl }),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<IUserWithPhoneAndSocial>(
        [QueryKeys.ProfileWithRelations, user.id],
        (u) => {
          if (!u) return;
          return {
            ...u,
            profileImageUrl: variables.profileImageUrl!
          };
        }
      );
    }
  });

  const onSave = useCallback(async () => {
    if (!selectedImage) return;
    setIsLoading(true);

    const ref = await storageService.uploadAvatar(user!.id, selectedImage);

    if (ref) {
      const photoURL = storageService.getAvatarURL(ref.path);

      await mutation.mutateAsync({ profileImageUrl: photoURL });

      toast.show('Sparat', { toastType: 'success' });
    }

    setIsLoading(false);
  }, [selectedImage]);

  const onSelect = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true
    });

    if (result) {
      if (result.assets && result.assets.length === 1) {
        setSelectedImage(result.assets[0]);

        await onSave();
      }
    }
  }, []);

  const onPressRemove = useCallback(async () => {
    await mutation.mutateAsync({
      profileImageUrl: null
    });
  }, []);

  const profilePicture = useMemo<ImageSourcePropType>(() => {
    if (selectedImage) {
      return {
        uri: selectedImage.uri
      };
    }

    if (user.profileImageUrl) {
      return {
        uri: user.profileImageUrl
      };
    }

    return {
      uri: ''
    };
  }, [selectedImage, user]);

  return (
    <Card>
      <Card.Header padded>
        <Text>Profilbild</Text>
      </Card.Header>

      <View
        animation="bouncy"
        animateOnly={['transform']}
        pressStyle={{
          scale: 0.9
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          onPress={onSelect}
          cursor="pointer"
          circular
          size="$8"
        >
          <Avatar.Image source={profilePicture} />

          <Avatar.Fallback>
            <NO_AVATAR
              width={config.tokens.size[8].val}
              height={config.tokens.size[8].val}
            />
          </Avatar.Fallback>
        </Avatar>
        <View
          theme="subtle"
          bg="$background"
          p="$2"
          borderRadius="$12"
          position="relative"
          top="$-12"
          right="$-6"
          zIndex={1}
        >
          <Edit3
            size="$1"
            color="black"
          />
        </View>
      </View>

      <Card.Footer
        padded
        justifyContent="center"
      >
        <YStack gap="$5">
          {isLoading && (
            <XStack
              animation="medium"
              enterStyle={{
                scale: 1
              }}
              justifyContent="center"
              gap="$3"
            >
              <Spinner />

              <Text>Sparar...</Text>
            </XStack>
          )}

          {user.profileImageUrl && (
            <Button
              theme="active"
              onPress={onPressRemove}
            >
              Radera
            </Button>
          )}
        </YStack>
      </Card.Footer>
    </Card>
  );
}
