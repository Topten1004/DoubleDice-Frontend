import WidgetBot from "@widgetbot/react-embed";

interface PropsI {
  channel: string;
  className?: string;
  style?: React.CSSProperties;
  height?: number;
  width?: number;
}

const DiscordWidget = ({
  channel,
  height,
  width,
  style,
  className,
}: PropsI) => {
  return (
    <WidgetBot
      server={process.env.DISCORD_GUILD_ID}
      channel={channel}
      className={className}
      style={style}
      height={height}
      width={width}
    />
  );
};

export default DiscordWidget;
