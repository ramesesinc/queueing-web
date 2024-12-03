import ActionBar from "@/common/components/io/ActionBar";
import Button from "@/common/components/io/Button";
import Spacer from "@/common/components/io/Spacer";
import Subtitle from "@/common/components/io/Subtitle";
import Text from "@/common/components/io/Text";
import Title from "@/common/components/io/Title";

type TrackingInfoProps = {
  trckno: string;
  caption?: string;
  onSuccess: () => void;
  onCancel?: () => void;
};

const TrackingInfo: React.FC<TrackingInfoProps> = ({
  trckno,
  caption,
  onSuccess,
  onCancel,
}) => {
  const handleNext = () => {
    onSuccess();
  };

  return (
    <>
      <Subtitle className="font-bold text-green-500">{caption}</Subtitle>
      <Spacer />
      <Text className="text-justify">
        Please take note of the tracking number for this application. This will
        be your tracking reference for completing and follow up for this
        application.
      </Text>
      <Spacer />
      <Title>{trckno}</Title>
      <ActionBar>
        <Button label="" className="invisible" />
        <Button label="Continue" onClick={handleNext} />
      </ActionBar>
    </>
  );
};

export default TrackingInfo;
