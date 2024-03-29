import { useEffect } from 'react';
import { Modal, StatusBar, View } from 'react-native';
import { Spinner, Text, YStack } from 'tamagui';

const bgColor = 'rgba(0,0,0,0.6)';

export default function AppLoading() {
  useEffect(() => {
    const entry = {
      backgroundColor: bgColor,
      animated: true
    };
    StatusBar.pushStackEntry(entry);

    return () => {
      StatusBar.popStackEntry(entry);
    };
  }, []);

  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor
        }}
      >
        <YStack gap="$5">
          <Spinner size="large" />
          <Text color="whitesmoke">Laddar..</Text>
        </YStack>
      </View>
    </Modal>
  );
}
