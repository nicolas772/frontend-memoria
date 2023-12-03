import React from "react";
import { Card, Metric, Text, Icon, Flex } from "@tremor/react";

const MetricCard = (props) => {
  const { metric, title, color } = props;
  return (
    <Card
      className="max-w-xs pt-2 pb-2 mx-auto"
      decoration="top"
      decorationColor={color}>
      <Text className="mb-2">{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  );
}

export default MetricCard
