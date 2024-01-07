import { Button } from '@lib/components/Button';
import { Text } from '@lib/components/Text';
import useSession from '@lib/hooks/useSession';
import { ChevronRight } from '@tamagui/lucide-icons';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useMemo } from 'react';
import { SectionList } from 'react-native';
import { Image, ListItem, YStack } from 'tamagui';

export default function ProfileView() {
  const { currentUser } = useSession();
  const navigation = useNavigation();
  const userName = useMemo(() => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }

    return 'Namn ej angivet';
  }, [currentUser]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const DATA = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto']
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps']
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer']
    }
  ];

  return (
    <>
      <YStack
        justifyContent="center"
        alignItems="center"
        bg={'$background'}
        p="$3"
      >
        <Image
          width={100}
          height={100}
          borderRadius="$radius.12"
          source={{
            uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
          }}
        />
        <YStack
          mt="$3"
          justifyContent="center"
          alignItems="center"
          gap="$3"
        >
          <Text
            fontWeight="700"
            fontSize={20}
          >
            {userName}
          </Text>
          <Text
            color="$gray10Light"
            fontSize={13}
          >
            {currentUser?.email}
          </Text>

          <Button
            iconAfter={<ChevronRight />}
            mt="$3"
          >
            Redigera profil
          </Button>
        </YStack>
      </YStack>
      <SectionList
        scrollEnabled={false}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <ListItem hoverTheme>{item}</ListItem>}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            color={'$gray'}
            fontSize={12}
            letterSpacing={3}
            textTransform="uppercase"
            p="$3"
          >
            {title}
          </Text>
        )}
      />
    </>
  );
}
