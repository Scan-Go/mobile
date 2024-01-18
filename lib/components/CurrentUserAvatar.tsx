import useSession from '@lib/hooks/useSession';
import { Avatar, View } from 'tamagui';

export default function CurrentUserAvatar() {
  const { currentUser } = useSession();
  return (
    <Avatar
      circular
      size="$6"
    >
      {currentUser?.photoURL ? (
        <Avatar.Image src={currentUser?.photoURL ?? undefined} />
      ) : (
        <View bg="$primary"></View>
      )}
      <Avatar.Fallback bc="red" />
    </Avatar>
  );
}
