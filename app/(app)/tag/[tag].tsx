import { Button } from '@/lib/components/Button';
import { PopOver } from '@/lib/components/Popover';
import { Send, StickyNote } from '@tamagui/lucide-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { Image, Text, View, XStack, styled } from 'tamagui';

interface IListItem {
  icon: React.ReactElement;
  label: string;
}

const BackgroundView = styled(LinearGradient, {
  colors: ['#4b4187', '#312675'],
  locations: [0.5, 0.8],
  style: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    padding: 20
  }
});

const ListItem = styled(View, {
  paddingLeft: 8,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '$2'
});

export default function selam() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <BackgroundView colors={['#4b4187', '#312675']}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
      />
      <View
        justifyContent="center"
        alignItems="center"
      >
        <Image
          borderRadius="$radius.12"
          width={100}
          height={100}
          alignSelf="center"
          source={{
            uri: 'https://yt3.ggpht.com/ytc/APkrFKbOaMCtjZZvDKetLhHey8oIccDj-I2Xc1yQIwFpEw=s48-c-k-c0x00ffffff-no-rj'
          }}
        />

        <Text
          fontWeight="bold"
          fontSize="$8"
          color="white"
          marginTop="$2"
        >
          Muhammed Kaplan
        </Text>
      </View>
      <View
        bg="$background"
        borderRadius="$6"
        marginTop="$5"
      >
        <XStack
          borderBottomWidth="$0.5"
          borderBottomColor="$backgroundPress"
          p="$4"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          width="100%"
        >
          <Text fontSize="$5">Kontakt uppgifter</Text>
        </XStack>

        <View p="$4">
          <ListItem>
            <StickyNote
              color="$gray8Light"
              size="$1"
            />
            <Text>Kommer snart</Text>
          </ListItem>
        </View>

        <PopOver
          trigger={
            <Button
              bg="black"
              icon={<Send />}
              m="$5"
            >
              Skicka meddelande
            </Button>
          }
        >
          <Text>selam</Text>
        </PopOver>
      </View>
    </BackgroundView>
  );
}
