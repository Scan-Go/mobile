import { Card, H6, Separator, YGroup } from 'tamagui';
import LogoutItem from './items/logout_item';
import PhoneItem from './items/phone_item';
import TwitterItem from './items/twitter_item';

export default function SettingsProfileSection() {
  return (
    <Card pb="$5">
      <Card.Header>
        <H6>Profil</H6>
      </Card.Header>
      <YGroup separator={<Separator />}>
        <YGroup.Item>
          <TwitterItem />
        </YGroup.Item>
        <YGroup.Item>
          <PhoneItem />
        </YGroup.Item>
        <YGroup.Item>
          <LogoutItem />
        </YGroup.Item>
      </YGroup>
    </Card>
  );
}
