import Screen from '@lib/components/screen';
import SettingsPrivacySection from '@lib/modules/settings/privacy/privacy_section';
import SettingsProfileSection from '@lib/modules/settings/profile/profile_section';
import { PortalProvider } from 'tamagui';

export default function SettingsPage() {
  return (
    <PortalProvider>
      <Screen gap="$5">
        <SettingsProfileSection />
        <SettingsPrivacySection />
      </Screen>
    </PortalProvider>
  );
}
