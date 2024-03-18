import { LogOut } from '@tamagui/lucide-icons';
import { ListItem } from 'tamagui';

export default function LogoutItem() {
  return (
    <ListItem
      size="$5"
      hoverTheme
      pressTheme
      icon={<LogOut />}
      alignItems="center"
      onPress={() => null}
      title="Logga ut"
    />
  );
}
