import { Link, LinkProps } from 'expo-router';
import { useThemeColor } from '../hooks/use-theme-color';



interface Props extends LinkProps{}

const ThemedLink = ({ style, ...rest}: Props) => {
  const primaryColor = useThemeColor({}, 'promary');

  return (
    <Link
      style={[
        {
          color: primaryColor,
        },
        style,
      ]}
      {...rest}
    />
  );
};
export default ThemedLink;