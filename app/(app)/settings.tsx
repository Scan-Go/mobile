import Screen from '@lib/components/screen';
import SettingsPrivacySection from '@lib/modules/settings/privacy/privacy_section';
import SettingsProfileSection from '@lib/modules/settings/profile/profile_section';

export default function SettingsPage() {
  return (
    <Screen gap="$5">
      <SettingsProfileSection />
      <SettingsPrivacySection />
    </Screen>
  );
}
