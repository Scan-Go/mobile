import NO_AVATAR from '@assets/images/no_avatar.svg';
import Button from '@lib/components/button';
import { profileService } from '@lib/services/profile.service';
import { config } from '@tamagui/config/v2-reanimated';
import { Edit3 } from '@tamagui/lucide-icons';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import { Avatar, Card, Text, View, XStack, ZStack } from 'tamagui';
import { ISectionProps } from '.';

interface IUpdateMutation {
  profileImageUrl: string;
}

export default function ProfilePictureSection({ user }: ISectionProps) {
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset>();

  const mutation = useMutation<void, void, IUpdateMutation>({
    mutationFn: ({ profileImageUrl }) =>
      profileService.updateProfile(user.id, { profileImageUrl })
  });

  const onSave = useCallback(async () => {}, []);

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

        console.log(result.assets);
      }
    }
  }, []);

  return (
    <Card>
      <Card.Header padded>
        <Text>Profilbild</Text>
      </Card.Header>

      <View
        justifyContent="center"
        alignItems="center"
      >
        <ZStack>
          <Avatar
            circular
            size="$8"
          >
            <Avatar.Image
              source={{
                uri: (selectedImage?.uri ?? user.profileImageUrl) || undefined
              }}
            />

            <Avatar.Fallback>
              <NO_AVATAR
                width={config.tokens.size[8].val}
                height={config.tokens.size[8].val}
              />
            </Avatar.Fallback>
          </Avatar>
          <Edit3 />
        </ZStack>
      </View>

      <Card.Footer
        padded
        justifyContent="center"
      >
        <XStack>
          {selectedImage && (
            <Button onPress={onSelect}>Välj nytt profilbild</Button>
          )}

          <Button
            theme={selectedImage ? 'active' : 'subtle'}
            onPress={selectedImage ? onSave : onSelect}
          >
            {selectedImage ? 'Spara' : 'Välj en profilbild'}
          </Button>
        </XStack>
      </Card.Footer>
    </Card>
  );
}
