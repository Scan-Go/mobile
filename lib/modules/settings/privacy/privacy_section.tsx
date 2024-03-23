import { Card, H6, Separator, YGroup } from 'tamagui';
import PrivacyAllowSendMessages from './items/allow_send_message';
import PrivacyAllowShowPhone from './items/allow_show_phone';

export default function SettingsPrivacySection() {
  return (
    <Card pb="$5">
      <Card.Header>
        <H6>Privacy</H6>
      </Card.Header>
      <YGroup separator={<Separator />}>
        <YGroup.Item>
          <PrivacyAllowShowPhone />
        </YGroup.Item>
        <YGroup.Item>
          <PrivacyAllowSendMessages />
        </YGroup.Item>
      </YGroup>
    </Card>
  );
}
