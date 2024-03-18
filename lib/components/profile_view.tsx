import NoAvatar from '@assets/images/no_avatar.svg';
import {
  IUser,
  IUserPrivatePhone,
  IUserPrivateSocialMediaAccounts
} from '@lib/models/user.model';
import { Phone, Send, Twitter } from '@tamagui/lucide-icons';
import {
  Avatar,
  H2,
  Image,
  ListItem,
  Separator,
  Spinner,
  Text,
  View,
  YGroup,
  YStack,
  useTheme
} from 'tamagui';
import Button from './button';

interface IProps {
  profileData: IUser;
  bioText: string;
  bioContent: string;
  phoneData?: IUserPrivatePhone;
  socialData?: IUserPrivateSocialMediaAccounts;
  showSendMessageBtn?: boolean;
  isSignedIn?: boolean;
  onSendMessage?: () => void;
}

export default function ProfileView({
  profileData,
  showSendMessageBtn,
  onSendMessage,
  bioContent,
  bioText,
  isSignedIn,
  phoneData,
  socialData
}: IProps) {
  const theme = useTheme();

  return (
    <YStack
      justifyContent="space-evenly"
      alignItems="center"
      gap="$5"
      w="100%"
    >
      <YStack
        gap="$3"
        alignItems="center"
      >
        <Avatar
          circular
          size="$14"
        >
          {profileData.profileImageUrl ? (
            <>
              <Avatar.Image src={require('@assets/images/no_avatar.svg')} />

              <Avatar.Fallback>
                <Spinner />
              </Avatar.Fallback>
            </>
          ) : (
            <NoAvatar width={200} />
          )}
        </Avatar>
        <H2>{`${profileData.firstName} ${profileData.lastName}`}</H2>
        <Text>{profileData.bio}</Text>
      </YStack>

      {showSendMessageBtn && profileData?.sendMessageAllowed && isSignedIn && (
        <Button
          w="100%"
          icon={<Send />}
        >
          Skicka meddelande
        </Button>
      )}

      <View
        bg="$backgroundStrong"
        p="$3"
        py="$5"
        borderRadius="$4"
        w="100%"
      >
        <Text>{bioText}</Text>
        <Text
          fontSize="$5"
          color="$colorFocus"
        >
          {bioContent}
        </Text>
      </View>
      <View
        bg="$backgroundStrong"
        p="$3"
        py="$5"
        borderRadius="$4"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Qrcode_wikipedia.jpg"
          w="$13"
          h="$13"
        />
      </View>
      {(socialData || phoneData) && (
        <View
          bg="$backgroundStrong"
          borderRadius="$4"
          justifyContent="center"
          alignItems="center"
          w="100%"
        >
          <YGroup
            alignSelf="center"
            width="100%"
            separator={<Separator />}
          >
            {phoneData && (
              <YGroup.Item>
                <ListItem
                  size="$5"
                  hoverTheme
                  pressTheme
                  icon={<Phone />}
                  alignItems="center"
                  onPress={() => null}
                  title="Mobil"
                  subTitle={phoneData.number}
                />
              </YGroup.Item>
            )}

            {socialData?.twitter && (
              <YGroup.Item>
                <ListItem
                  size="$5"
                  hoverTheme
                  pressTheme
                  icon={<Twitter />}
                  alignItems="center"
                  onPress={() => null}
                  title="Twitter"
                  subTitle={socialData?.twitter}
                />
              </YGroup.Item>
            )}
          </YGroup>
        </View>
      )}
    </YStack>
  );
}
